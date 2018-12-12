import { Instance, types } from 'mobx-state-tree'
import { Order } from './Order'

export const Orderbook = types.model({
  amountDenom: types.string,
  kind: types.number,
  orders: types.maybeNull(types.array(Order)),
  priceDenom: types.string,
})

export interface IOrderbook extends Instance<typeof Orderbook> {}
