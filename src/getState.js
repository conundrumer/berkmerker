// persisting state across hot reloads

let persistentState = new Map()

export default function getState (key, getNew, getNext) {
  let state
  if (!persistentState.has(key)) {
    state = getNew()
  } else {
    state = persistentState.get(key)
    if (getNext instanceof Function) {
      let nextState = getNext(state)
      if (typeof nextState !== 'undefined') {
        state = nextState
      }
    }
  }
  persistentState.set(key, state)
  return state
}
