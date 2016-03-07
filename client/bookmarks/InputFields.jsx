import React, {PropTypes} from 'react'

const InputFields = ({fields, onSubmit, submitName = 'Submit'}) => {
  let inputs = Array(fields.length)
  let submit = () => {
    onSubmit(...inputs.map(input => input.value))
    inputs.forEach(input => input.value = '')
  }
  return (
    <div>
      {fields.map(({type = 'text', defaultValue, ...fieldProps}, i) =>
        <input {...fieldProps}
          ref={node => inputs[i] = node}
          key={i}
          type={type}
          defaultValue={defaultValue}
        />
      )}
      <button onClick={submit}>{submitName}</button>
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
