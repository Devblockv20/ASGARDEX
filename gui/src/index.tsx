import { getSnapshot } from 'mobx-state-tree'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { createStore, store } from './store/createStore'
import { IStore, IStoreIn } from './store/Store'

const initialState: IStoreIn = {
  pairSelected: 'XMR/RUNE',
  pairs: [
    { amountDenom: 'BTC', id: 'BTC/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'ETH', id: 'ETH/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'XMR', id: 'XMR/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'XRP', id: 'XRP/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'NEO', id: 'NEO/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'EOS', id: 'EOS/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'DASH', id: 'DASH/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'CAN', id: 'CAN/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'LOKI', id: 'LOKI/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'XEM', id: 'XEM/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'ADA', id: 'ADA/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'LTC', id: 'LTC/RUNE', priceDenom: 'RUNE' },
  ],
}

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
    // Componenent definition changed, re-render app
    renderApp(App, store)
  })
}
