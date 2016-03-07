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

// items: [{name: string, url: string, tags: [string, ...]}, ...], editing: int?
export default function reducer (state = {items: [], editing: null}, action) {
  let {items, editing} = state
  let {type, payload} = action
  switch (type) {
    case ADD:
      return {
        editing: null,
        items: [{tags: [], ...payload.item}, ...items]
      }
    case SET_EDITING:
      return {
        items: items,
        editing: payload.index
      }
    case EDIT:
      return {
        items: update(items, {
          [payload.index]: {
            $apply: (item) =>
              update(item, {$merge: payload.item})
          }
        }),
        editing: null
      }
    case REMOVE:
      return {
        editing: null,
        items: update(items, {
          $splice: [[payload.index, 1]]
        })
      }
    case ADD_TAG:
      return {
        editing: editing,
        items: update(items, {
          [payload.index]: {
            tags: {
              $apply: (tags) =>
                tags.includes(payload.tag) ? tags : [...tags, payload.tag]
            }
          }
        })
      }
    case REMOVE_TAG:
      return {
        editing: editing,
        items: update(items, {
          [payload.index]: {
            tags: {
              $splice: [[payload.tagIndex, 1]]
            }
          }
        })
      }
    default:
      return state
  }
}
