import { Instance, types } from 'mobx-state-tree'

export const UI = types.model({
  tradePageTradeHistoryType: types.enumeration(['market', 'own']),
})
.actions(self => ({
  setTradePageTradeHistoryType (type: 'market' | 'own') {
    self.tradePageTradeHistoryType = type
  },
}))

export interface IUI extends Instance<typeof UI> {}
