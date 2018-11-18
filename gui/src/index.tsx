import { getSnapshot } from 'mobx-state-tree'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { createStore, store } from './store/createStore'
import { initialState } from './store/initialState'
import { IStore } from './store/Store'

function renderApp(CurrentApp: typeof App, currentStore: IStore) {
  ReactDOM.render(<CurrentApp store={currentStore} />, document.getElementById('root'))
}

// Initial render
renderApp(App, createStore(initialState))

// Connect HMR
if ((module as any).hot) {
  (module as any).hot.accept(['./store/Store'], () => {
    // Store definition changed, recreate a new one from old state
    renderApp(App, createStore(getSnapshot(store)))
  });

  (module as any).hot.accept(['./App'], () => {
    // Component definition changed, re-render app
    renderApp(App, store)
  })
}
