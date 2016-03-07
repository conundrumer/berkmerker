/* component */
import React, {PropTypes} from 'react'

import styles from './Bookmarks.css!'

export const InputFields = ({fields, onSubmit, submitName = 'Submit'}) => {
  let inputs = Array(fields.length)
  let submit = () => {
    onSubmit(...inputs.map(input => input.value))
    inputs.forEach(input => input.value = '')
  }
  return (
    <div>
      {fields.map(({type = 'text', defaultValue, ...fieldProps}, i) =>
        <input {...fieldProps}
          ref={node => inputs[i] = node}
          key={i}
          type={type}
          defaultValue={defaultValue}
        />
      )}
      <button onClick={submit}>{submitName}</button>
    </div>
  )
}

InputFields.PropTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    defaultValue: PropTypes.any
  }).isRequired).isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitName: PropTypes.string
}

export const BookmarkInput = ({name, url, submitName, onSubmit}) => (
  <InputFields
    submitName={submitName}
    onSubmit={onSubmit}
    fields={[{
      defaultValue: name
    }, {
      defaultValue: url,
      type: 'url',
      className: styles.urlInput
    }]}
  />
)

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

export const Bookmark = ({name, url, tags, editing, setEditing, cancelEditing, edit, remove, addTag}) => {
  return editing ? (
    <div>
      <BookmarkInput submitName='Done' name={name} url={url} onSubmit={edit} />
      <button onClick={remove}>Remove</button>
      <Tags tags={tags} editing={true} />
      <InputFields onSubmit={addTag} submitName='Add Tag' fields={[{}]} />
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
