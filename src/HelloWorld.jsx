import React from 'react'
import { connect } from 'react-redux'

import styles from './HelloWorld.css!'

const HelloWorld = ({text, onClick}) => (
  <h1 className={styles.HelloWorld} onClick={onClick}>{text}</h1>
)

const mapStateToProps = (state, ownProps) => {
  return {
    text: `${state.text} ${ownProps.text} ${state.counter}`
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({type: 'INC'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloWorld)
