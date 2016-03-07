import createLogger from 'redux-logger'
import diffLogger from 'redux-diff-logger'

// because I can't get jspm conditional loading to work
const PRODUCTION = SystemJS && SystemJS.production

export default PRODUCTION ? null : {
  diffLogger: diffLogger,
  logger: createLogger({collapsed: true}),
  setGlobalStore: (store) => window.store = store
}
