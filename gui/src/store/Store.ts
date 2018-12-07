import { cast, flow, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree'
import { IExchangePair } from 'thorchain-info-common/src/interfaces/metrics'
import { downloadFile } from '../helpers/downloadFile'
import { env } from '../helpers/env'
import { http } from '../helpers/http'
import { loadThorchainClient } from '../helpers/loadThorchainClient'

const Coin = types.model({
  amount: types.string,
  denom: types.string,
})

export interface ICoin extends Instance<typeof Coin> {}

const Order = types.model({
  amount: Coin,
  kind: types.number,
  order_id: types.identifier,
  price: Coin,
})

export interface IOrder extends Instance<typeof Order> {}

const Orderbook = types.model({
  amountDenom: types.string,
  kind: types.number,
  orders: types.maybeNull(types.array(Order)),
  priceDenom: types.string,
})

export interface IOrderbook extends Instance<typeof Orderbook> {}

const Trade = types.model({
  amount: types.number,
  price: types.number,
})
.views(self => ({
  get key () {
    return self.amount + '/' + self.price
  },
  get volume () {
    return self.amount * self.price
  },
}))

export interface ITrade extends Instance<typeof Trade> {}

// variable names in this model are in line with TradingView:
// c: closing price
// h: highest price
// l: lowest price
// o: opening price
// v: volume
const PairOHLCV = types.model({
  c: types.number,
  h: types.number,
  l: types.number,
  o: types.number,
  v: types.number,
})
.views(self => ({
  get change () {
    return self.c - self.o
  },
  get changePercent () {
    if (self.o === 0) { return 0 }
    return (self.c - self.o) / self.o
  },
}))

export interface IPairOHLCV extends Instance<typeof PairOHLCV> {}

const Pair = types.model({
  amountDenom: types.string,
  buyOrderbook: types.maybeNull(Orderbook),
  id: types.identifier,
  ohlcv: types.maybeNull(PairOHLCV),
  priceDenom: types.string,
  sellOrderbook: types.maybeNull(Orderbook),
  trades: types.maybeNull(types.array(Trade)),
})
.actions(self => ({
  fetchOhlcv: flow(function* fetchOhlcv() {
    try {
      const result: IExchangePair = yield http.get(
        env.REACT_APP_API_HOST + `/exchange/pair/${self.priceDenom}/${self.amountDenom}`)
      self.ohlcv = cast(result)
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`Failed to fetch pair ${self.amountDenom}/${self.priceDenom}`, error)
    }
  }),
  fetchOrderboks: flow(function* fetchOrderboks() {
    try {
      const [buyOrderbook, sellOrderbook] = yield Promise.all([
        http.post(env.REACT_APP_LCD_API_HOST + '/exchange/query-order-book',
          { kind: 'buy', amount_denom: self.amountDenom, price_denom: self.priceDenom }),
        http.post(env.REACT_APP_LCD_API_HOST + '/exchange/query-order-book',
          { kind: 'sell', amount_denom: self.amountDenom, price_denom: self.priceDenom }),
      ])

      self.buyOrderbook = cast(buyOrderbook)
      self.sellOrderbook = cast(sellOrderbook)
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`Failed to fetch orderbooks for ${self.amountDenom}/${self.priceDenom}`, error)
    }
  }),
  fetchTrades: flow(function* fetchTrades() {
    try {
      const result: IExchangePair = yield http.get(
        env.REACT_APP_API_HOST + `/exchange/trades/${self.priceDenom}/${self.amountDenom}`)
      self.trades = cast(result)
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`Failed to fetch trades ${self.amountDenom}/${self.priceDenom}`, error)
    }
  }),
}))

export interface IPair extends Instance<typeof Pair> {}


const Price = types.model({
  price: types.number,
  symbol: types.string,
})


const Wallet = types.model({
  address: types.string,
  privateKey: types.string,
  publicKey: types.string,
})

export interface IPrice extends Instance<typeof Price> {}

export const Store = types.model({
  pairSelected: types.reference(Pair),
  pairs: types.array(Pair),
  prices: types.array(Price),
  thorchainClientLoaded: types.boolean,
  wallet: types.maybeNull(Wallet),
})
.actions(self => ({
  selectPair(pair: IPair) {
    self.pairSelected = cast(pair.id)
  },
  createWallet: flow(function* fetchPrices() {
    try {
      const { client } = yield loadThorchainClient()
      const walletString = yield client.createKey()
      const wallet = JSON.parse(String(walletString))

      self.wallet = cast({
        address: wallet.addr,
        privateKey: wallet.priv,
        publicKey: wallet.pub,
      })

      // Base-64 encode the data
      const walletFileContents = btoa(String(walletString))

      // Store & download new wallet file
      window.localStorage.setItem('key.thorchain', walletFileContents)
      downloadFile('key.thorchain', walletFileContents)
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`Failed to create wallet`, error)
    }
  }),
  forgetWallet() {
    window.localStorage.removeItem('key.thorchain')
    self.wallet = null
  },
  loadWallet(walletFileContents?: string | null) {
    let isStored = false

    // Load wallet from local storage
    if (!walletFileContents) {
      walletFileContents = window.localStorage.getItem('key.thorchain')
      isStored = true
    }

    if (!walletFileContents) {
      return
    }

    try {
      const wallet = JSON.parse(atob(walletFileContents))

      self.wallet = cast({
        address: wallet.addr,
        privateKey: wallet.priv,
        publicKey: wallet.pub,
      })

      // Store the wallet locally if it isn't already
      if (!isStored) {
        window.localStorage.setItem('key.thorchain', walletFileContents)
      }
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`Failed to load wallet from localstorage`, error)
    }
  },
  fetchPrices: flow(function* fetchPrices() {
    try {
      const prices: [IPrice] = yield http.get(
        `${env.REACT_APP_API_HOST}/swap/prices`,
      )
      self.prices = cast(prices.map(price => ({ symbol: price.symbol, price: Number(price.price) })))
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`Failed to fetch prices`, error)
    }
  }),
  getTokenPriceInUsdt(amount: number, denom: string) {
    const pricesData = self.prices

    if (!pricesData) {
      return null
    }

    let BTCtoUSDT
    let denomToBTC

    if (denom === 'USDT') {
      return amount
    }

    for (const price of pricesData) {
      if (price.symbol === `${denom}USDT`) {
        return amount * price.price
      }

      if (price.symbol === `${denom}BTC`) {
        denomToBTC = price.price
      }

      if (price.symbol === 'BTCUSDT') {
        BTCtoUSDT = price.price
      }
    }

    if (BTCtoUSDT && denomToBTC) {
      return amount * denomToBTC * BTCtoUSDT
    }

    return null
  },
  loadClient: flow(function* loadClient() {
    try {
      const { client } = yield loadThorchainClient()
      self.thorchainClientLoaded = Boolean(client)
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`Failed to load up thorchain client`, error)
    }
  }),
  sub() {
    const fetch = () => {
      self.pairs.map(pair => pair.fetchOhlcv())
      self.pairSelected.fetchOrderboks()
      self.pairSelected.fetchTrades()
    }

    setInterval(fetch, 1000)

    fetch()
  },
}))
.actions(self => ({
  afterCreate() {
    self.sub()
    self.loadClient()
    self.loadWallet()
  },
}))

export interface IStore extends Instance<typeof Store> {}
export interface IStoreIn extends SnapshotIn<typeof Store> {}
export interface IStoreOut extends SnapshotOut<typeof Store> {}
