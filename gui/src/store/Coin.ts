import { Instance, types } from 'mobx-state-tree'

export const Coin = types.model({
  amount: types.string,
  denom: types.string,
})

export interface ICoin extends Instance<typeof Coin> {}
