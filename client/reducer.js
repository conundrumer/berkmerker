import { combineReducers } from 'redux'

import {reducer as helloWorld} from './HelloWorld.jsx'

const reducers = combineReducers({
  ui: combineReducers({helloWorld}),
  foo: () => ({})
})

export default function rootReducer (state, action) {
  let nextState = reducers(state, action)
  return nextState
}
