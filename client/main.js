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
import {getState} from './hotReloadState.js'
import deduplicateTag from './middlewares/deduplicateTag.js'
import Debugger from './debug.js'

let middlewares = [deduplicateTag]
if (Debugger) {
  middlewares = [...middlewares, Debugger.diffLogger, Debugger.logger]
  middlewares = middlewares.map(Debugger.hotReloadMiddleware)
}

let store = createStore(reducer, applyMiddleware(...middlewares))

if (Debugger) {
  store = getState('redux-store', () => store, (store) => store.replaceReducer(reducer))
  Debugger.setGlobal('store', store)
}
// store.dispatch({type: 'INIT'})

let container = document.getElementById('container')
const renderApp = () => render(App, store, container)
renderApp()
// console.log('rendered')

if (Debugger) {
  Debugger.makeForceRerender(renderApp, container)
}
