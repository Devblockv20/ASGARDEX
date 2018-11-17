import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { formatNum } from 'thorchain-info-common/build/helpers/formatNum'
import { ITrade } from '../../store/Store'

interface IProps {
  trades: ITrade[]
}

export const TradeHistoryView = observer(({ trades }: IProps) => <Container>
  <Header>
    Trade History
  </Header>
  {trades.map(trade => (
    <TradeLine key={trade.key} trade={trade} />
  ))}
</Container>)

const TradeLine = observer(({ trade }: { trade: ITrade }) => <TradeLineRow>
  <Col>{formatNum(trade.price, 2)}</Col>
  <Col>{formatNum(trade.amount, 6)}</Col>
  <Col>{formatNum(trade.volume, 8)}</Col>
</TradeLineRow>)

const Container = styled.div`
`

const Header = styled.div`
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.7px;
  margin: 20px 0 8px;

  background: #747B8110;
  padding: 10px 20px;
`

const TradeLineRow = styled.div`
  display: flex;
  font-family: "Open Sans";
  font-size: 14px;
  letter-spacing: 0.7px;
  opacity: 1;
  padding: 4px 20px;
`

const Col = styled.div`
  flex: 1 0 30%;

  :first-child {
    flex: 1 0 35%;
  }

  :last-child {
    flex: 1 0 35%;
    text-align: right;
  }
`
