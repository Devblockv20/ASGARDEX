import { cast, flow, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree'
import { IExchangePair } from 'thorchain-info-common/src/interfaces/metrics'
import { env } from '../helpers/env'
import { http } from '../helpers/http'

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

export interface IPrice extends Instance<typeof Price> {}

export const Store = types.model({
  pairSelected: types.reference(Pair),
  pairs: types.array(Pair),
  prices: types.array(Price),
})
.actions(self => ({
  selectPair(pair: IPair) {
    self.pairSelected = cast(pair.id)
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
  getTokenPriceInUsd(amount: number, denom: string) {
    const pricesData = self.prices

    if (!pricesData) {
      return 0
    }

    let BTCtoUSDT
    let denomToBTC

    if (denom === 'USDT') {
      return 1
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

    return 0
  },
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
  },
}))

export interface IStore extends Instance<typeof Store> {}
export interface IStoreIn extends SnapshotIn<typeof Store> {}
export interface IStoreOut extends SnapshotOut<typeof Store> {}
