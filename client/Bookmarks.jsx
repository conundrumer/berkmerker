/* actions */
const ADD = 'Bookmarks/ADD'
const SET_EDITING = 'Bookmarks/SET_EDITING'
const EDIT = 'Bookmarks/EDIT'
const REMOVE = 'Bookmarks/REMOVE'

const add = (name) => ({
  type: ADD,
  payload: {
    item: {name}
  }
})
const setEditing = (index) => ({
  type: SET_EDITING,
  payload: {
    index
  }
})
const edit = (index, name) => ({
  type: EDIT,
  payload: {
    index,
    item: {name}
  }
})
const remove = (index) => ({
  type: REMOVE,
  payload: {
    index
  }
})

const actions = {add, setEditing, edit, remove}

/* reducer */
// items: [{name: string}, ...]
export function reducer (state = {items: [], editing: null}, action) {
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

/* component */
import React from 'react'

// import styles from './HelloWorld.css!'

export const Bookmark = ({name, editing, setEditing, cancelEditing, edit, remove}) => {
  let input
  return editing ? (
    <div>
      <input type='text' defaultValue={name} ref={node => input = node} />
      <button onClick={() => edit(input.value)}>Submit</button>
      <button onClick={cancelEditing}>Cancel</button>
      <button onClick={remove}>Remove</button>
    </div>
  ) : (
    <div>
      <span>{name}</span>
      <button onClick={setEditing}>Edit</button>
    </div>
  )
}

export const Bookmarks = ({items, editing, add, setEditing, edit, remove}) => {
  let input
  return (
    <div>
      <input type='text' ref={node => input = node} />
      <button onClick={() => { add(input.value); input.value = '' }}>Add</button>
      {items.map((item, i) =>
        <Bookmark {...item}
          key={i}
          editing={i === editing}
          setEditing={() => setEditing(i)}
          cancelEditing={() => setEditing(null)}
          edit={(...args) => edit(i, ...args)}
          remove={() => remove(i)}
        />
      )}
    </div>
  )
}

/* container */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const mapStateToProps = ({ui: {bookmarks}}, ownProps) => ({...bookmarks})

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks)
