/* actions */
const INC = 'INC'

const inc = () => ({type: INC})

// const actionTypes = {INC}
const actions = {inc}

/* reducer */
export function reducer (state = {text: 'hello', counter: 0}, action) {
  if (action.type === INC) {
    return {
      text: state.text,
      counter: state.counter + 1
    }
  }
  return state
}

/* component */
import React from 'react'

import styles from './HelloWorld.css!'

export const HelloWorld = ({text, inc}) => (
  <h1 className={styles.HelloWorld} onClick={inc}>{text}</h1>
)

/* container */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const mapStateToProps = ({helloWorld: state}, props) => ({
  text: `${state.text} ${props.text} ${state.counter}`
})

const mapDispatchToProps = (dispatch, props) => bindActionCreators({inc: actions.inc}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HelloWorld)
