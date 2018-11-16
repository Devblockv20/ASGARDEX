import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { createStore } from './store/createStore'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = createStore({})
  ReactDOM.render(<App store={store} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
