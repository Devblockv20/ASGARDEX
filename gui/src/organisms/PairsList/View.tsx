import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { formatNum } from 'thorchain-info-common/build/helpers/formatNum'
import { formatPercent } from 'thorchain-info-common/build/helpers/formatPercent'
import { IPair } from '../../store/Store'

interface IProps {
  pairs: IPair[]
}

export const PairsListView = observer(({ pairs }: IProps) => <Container>
  <Header>
    <Col>Pair</Col>
    <Col>Price</Col>
    <Col>Change</Col>
  </Header>
  {pairs.map(pair => (
    <PairLine key={pair.amountDenom + pair.priceDenom} pair={pair} />
  ))}
</Container>)

const PairLine = observer(({ pair }: { pair: IPair }) => <PairLineRow change={pair.ohlcv ? pair.ohlcv.change : 0}>
  <Col>{pair.amountDenom}/{pair.priceDenom}</Col>
  <Col>{pair.ohlcv && formatNum(pair.ohlcv.c, 8)}</Col>
  <Col>{pair.ohlcv && formatPercent(pair.ohlcv.changePercent, 2)}</Col>
</PairLineRow>)

const Container = styled.div`
`

const Header = styled.div`
  font-family: "Open Sans";
  font-size: 16px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.63px;

  display: flex;
  opacity: 0.5;
  padding: 15px 20px;
`

const PairLineRow = styled(Header)<{ change: number }>`
  font-size: 14px;
  letter-spacing: 0.7px;
  opacity: 1;
  padding: 4px 20px;

  div:last-child {
    color: ${({ change }) => change > 0 ? '#00C486' : change < 0 ? '#FE4764' : 'white' };
    text-align: right;
  }
`

const Col = styled.div`
  flex: 1 0 40%;

  :first-child {
    flex: 1 0 40%;
  }

  :last-child {
    flex: 1 0 20%;
  }
`
