import { cast, flow, Instance, types } from 'mobx-state-tree'
import { env } from '../helpers/env'
import { http } from '../helpers/http'
import { Coin } from './Coin'

export const Wallet = types.model({
  accountNumber: types.maybeNull(types.number),
  address: types.string,
  coins: types.array(Coin),
  privateKey: types.string,
  publicKey: types.string,
  sequence: types.maybeNull(types.number),
})
.actions(self => ({
  fetchCoinsAccountNumberAndSequence: flow(function* fetchCoinsAccountNumberAndSequence() {
    try {
      const account: any = yield http.get(`${env.REACT_APP_LCD_API_HOST}/accounts/${self.address}`)

      if (!account) {
        return
      }

      self.coins = cast(account.value.coins)

      const accountNumber = parseInt(account.value.account_number, 10)
      const sequence = parseInt(account.value.sequence, 10)
      if (isNaN(accountNumber)) { throw new Error(
        `Could not get valid account number for address "${self.address}", got ${account.value.account_number}`) }
      if (isNaN(sequence)) { throw new Error(
        `Could not get valid sequence for address "${self.address}", got ${account.value.sequence}`) }

      self.accountNumber = accountNumber
      self.sequence = sequence
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`Failed to fetch wallet coins`, error)
    }
  }),
  nextSequence() {
    if (self.sequence === null) { return 0 }
    return self.sequence++
  },
  decreaseSequence() {
    if (self.sequence === null) { return }
    if (self.sequence === 0) { return }
    self.sequence--
  },
}))
.views(self => ({
  getCoinAmount (denom: string) {
    const coin = self.coins.find(c => c.denom === denom)
    if (!coin) { return null }
    return coin.amount
  },
}))

export interface IWallet extends Instance<typeof Wallet> {}
