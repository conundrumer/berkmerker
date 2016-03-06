import 'systemjs-hot-reloader/default-listener.js'
export function __unload () {
  // console.log('main unloaded')
}
export function __reload (m) {
  // console.log('main reloaded', m)
}

import { createStore } from 'redux'

import App from './App.jsx'
import render from './render.jsx'
import reducer from './reducer.js'
import getState from './getState.js'

const store = getState('redux-store', () => createStore(reducer), (store) => store.replaceReducer(reducer))

render(App, store, document.getElementById('container'))
// console.log('rendered')
