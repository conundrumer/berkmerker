import { combineReducers } from 'redux'

import bookmarks from './bookmarks/reducer.js'
import tagFilter from './tagFilter/reducer.js'

const reducers = combineReducers({
  ui: combineReducers({bookmarks, tagFilter})
})

export default function rootReducer (state, action) {
  let nextState = reducers(state, action)
  return nextState
}
