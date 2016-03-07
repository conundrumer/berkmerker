import React, {PropTypes} from 'react'

// import styles from './TagFilter.css!'

const TagFilter = ({tags}) => (
  <div>
    {Array.from(tags).map(([tag, {count, toggled}], i) =>
      <div key={i}>#{tag} ({count})</div>
    )}
  </div>
)

TagFilter.PropTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    0: PropTypes.string.isRequired,
    1: PropTypes.shape({
      count: PropTypes.number.isRequired,
      toggled: PropTypes.bool.isRequired
    }).isRequired
  }).isRequired).isRequired
}

/* container */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import * as actionCreators from './reduxModule.js'
let actionCreators = {}

const mapStateToProps = ({ui: {tagFilter}}) => ({...tagFilter})

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

const mergeProps = ({tags}, dispatchProps) => ({tags})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TagFilter)
