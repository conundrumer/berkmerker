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
// items: [{name: string, url: string, tags: [string, ...]}, ...], editing: int?
export default function reducer (state = {items: [], editing: null}, action) {
  let items, item
  let {type, payload} = action
  switch (type) {
    case ADD:
      return {
        editing: null,
        items: [{tags: [], ...payload.item}, ...state.items]
      }
    case SET_EDITING:
      return {
        ...state,
        editing: payload.index
      }
    case EDIT:
      items = [...state.items]
      item = items[payload.index]
      items[payload.index] = {...item, ...payload.item}
      return {
        editing: null,
        items
      }
    case REMOVE:
      return {
        editing: null,
        items: state.items.filter((_, i) => payload.index !== i)
      }
    case ADD_TAG:
      if (state.items[payload.index].tags.includes(payload.tag)) {
        return state
      }
      items = [...state.items]
      item = items[payload.index]
      items[payload.index] = {
        ...item,
        tags: [...item.tags, payload.tag]
      }
      return {
        ...state,
        items
      }
    case REMOVE_TAG:
      items = [...state.items]
      item = items[payload.index]
      items[payload.index] = {
        ...item,
        tags: item.tags.filter((_, i) => payload.tagIndex !== i)
      }
      return {
        ...state,
        items
      }
    default:
      return state
  }
}
