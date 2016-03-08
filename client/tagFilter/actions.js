/* action types */
const TOGGLE = 'tagFilter/TOGGLE'

/* action creators */
export const toggle = (tag) => ({
  type: TOGGLE,
  payload: {
    tag
  }
})
