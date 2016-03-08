import React, {PropTypes} from 'react'

import BookmarkInput from './BookmarkInput.jsx'
import Tags from '../tags/Tags.jsx'
import InputFields from './InputFields.jsx'

import styles from './Bookmark.css!'

const Bookmark = ({name, url, tags, editing, setEditing, edit, remove, addTag, removeTag}) => {
  return editing ? (
    <div className={styles.bookmarkEditor}>
      <BookmarkInput submitName='Done' name={name} url={url} onSubmit={edit} />
      <InputFields onSubmit={addTag} submitName='Add Tag' fields={[{label: 'Tag'}]} />
      <Tags tags={tags} editing={true} onClick={removeTag} />
      <button onClick={remove}>Remove bookmark</button>
    </div>
  ) : (
    <div className={styles.bookmark}>
      <div className={styles.bookmarkLink}>
        <span><a href={url} target='_blank'>{name}</a></span>
        <Tags tags={tags} onClick={() => {}} />
      </div>
      <button onClick={setEditing}>Edit</button>
    </div>
  )
}

Bookmark.PropTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  editing: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired
}

export default Bookmark
