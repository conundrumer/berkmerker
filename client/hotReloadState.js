// persisting state across hot reloads

let persistentState = new Map()

export function getState (key, getNew, getNext) {
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
  setState(key, state)
  return state
}

export function setState (key, state) {
  persistentState.set(key, state)
}
