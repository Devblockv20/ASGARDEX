import { Instance, types } from 'mobx-state-tree'

// variable names in this model are in line with TradingView:
// c: closing price
// h: highest price
// l: lowest price
// o: opening price
// v: volume
export const PairOHLCV = types.model({
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
