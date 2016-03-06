export default function reducer (state = {text: 'hello', counter: 0}, action) {
  if (action.type === 'INC') {
    return {
      text: state.text,
      counter: state.counter + 1
    }
  }
  return state
}
