import React from 'react'

import styles from './HelloWorld.css!'

export default (props) => (
  <h1 className={styles.HelloWorld}>{props.text}</h1>
)
