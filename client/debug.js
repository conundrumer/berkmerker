import createLogger from 'redux-logger'
import diffLogger from 'redux-diff-logger'
import ReactDOM from 'react-dom'

import {getState, setState} from './hotReloadState.js'

// because I can't get jspm conditional loading to work
const PRODUCTION = SystemJS && SystemJS.production

const setGlobal = (key, value) => window[key] = value

function makeForceRerender (renderApp, container) {
  setGlobal('forceRerender', () => {
    try {
      ReactDOM.unmountComponentAtNode(container)
    } catch (e) {
      container.innerHTML = ''
    }
    renderApp()
  })
}

// can't dynamically add/remove middleware fyi
function hotReloadMiddleware (middleware, i) {
  let key = `middleware-${i}`

  setState(key, middleware)

  return (store) => (next) => (action) => getState(key)(store)(next)(action)
}

export default PRODUCTION ? null : {
  diffLogger: diffLogger,
  logger: createLogger({collapsed: true}),
  setGlobal,
  makeForceRerender,
  hotReloadMiddleware
}
