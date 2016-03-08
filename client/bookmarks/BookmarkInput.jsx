import React, {PropTypes} from 'react'

import InputFields from './InputFields.jsx'
import styles from './BookmarkInput.css!'

const BookmarkInput = ({name, url, submitName, onSubmit}) => (
  <InputFields
    className={styles.input}
    submitName={submitName}
    onSubmit={onSubmit}
    fields={[{
      label: 'Name',
      defaultValue: name,
      placeholder: 'Example Website'
    }, {
      label: 'URL',
      defaultValue: url,
      type: 'url',
      className: styles.urlInput,
      placeholder: 'http://example.org'
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
