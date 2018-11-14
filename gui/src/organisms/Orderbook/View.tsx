import * as React from 'react'
import styled from 'styled-components'
import bars from './bars.svg'
import { ICoin } from './ICoin'
import { IOrder, IOrderbook, OrderKind } from './IOrderbook'

interface IProps {
  buyOrderbook: IOrderbook
  sellOrderbook: IOrderbook
}

export const OrderbookView = ({ buyOrderbook, sellOrderbook }: IProps) => <Container>
  <Header>
    <Col>Price ({buyOrderbook.priceDenom})</Col>
    <Col>Amount ({buyOrderbook.amountDenom})</Col>
    <Col>Total ({buyOrderbook.priceDenom})</Col>
  </Header>
  {sellOrderbook.orders && sellOrderbook.orders.reverse().map(order => (
    <OrderLine key={order.order_id} order={order} />
  ))}
  <Live>
    <Col>{buyOrderbook.orders && buyOrderbook.orders[0].price.amount}</Col>
    <Col>${buyOrderbook.orders && getInUsd(buyOrderbook.orders[0].price)}</Col>
    <Col><Icon src={bars} /></Col>
  </Live>
  {buyOrderbook.orders && buyOrderbook.orders.map(order => (
    <OrderLine key={order.order_id} order={order} />
  ))}

</Container>

const OrderLine = ({ order }: { order: IOrder }) => <OrderLineRow kind={order.kind}>
  <Col>{order.price.amount}</Col>
  <Col>{order.amount.amount}</Col>
  <Col>{Number(order.price.amount) * Number(order.amount.amount)}</Col>
</OrderLineRow>

const Container = styled.div`
`

const Header = styled.div`
  font-family: "Open Sans";
  font-size: 14px;
  letter-spacing: 0.7px;
  color: white;
  display: flex;
  opacity: 0.7;
  padding: 15px 20px;
`

const OrderLineRow = styled(Header)<{ kind: OrderKind }>`
  opacity: 1;
  padding: 4px 20px;

  div:first-child {
    color: ${({ kind }) => kind === 1 ? '#00C486' : '#FE4764'};
  }
`

const Col = styled.div`
  flex: 1 0 33%;
`

const Live = styled.div`
  display: flex;
  padding: 10px 20px;
  background: #747B8110;

  font-family: "Open Sans";
  font-size: 20px;
  letter-spacing: 0.7px;
  font-weight: 600;
  color: white;

  div:first-child {
    font-weight: 700;
    color: #00C486;
  }
`

const Icon = styled.img`
  float: right;
  margin-top: 5px;
`

// TODO replace with dynamic function by Haneef
const getInUsd = (coin: ICoin) => {
  const ethPerRune = 1 / 12500
  const usdPerEth = 204.43
  const usd = parseInt(coin.amount, 10) * ethPerRune * usdPerEth
  return usd.toFixed(2)
}
