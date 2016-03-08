import update from 'react-addons-update'
import { combineReducers } from 'redux'

import {
  ADD,
  SET_EDITING,
  EDIT,
  REMOVE,
  MODIFY_TAGS,
} from './actions.js'
import {
  TOGGLE
} from '../tagFilter/actions.js'

import tagsReducer from '../tags/reduxModule.js'

// editing: int?
function editing (state = null, action) {
  let {type, payload} = action
  switch (type) {
    case ADD:
    case EDIT:
    case REMOVE:
    case TOGGLE:
      return null
    case SET_EDITING:
      return payload.index
    default:
      return state
  }
}

// items: [{name: string, url: string, tags: [string, ...]}, ...]
function items (state = [], action) {
  let {type, payload} = action
  switch (type) {
    case ADD:
      return [{tags: tagsReducer(), ...payload.item}, ...state]
    case EDIT:
      return update(state, {
        [payload.index]: {
          $apply: (item) => update(item, {$merge: payload.item})
        }
      })
    case REMOVE:
      return update(state, {
        $splice: [[payload.index, 1]]
      })
    case MODIFY_TAGS:
      return update(state, {
        [payload.index]: {
          tags: {
            $apply: (tags) => tagsReducer(tags, payload.tagAction)
          }
        }
      })
    default:
      return state
  }
}

export default combineReducers({editing, items})
