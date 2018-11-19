// TODO usage of this function with getTokenPriceInUsd in Store.ts
export const getInUsd = (amount: number) => {
  const ethPerRune = 1 / 12500
  const usdPerEth = 204.43
  const usd = amount * ethPerRune * usdPerEth
  return usd
}
