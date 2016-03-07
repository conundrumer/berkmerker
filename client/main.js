import 'systemjs-hot-reloader/default-listener.js'
export function __unload () {
  // console.log('main unloaded')
}
export function __reload (m) {
  console.log('main reloaded', m)
}

import { applyMiddleware, createStore } from 'redux'

import App from './App.jsx'
import render from './render.jsx'
import reducer from './reducer.js'
import getState from './getState.js'
import Debugger from './debug.js'

let middlewares = []
if (Debugger) {
  middlewares = [...middlewares, Debugger.diffLogger, Debugger.logger]
}
const store = getState('redux-store', () => createStore(reducer, applyMiddleware(...middlewares)), (store) => store.replaceReducer(reducer))

if (Debugger) {
  Debugger.setGlobalStore(store)
}
// store.dispatch({type: 'INIT'})

render(App, store, document.getElementById('container'))
// console.log('rendered')
