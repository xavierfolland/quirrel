import cookie from 'js-cookie'

import { initialize } from './template'

const config = cookie.get('Quirrel-UI-Config') ?? ''
const [authEnabled = 'true'] = config.split('-')

initialize({
  authentication: {
    enabled: authEnabled === 'true',
  },
  fixedEndpoint: window.location.origin,
  linkToAPIDocs: '/documentation',
})
