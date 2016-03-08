import React, {PropTypes} from 'react'

// import styles from './TagFilter.css!'

const TagFilter = ({tags, toggle}) => (
  <div>
    {tags.map(([tag, {count, toggled}], i) =>
      <div>
        <input type='checkbox' checked={toggled} onChange={() => toggle(tag)} />
        <span key={i}>#{tag} ({count})</span>
      </div>
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

import * as actionCreators from './actions.js'

const mapStateToProps = ({ui: {tagFilter: {tags}}}) => ({
  tags: Array.from(tags)
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TagFilter)
