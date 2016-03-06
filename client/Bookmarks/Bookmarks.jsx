/* component */
import React, {PropTypes} from 'react'

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

Bookmark.PropTypes = {
  name: PropTypes.string.isRequired,
  editing: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export const Bookmarks = ({items, add}) => {
  let input
  return (
    <div>
      <input type='text' ref={node => input = node} />
      <button onClick={() => { add(input.value); input.value = '' }}>Add</button>
      {items.map((item, i) =>
        <Bookmark {...item} key={i} />
      )}
    </div>
  )
}

Bookmarks.PropTypes = {
  items: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired
}

/* container */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from './reduxModule.js'

const mapStateToProps = ({ui: {bookmarks}}) => ({...bookmarks})

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

const mergeProps = ({items, editing}, {add, setEditing, edit, remove}) => ({
  add,
  items: items.map(({name}, i) => ({
    name,
    editing: i === editing,
    setEditing: () => setEditing(i),
    cancelEditing: () => setEditing(null),
    edit: (...args) => edit(i, ...args),
    remove: () => remove(i)
  }))
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Bookmarks)
