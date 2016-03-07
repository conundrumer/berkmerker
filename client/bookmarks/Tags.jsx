import React, {PropTypes} from 'react'

import styles from './Tags.css!'

const Tags = ({tags, editing}) => (
  <div>
    {tags.map((tag, i) =>
      <span className={`${styles.tag} ${editing ? styles.tagEditing : ''}`} key={i}> #{tag} </span>
    )}
  </div>
)

Tags.PropTypes = {
  tags: PropTypes.array.isRequired,
  editing: PropTypes.bool.isRequired
}

export default Tags
