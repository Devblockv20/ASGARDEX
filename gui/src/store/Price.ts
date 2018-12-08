import { Instance, types } from 'mobx-state-tree'

export const Price = types.model({
  price: types.number,
  symbol: types.string,
})

export interface IPrice extends Instance<typeof Price> {}
