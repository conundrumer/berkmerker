import React, {PropTypes} from 'react'

// import styles from './TagFilter.css!'

const TagFilter = ({tags, toggle, ownProps}) => (
  <div {...ownProps}>
    <h3>Filter by tag</h3>
    <hr/>
    {tags.map(([tag, {count, toggled}], i) =>
      <div key={tag}>
        <input type='checkbox' checked={toggled} onChange={() => toggle(tag)} />
        <span>#{tag} ({count})</span>
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

import ActionCreators from './actions.js'

const mapStateToProps = ({ui: {tagFilter: {tags}}}, ownProps) => ({
  ownProps,
  tags: Array.from(tags)
})

const mapDispatchToProps = (dispatch) => bindActionCreators(ActionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TagFilter)
