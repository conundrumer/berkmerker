/* component */
import React, {PropTypes} from 'react'

import styles from './Bookmarks.css!'

export const BookmarkInput = ({name, url, submitName = 'Submit', onSubmit, children}) => {
  let nameInput, urlInput
  let submit = () => {
    onSubmit(nameInput.value, urlInput.value)
    nameInput.value = ''
    urlInput.value = ''
  }
  return (
    <div>
      <input type='text' defaultValue={name} ref={node => nameInput = node} />
      <input className={styles.urlInput} type='url' defaultValue={url} ref={node => urlInput = node} />
      <button onClick={submit}>{submitName}</button>
      {children}
    </div>
  )
}

BookmarkInput.PropTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  submitName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export const Tags = ({tags, editing}) => (
  <div>
    {tags.map((tag, i) =>
      <span className={`${styles.tag} ${editing ? styles.tagEditing : ''}`} key={i}> #{tag} </span>
    )}
  </div>
)

export const TagInput = ({onSubmit}) => {
  let input
  let submit = () => {
    onSubmit(input.value)
    input.value = ''
  }
  return (
    <div>
      <input type='text' ref={node => input = node} />
      <button onClick={submit}>Add Tag</button>
    </div>
  )
}

export const Bookmark = ({name, url, tags, editing, setEditing, cancelEditing, edit, remove, addTag}) => {
  return editing ? (
    <div>
      <BookmarkInput submitName='Submit' name={name} url={url} onSubmit={edit}>
        <button onClick={cancelEditing}>Cancel</button>
        <button onClick={remove}>Remove</button>
        <Tags tags={tags} editing={true} />
        <TagInput onSubmit={addTag}/>
      </BookmarkInput>
    </div>
  ) : (
    <div>
      <span><a href={url} target='_blank'>{name}</a></span>
      <button onClick={setEditing}>Edit</button>
      <Tags tags={tags} />
    </div>
  )
}

Bookmark.PropTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  editing: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired
}

export const Bookmarks = ({items, add}) => {
  return (
    <div>
      <BookmarkInput submitName='Add' onSubmit={add} />
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

const mergeProps = ({items, editing}, {add, setEditing, edit, remove, addTag}) => ({
  add,
  items: items.map(({name, url, tags}, i) => ({
    name,
    url,
    tags,
    editing: i === editing,
    setEditing: () => setEditing(i),
    cancelEditing: () => setEditing(null),
    edit: (...args) => edit(i, ...args),
    remove: () => remove(i),
    addTag: (tag) => addTag(i, tag)
  }))
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Bookmarks)
