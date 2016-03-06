/* actions */
const ADD = 'Bookmarks/ADD'
const SET_EDITING = 'Bookmarks/SET_EDITING'
const EDIT = 'Bookmarks/EDIT'
const REMOVE = 'Bookmarks/REMOVE'

export const add = (name) => ({
  type: ADD,
  payload: {
    item: {name}
  }
})
export const setEditing = (index) => ({
  type: SET_EDITING,
  payload: {
    index
  }
})
export const edit = (index, name) => ({
  type: EDIT,
  payload: {
    index,
    item: {name}
  }
})
export const remove = (index) => ({
  type: REMOVE,
  payload: {
    index
  }
})

/* reducer */
// items: [{name: string}, ...]
export default function reducer (state = {items: [], editing: null}, action) {
  let items
  let {type, payload} = action
  switch (type) {
    case ADD:
      return {
        editing: null,
        items: [payload.item, ...state.items]
      }
    case SET_EDITING:
      return {
        ...state,
        editing: payload.index
      }
    case EDIT:
      items = [...state.items]
      items[payload.index] = {...payload.item}
      return {
        editing: null,
        items
      }
    case REMOVE:
      return {
        editing: null,
        items: state.items.filter((_, i) => payload.index !== i)
      }
    default:
      return state
  }
}
