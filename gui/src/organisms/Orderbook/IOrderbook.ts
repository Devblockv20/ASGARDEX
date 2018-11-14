import { ICoin } from './ICoin'

type BuyOrder = 1
type SellOrder = 2
export type OrderKind = BuyOrder | SellOrder

export interface IOrder {
  order_id: string,
  sender: string,
  kind: OrderKind,
  amount: ICoin,
  price: ICoin,
  expires_at: string,
}

export interface IOrderbook {
  key: string,
  kind: OrderKind,
  amountDenom: string,
  priceDenom: string,
  orders: IOrder[] | null,
}
