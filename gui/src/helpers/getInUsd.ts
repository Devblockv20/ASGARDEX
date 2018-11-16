// TODO replace with dynamic function by Haneef
export const getInUsd = (amount: number) => {
  const ethPerRune = 1 / 12500
  const usdPerEth = 204.43
  const usd = amount * ethPerRune * usdPerEth
  return usd
}
