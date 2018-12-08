import { Instance, types } from 'mobx-state-tree'

export const TradingPool  = types.model({
  accountAddress: types.string, // original: account_address
  creator: types.string,
  currentSupply: types.number, // original: is string
  decimals: types.number,
  denom: types.string, // original: ticker
  denomAmount: types.number, // original: XRP, etc (denom)
  initialSupply: types.number, // original: is string
  name: types.string,
  price: types.number,
  reserveRatio: types.number, // original: is string
  runeAmount: types.number, // original: RUNE
})

export interface ITradingPool extends Instance<typeof TradingPool> {}
