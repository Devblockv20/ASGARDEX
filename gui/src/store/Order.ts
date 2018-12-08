import { Instance, types } from 'mobx-state-tree'
import { Coin } from './Coin'

export const Order = types.model({
  amount: Coin,
  kind: types.number,
  order_id: types.identifier,
  price: Coin,
})

export interface IOrder extends Instance<typeof Order> {}
