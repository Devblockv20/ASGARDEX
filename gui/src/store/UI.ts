import { Instance, types } from 'mobx-state-tree'

export const UI = types.model({
  tradePageTradeHistoryType: types.enumeration(['market', 'own']),
  walletErrorMessage: types.maybeNull(types.string),
})
.actions(self => ({
  setTradePageTradeHistoryType (type: 'market' | 'own') {
    self.tradePageTradeHistoryType = type
  },
  setWalletError (errorMessage: string) {
    self.walletErrorMessage = errorMessage
  },
  clearWalletError () {
    self.walletErrorMessage = null
  },
}))

export interface IUI extends Instance<typeof UI> {}
