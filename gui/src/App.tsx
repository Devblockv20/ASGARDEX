import { Provider } from 'mobx-react'
import * as React from 'react'
import { TradePage } from './pages/TradePage'
import { IStore } from './store/Store'

const App = ({ store }: { store: IStore }) => (
  <Provider store={store}>
    <TradePage />
  </Provider>
)

export default App
