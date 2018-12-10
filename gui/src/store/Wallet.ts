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
}))

export interface IWallet extends Instance<typeof Wallet> {}
