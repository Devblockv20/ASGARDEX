import { cast, flow, Instance, types } from 'mobx-state-tree'
import { env } from '../helpers/env'
import { http } from '../helpers/http'
import { Coin } from './Coin'

export const Wallet = types.model({
  address: types.string,
  coins: types.array(Coin),
  privateKey: types.string,
  publicKey: types.string,
})
.actions(self => ({
  fetchCoins: flow(function* fetchCoins() {
    try {
      const account: any = yield http.get(
        `${env.REACT_APP_LCD_API_HOST}/accounts/${self.address}`,
      )

      if (!account) {
        return
      }

      self.coins = cast(account.value.coins)
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`Failed to fetch wallet coins`, error)
    }
  }),
  fetchLatestAccountNumberAndSequence: flow(function* fetchLatestAccountNumberAndSequence() {
    const account = yield http.get(`${env.REACT_APP_LCD_API_HOST}/accounts/${self.address}`)
    const accountNumber = parseInt(account.value.account_number, 10)
    const sequence = parseInt(account.value.sequence, 10)
    if (isNaN(accountNumber)) { throw new Error(
      `Could not get valid account number for address "${self.address}", got ${account.value.account_number}`) }
    if (isNaN(sequence)) { throw new Error(
      `Could not get valid sequence for address "${self.address}", got ${account.value.sequence}`) }
    return { accountNumber, sequence }
  }),
}))
.views(self => ({
  getCoinAmount (denom: string) {
    const coin = self.coins.find(c => c.denom === denom)
    if (!coin) { return null }
    return coin.amount
  },
}))

export interface IWallet extends Instance<typeof Wallet> {}
