/* actions */
const INC = 'INC'

const inc = () => ({type: INC})

// const actionTypes = {INC}
const actions = {inc}

/* reducer */
export function reducer (state = {text: 'hello', counter: 0}, action) {
  switch (action.type) {
    case INC:
      return {
        ...state,
        counter: state.counter + 1
      }
    default:
      return state
  }
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

const mapStateToProps = ({ui: {helloWorld: state}}, ownProps) => ({
  text: `${state.text} ${ownProps.text} ${state.counter}`
})

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HelloWorld)
