/* actions */
const ADD = 'Tags/ADD'
const REMOVE = 'Tags/REMOVE'

export const add = (tag) => ({
  type: ADD,
  payload: {
    tag
  }
})

export const remove = (index) => ({
  type: REMOVE,
  payload: {
    index
  }
})

/* reducer */
import update from 'react-addons-update'

// tags: [string, ...]
export default function reducer (state = [], action) {
  if (!action) {
    return state
  }
  let {type, payload} = action
  switch (type) {
    case ADD:
      return state.includes(payload.tag) ? state : [...state, payload.tag]
    case REMOVE:
      return update(state, {
        $splice: [[payload.index, 1]]
      })
    default:
      return state
  }
}
