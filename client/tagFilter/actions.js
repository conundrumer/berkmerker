/* action types */
export const TOGGLE = 'tagFilter/TOGGLE'

/* action creators */
export default {
  toggle: (tag) => ({
    type: TOGGLE,
    payload: {
      tag
    }
  })
}
