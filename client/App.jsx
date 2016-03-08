import React from 'react'

import Bookmarks from './bookmarks/Bookmarks.jsx'
import TagFilter from './tagFilter/TagFilter.jsx'

import styles from './App.css!'

export default () => (
  <div className={styles.container}>
    <div className={styles.header}>
      <h1>BERKMERKER</h1>
      <hr/>
    </div>
    <div className={styles.content}>
      <TagFilter className={styles.filterPanel} />
      <Bookmarks className={styles.mainPanel} />
    </div>
  </div>
)
