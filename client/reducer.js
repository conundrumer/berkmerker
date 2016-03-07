import { combineReducers } from 'redux'

import bookmarks from './bookmarks/reduxModule.js'

const reducers = combineReducers({
  ui: combineReducers({bookmarks})
})

export default function rootReducer (state, action) {
  let nextState = reducers(state, action)
  return nextState
}
