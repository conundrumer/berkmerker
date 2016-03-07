import React, {PropTypes} from 'react'

import InputFields from './InputFields.jsx'
import styles from './BookmarkInput.css!'

const BookmarkInput = ({name, url, submitName, onSubmit}) => (
  <InputFields
    submitName={submitName}
    onSubmit={onSubmit}
    fields={[{
      defaultValue: name
    }, {
      defaultValue: url,
      type: 'url',
      className: styles.urlInput
    }]}
  />
)

BookmarkInput.PropTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  submitName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export default BookmarkInput
