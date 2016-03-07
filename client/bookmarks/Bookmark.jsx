import React, {PropTypes} from 'react'

import BookmarkInput from './BookmarkInput.jsx'
import Tags from './Tags.jsx'
import InputFields from './InputFields.jsx'

const Bookmark = ({name, url, tags, editing, setEditing, cancelEditing, edit, remove, addTag}) => {
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

export default Bookmark
