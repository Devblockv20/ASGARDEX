import { Instance, types } from 'mobx-state-tree'

export const Trade = types.model({
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
