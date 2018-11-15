import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { SwapPage } from './pages/SwapPage'
import { TradePage } from './pages/TradePage'

const App = () => (
  <Router>
    <div>
      <Route path="/" exact={true} component={TradePage}/>
      <Route path="/swap" component={SwapPage}/>
    </div>
  </Router>
)

export default App
