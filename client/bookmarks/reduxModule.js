/* actions */
const ADD = 'Bookmarks/ADD'
const SET_EDITING = 'Bookmarks/SET_EDITING'
const EDIT = 'Bookmarks/EDIT'
const REMOVE = 'Bookmarks/REMOVE'
const MODIFY_TAGS = 'Bookmarks/MODIFY_TAGS'

export const add = (name, url) => ({
  type: ADD,
  payload: {
    item: {name, url}
  }
})
export const setEditing = (index) => ({
  type: SET_EDITING,
  payload: {
    index
  }
})
export const edit = (index, name, url) => ({
  type: EDIT,
  payload: {
    index,
    item: {name, url}
  }
})
export const remove = (index) => ({
  type: REMOVE,
  payload: {
    index
  }
})
export const modifyTags = (index, tagAction) => ({
  type: MODIFY_TAGS,
  payload: {
    index,
    tagAction
  }
})
/* reducer */
import update from 'react-addons-update'
import { combineReducers } from 'redux'

import tagsReducer from '../tags/reduxModule.js'

// editing: int?
function editing (state = null, action) {
  let {type, payload} = action
  switch (type) {
    case ADD:
    case EDIT:
    case REMOVE:
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
