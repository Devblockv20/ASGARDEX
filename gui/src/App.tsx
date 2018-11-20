import { Provider } from 'mobx-react'
import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { SwapPage } from './pages/SwapPage'
import { TradePage } from './pages/TradePage'
import { IStore } from './store/Store'

const App = ({ store }: { store: IStore }) => (
  <Provider store={store}>
    <Router>
    <div>
      <Route path="/" exact={true} component={TradePage}/>
      <Route path="/swap" component={SwapPage}/>
    </div>
  </Router>
  </Provider>
)

export default App
