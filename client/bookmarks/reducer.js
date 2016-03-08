import update from 'react-addons-update'
import { combineReducers } from 'redux'

import * as Actions from './actions.js'
import * as TagFilterActions from '../tagFilter/actions.js'

const ADD = Actions.add().type
const SET_EDITING = Actions.setEditing().type
const EDIT = Actions.edit().type
const REMOVE = Actions.remove().type
const MODIFY = Actions.modifyTags().type
const TOGGLE = TagFilterActions.toggle().type

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
    case MODIFY:
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
