import { cast, flow, Instance, types } from 'mobx-state-tree'
import { IExchangePair } from 'thorchain-info-common/src/interfaces/metrics'
import { env } from '../helpers/env'
import { http } from '../helpers/http'
import { Orderbook } from './Orderbook'
import { PairOHLCV } from './PairOHLCV'
import { Trade } from './Trade'

export const Pair = types.model({
  amountDenom: types.string,
  buyOrderbook: types.maybeNull(Orderbook),
  id: types.identifier,
  ohlcv: types.maybeNull(PairOHLCV),
  priceDenom: types.string,
  sellOrderbook: types.maybeNull(Orderbook),
  trades: types.maybeNull(types.array(Trade)),
  tradesOwn: types.maybeNull(types.array(Trade)),
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
  fetchTradesOwn: flow(function* fetchTradesOwn(account: string) {
    try {
      const result: IExchangePair = yield http.get(
        env.REACT_APP_API_HOST + `/exchange/trades/${self.priceDenom}/${self.amountDenom}?account=${account}`)
      self.tradesOwn = cast(result)
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`Failed to fetch own trades ${self.amountDenom}/${self.priceDenom}?account=${account}`, error)
    }
  }),
}))

export interface IPair extends Instance<typeof Pair> {}
