/* actions */
const ADD = 'Bookmarks/ADD'
const REMOVE = 'Bookmarks/REMOVE'

const add = (text) => ({type: ADD, payload: {text}})
const remove = (index) => ({type: REMOVE, payload: {index}})

const actions = {add, remove}

/* reducer */
export function reducer (state = {items: []}, action) {
  switch (action.type) {
    case ADD:
      return {
        items: [action.payload, ...state.items]
      }
    case REMOVE:
      return {
        items: state.items.filter((_, i) => action.payload.index !== i)
      }
    default:
      return state
  }
}

/* component */
import React from 'react'

// import styles from './HelloWorld.css!'

export const Bookmark = ({text, remove}) => (
  <div>
    <span>{text}</span>
    <button onClick={remove}>Remove</button>
  </div>
)

export const Bookmarks = ({items, add, remove}) => {
  let input
  return (
    <div>
      <input type='text' ref={node => { input = node }} />
      <button onClick={() => { add(input.value); input.value = '' }}>Add</button>
      {items.map((item, i) =>
        <Bookmark key={i} remove={() => remove(i)} {...item} />
      )}
    </div>
  )
}

/* container */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const mapStateToProps = ({ui: {bookmarks}}, ownProps) => ({...bookmarks})

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks)
