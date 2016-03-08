import { combineReducers } from 'redux'

import * as Actions from './actions.js'
import * as TagActions from '../tags/reduxModule.js'
import * as BookmarkActions from '../bookmarks/actions.js'

const TOGGLE = Actions.toggle().type
const ADD = TagActions.add().type
const REMOVE = TagActions.remove().type
const MODIFY = BookmarkActions.modifyTags().type

function count (state = 0, action) {
  switch (action.type) {
    case ADD:
      return state + 1
    case REMOVE:
      return state - 1
    default:
      return state
  }
}

function toggled (state = false, action) {
  switch (action.type) {
    case TOGGLE:
      return !state
    default:
      return state
  }
}

const countToggled = combineReducers({count, toggled})

function tag (state = {}, action) {
  state = countToggled(state, action)
  return state.count > 0 ? state : undefined
}

// tagFilter: {[string]: {count: int, toggled: bool}}
function tags (state, action) {
  if (!(state instanceof Map)) {
    state = new Map(state)
  }
  let {type, payload} = action
  switch (type) {
    case MODIFY:
      action = payload.tagAction
      /* falls through */
    case TOGGLE:
      let nextValue = tag(state.get(action.payload.tag), action)
      let nextState = new Map(state)
      if (nextValue) {
        nextState.set(action.payload.tag, nextValue)
      } else {
        nextState.delete(action.payload.tag)
      }
      return nextState
    default:
      return state
  }
}

export default combineReducers({tags})