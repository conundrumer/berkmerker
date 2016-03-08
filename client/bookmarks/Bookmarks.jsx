/* component */
import React, {PropTypes} from 'react'

import BookmarkInput from './BookmarkInput.jsx'
import Bookmark from './Bookmark.jsx'

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

import * as actionCreators from './actions.js'
import {add as addTag, remove as removeTag} from '../tags/reduxModule.js'

const mapStateToProps = ({ui: {bookmarks: {editing, items}, tagFilter: {tags}}}) => {
  let filters = Array.from(tags).filter(([_, {toggled}]) => toggled).map(([tag]) => tag)
  return {
    editing,
    items: filters.length > 0 ? items.filter(({tags: itemTags}) =>
      filters.every(tagFilter =>
        itemTags.includes(tagFilter)
      )
    ) : items
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

const mergeProps = ({items, editing}, {add, setEditing, edit, remove, modifyTags}) => ({
  add,
  items: items.map(({name, url, tags}, i) => ({
    name,
    url,
    tags,
    editing: i === editing,
    setEditing: () => setEditing(i),
    edit: (...args) => edit(i, ...args),
    remove: () => remove(i),
    addTag: (tag) => modifyTags(i, addTag(tag)),
    removeTag: (tag, tagIndex) => modifyTags(i, removeTag(tag, tagIndex))
  }))
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Bookmarks)
