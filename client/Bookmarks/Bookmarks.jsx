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

import * as actionCreators from './reduxModule.js'

const mapStateToProps = ({ui: {bookmarks}}, ownProps) => ({...bookmarks})

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks)
