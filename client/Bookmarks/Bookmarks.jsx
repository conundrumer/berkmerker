/* component */
import React, {PropTypes} from 'react'

import styles from './Bookmarks.css!'

export const Bookmark = ({name, url, editing, setEditing, cancelEditing, edit, remove}) => {
  let nameInput, urlInput
  let onSubmit = () => edit(nameInput.value, urlInput.value)
  return editing ? (
    <div>
      <input type='text' defaultValue={name} ref={node => nameInput = node} />
      <input className={styles.urlInput} type='url' defaultValue={url} ref={node => urlInput = node} />
      <button onClick={onSubmit}>Submit</button>
      <button onClick={cancelEditing}>Cancel</button>
      <button onClick={remove}>Remove</button>
    </div>
  ) : (
    <div>
      <span><a href={url} target='_blank'>{name}</a></span>
      <button onClick={setEditing}>Edit</button>
    </div>
  )
}

Bookmark.PropTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  editing: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export const Bookmarks = ({items, add}) => {
  let nameInput, urlInput
  let onSubmit = () => {
    add(nameInput.value, urlInput.value)
    nameInput.value = ''
    urlInput.value = ''
  }
  return (
    <div>
      <input type='text' ref={node => nameInput = node} />
      <input className={styles.urlInput} type='text' ref={node => urlInput = node} />
      <button onClick={onSubmit}>Add</button>
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
  items: items.map(({name, url}, i) => ({
    name,
    url,
    editing: i === editing,
    setEditing: () => setEditing(i),
    cancelEditing: () => setEditing(null),
    edit: (...args) => edit(i, ...args),
    remove: () => remove(i)
  }))
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Bookmarks)
