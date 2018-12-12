import { Instance, types } from 'mobx-state-tree'
import { uniqueId } from '../helpers/uniqueId'

export const Trade = types.model({
  amount: types.number,
  price: types.number,
})
.views(self => ({
  get key () {
    return uniqueId('trade')
  },
  get volume () {
    return self.amount * self.price
  },
}))

export interface ITrade extends Instance<typeof Trade> {}
