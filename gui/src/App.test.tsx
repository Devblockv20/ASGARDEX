import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { createStore } from './store/createStore'
import { initialState } from './store/initialState'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = createStore(initialState)
  ReactDOM.render(<App store={store} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
