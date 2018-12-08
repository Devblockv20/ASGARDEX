import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { formatNum } from 'thorchain-info-common/build/helpers/formatNum'
import { ValueColored } from '../../atoms/ValueColored'
import { getInUsd } from '../../helpers/getInUsd'
import { IOrder } from '../../store/Order'
import { IOrderbook } from '../../store/Orderbook'
import { IPairOHLCV } from '../../store/PairOHLCV'
import bars from './bars.svg'

interface IProps {
  buyOrderbook: IOrderbook
  sellOrderbook: IOrderbook
  ohlcv: IPairOHLCV
}

export const OrderbookView = observer(({ buyOrderbook, sellOrderbook, ohlcv }: IProps) => <Container>
  <Header>
    <Col>Price ({buyOrderbook.priceDenom})</Col>
    <Col>Amount ({buyOrderbook.amountDenom})</Col>
    <Col>Total ({buyOrderbook.priceDenom})</Col>
  </Header>
  {sellOrderbook.orders && sellOrderbook.orders.reverse().map(order => (
    <OrderLine key={order.order_id} order={order} />
  ))}
  <Live>
    <Col><ValueColored change={ohlcv.change}>{formatNum(ohlcv.c, 2)}</ValueColored></Col>
    <Col>${formatNum(getInUsd(ohlcv.c), 2)}</Col>
    <Col><Icon src={bars} /></Col>
  </Live>
  {buyOrderbook.orders && buyOrderbook.orders.map(order => (
    <OrderLine key={order.order_id} order={order} />
  ))}
</Container>)

const OrderLine = observer(({ order }: { order: IOrder }) => <OrderLineRow kind={order.kind}>
  <Col>{formatNum(Number(order.price.amount), 2)}</Col>
  <Col>{formatNum(Number(order.amount.amount), 6)}</Col>
  <Col>{formatNum(Number(order.price.amount) * Number(order.amount.amount), 8)}</Col>
</OrderLineRow>)

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

const OrderLineRow = styled(Header)<{ kind: number }>`
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
  margin: 8px 0;

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
