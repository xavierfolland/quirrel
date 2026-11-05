import bodyParser from 'body-parser'
import express from 'express'

import greetingsQueue from './greetingsQueue'

const handler = express()

handler.use(bodyParser.text())
handler.use(async (req, res) => {
  await greetingsQueue.enqueue(req.body, {
    delay: '1d',
  })

  res.end()
})

export default {
  path: '/api/enqueueGreeting',
  handler,
}
