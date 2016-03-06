import 'systemjs-hot-reloader/default-listener.js'

export function __reload (m) {
  console.log('reloaded')
  // if (m.component.state) {
  //   component.setState(m.component.state)
  // }
}

import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './HelloWorld.jsx'

let container = document.getElementById('container')
export let component = ReactDOM.render(<HelloWorld text='Hello World!'/>, container)
