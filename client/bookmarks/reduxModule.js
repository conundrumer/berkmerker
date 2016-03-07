/* actions */
const ADD = 'Bookmarks/ADD'
const SET_EDITING = 'Bookmarks/SET_EDITING'
const EDIT = 'Bookmarks/EDIT'
const REMOVE = 'Bookmarks/REMOVE'
const ADD_TAG = 'Bookmarks/ADD_TAG'
const REMOVE_TAG = 'Bookmarks/REMOVE_TAG'

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
export const addTag = (index, tag) => ({
  type: ADD_TAG,
  payload: {
    index,
    tag
  }
})
export const removeTag = (index, tagIndex) => ({
  type: REMOVE_TAG,
  payload: {
    index,
    tagIndex
  }
})

/* reducer */
import update from 'react-addons-update'
import { combineReducers } from 'redux'

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
      return [{tags: [], ...payload.item}, ...state]
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
    case ADD_TAG:
      return update(state, {
        [payload.index]: {
          tags: {
            $apply: (tags) => tags.includes(payload.tag) ? tags : [...tags, payload.tag]
          }
        }
      })
    case REMOVE_TAG:
      return update(state, {
        [payload.index]: {
          tags: {
            $splice: [[payload.tagIndex, 1]]
          }
        }
      })
    default:
      return state
  }
}

export default combineReducers({editing, items})
