import { Page, test } from '@playwright/test'
import { expect } from 'chai'
import delay from 'delay'

import { runQuirrel } from './runQuirrel'

let cleanup: (() => Promise<void>)[] = []

test.beforeEach(() => {
  cleanup = []
})

test.afterEach(async () => {
  // seems to cause a timeout sometimes
  await Promise.all(cleanup.map((clean) => clean()))
})

async function expectToShowAttachingToQuirrel(page: Page) {
  const attachingEl = await page.$('#attaching-to-quirrel')
  expect(attachingEl).to.exist
  expect(await attachingEl?.innerText()).to.equal('Attaching to Quirrel ...')
}

async function expectToShowJobTable(page: Page) {
  const tableEl = await page.$('[data-test-class=table]')
  expect(tableEl).to.exist
  expect(await tableEl?.textContent()).to.equal(
    ['Endpoint', 'ID', 'Run At', 'Payload'].join(''),
  )
}

test('allows connecting to non-standard ports', async ({ page }) => {
  const quirrelServer = await runQuirrel({ port: 8000 })
  cleanup.push(quirrelServer.cleanup)

  await page.goto('http://localhost:1234/pending')

  await expectToShowAttachingToQuirrel(page)

  await page.click('[data-test-id=open-connection-modal]')
  await page.type('[name=endpoint]', 'http://localhost:8000')
  await page.click('button[type=submit]')

  await delay(100)

  await expectToShowJobTable(page)
})
