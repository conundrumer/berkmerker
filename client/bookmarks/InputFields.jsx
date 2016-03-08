import React, {PropTypes} from 'react'

import styles from './InputFields.css!'

const InputFields = ({fields, onSubmit, submitName = 'Submit', ...ownProps}) => {
  let inputs = Array(fields.length)
  let submit = () => {
    onSubmit(...inputs.map(input => input.value))
    inputs.forEach(input => input.value = '')
  }
  return (
    <div className={styles.container}>
      <div>
      {fields.map(({type = 'text', label, defaultValue, ...fieldProps}, i) =>
        <div className={styles.field} key={i}>
          <label>{label}</label>
          <input {...fieldProps}
            ref={node => inputs[i] = node}
            type={type}
            defaultValue={defaultValue}
          />
        </div>
      )}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={submit}>{submitName}</button>
      </div>
    </div>
  )
}

InputFields.PropTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    defaultValue: PropTypes.any
  }).isRequired).isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitName: PropTypes.string
}

export default InputFields
