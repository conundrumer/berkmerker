import createLogger from 'redux-logger'
import diffLogger from 'redux-diff-logger'

import {getState, setState} from './hotReloadState.js'

// because I can't get jspm conditional loading to work
const PRODUCTION = SystemJS && SystemJS.production

// can't dynamically add/remove middleware fyi
function hotReloadMiddleware (middleware, i) {
  let key = `middleware-${i}`

  setState(key, middleware)

  return (store) => (next) => (action) => getState(key)(store)(next)(action)
}

export default PRODUCTION ? null : {
  diffLogger: diffLogger,
  logger: createLogger({collapsed: true}),
  setGlobalStore: (store) => window.store = store,
  hotReloadMiddleware
}
