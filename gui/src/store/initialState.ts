import { IStoreIn } from './Store'

export const initialState: IStoreIn = {
  pairSelected: 'XMR/RUNE',
  pairs: [
    { amountDenom: 'BTC', id: 'BTC/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'ETH', id: 'ETH/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'XMR', id: 'XMR/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'XRP', id: 'XRP/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'NEO', id: 'NEO/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'EOS', id: 'EOS/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'DASH', id: 'DASH/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'CAN', id: 'CAN/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'LOKI', id: 'LOKI/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'XEM', id: 'XEM/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'ADA', id: 'ADA/RUNE', priceDenom: 'RUNE' },
    { amountDenom: 'LTC', id: 'LTC/RUNE', priceDenom: 'RUNE' },
  ],
  thorchainClientLoaded: false,
  ui: {
    tradePageTradeHistoryType: 'market',
  },
}
