import React, {PropTypes} from 'react'

import styles from './Tags.css!'

const Tags = ({tags, editing, onClick = () => {}}) => (
  <div>
    {tags.map((tag, i) =>
      <span
        key={i}
        onClick={() => onClick(i)}
        className={`${styles.tag} ${editing ? styles.tagEditing : ''}`}
      > #{tag} </span>
    )}
  </div>
)

Tags.PropTypes = {
  tags: PropTypes.array.isRequired,
  editing: PropTypes.bool,
  onClick: PropTypes.func
}

export default Tags
