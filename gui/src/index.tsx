import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.css'

function renderApp(CurrentApp: typeof App) {
  ReactDOM.render(<CurrentApp />, document.getElementById('root'))
}

// Initial render
renderApp(App)

// Connect HMR
if ((module as any).hot) {
  (module as any).hot.accept(['./App'], () => {
    // Component definition changed, re-render app
    renderApp(App)
  })
}
