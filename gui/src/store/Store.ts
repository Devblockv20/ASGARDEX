import { cast, flow, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree'
import { IExchangePair } from 'thorchain-info-common/src/interfaces/metrics'
import { env } from '../helpers/env'
import { http } from '../helpers/http'

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

const Pair = types.model({
  amountDenom: types.string,
  id: types.identifier,
  ohlcv: types.maybeNull(PairOHLCV),
  priceDenom: types.string,
})
.actions(self => ({
  fetch: flow(function* fetch() {
    try {
      const result: IExchangePair = yield http.get(
        env.REACT_APP_API_HOST + `/exchange/pair/${self.priceDenom}/${self.amountDenom}`)
      self.ohlcv = cast(result)
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`Failed to fetch pair ${self.amountDenom}/${self.priceDenom}`, error)
    }
  }),
}))

export interface IPair extends Instance<typeof Pair> {}

export const Store = types.model({
  pairSelected: types.reference(Pair),
  pairs: types.array(Pair),
})
.actions(self => ({
  selectPair(pair: IPair) {
    self.pairSelected = cast(pair.id)
  },
  subPairs() {
    setInterval(() => {
      self.pairs.map(pair => pair.fetch())
    }, 1000)
  },
}))
.actions(self => ({
  afterCreate() {
    self.subPairs()
  },
}))

export interface IStore extends Instance<typeof Store> {}
export interface IStoreIn extends SnapshotIn<typeof Store> {}
export interface IStoreOut extends SnapshotOut<typeof Store> {}
