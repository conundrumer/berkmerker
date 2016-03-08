/* action types */
export const ADD = 'Bookmarks/ADD'
export const SET_EDITING = 'Bookmarks/SET_EDITING'
export const EDIT = 'Bookmarks/EDIT'
export const REMOVE = 'Bookmarks/REMOVE'
export const MODIFY_TAGS = 'Bookmarks/MODIFY_TAGS'

/* action creators */
export default {
  add: (name, url) => ({
    type: ADD,
    payload: {
      item: {name, url}
    }
  }),
  setEditing: (index) => ({
    type: SET_EDITING,
    payload: {
      index
    }
  }),
  edit: (index, name, url) => ({
    type: EDIT,
    payload: {
      index,
      item: {name, url}
    }
  }),
  remove: (index) => ({
    type: REMOVE,
    payload: {
      index
    }
  }),
  modifyTags: (index, tagAction) => ({
    type: MODIFY_TAGS,
    payload: {
      index,
      tagAction
    }
  })
}
