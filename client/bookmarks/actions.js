/* action types */
const ADD = 'Bookmarks/ADD'
const SET_EDITING = 'Bookmarks/SET_EDITING'
const EDIT = 'Bookmarks/EDIT'
const REMOVE = 'Bookmarks/REMOVE'
const MODIFY_TAGS = 'Bookmarks/MODIFY_TAGS'

/* action creators */
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
