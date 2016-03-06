import createLogger from 'redux-logger'

// because I can't get jspm conditional loading to work
const PRODUCTION = SystemJS && SystemJS.production

export const logger = PRODUCTION ? null : createLogger()
