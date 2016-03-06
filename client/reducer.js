import { combineReducers } from 'redux'

import {reducer as helloWorld} from './HelloWorld.jsx'
import {reducer as bookmarks} from './Bookmarks.jsx'

const reducers = combineReducers({
  ui: combineReducers({helloWorld, bookmarks}),
  foo: () => ({})
})

export default function rootReducer (state, action) {
  let nextState = reducers(state, action)
  return nextState
}
