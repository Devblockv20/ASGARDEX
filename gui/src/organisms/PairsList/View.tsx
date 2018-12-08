import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { formatNum } from 'thorchain-info-common/build/helpers/formatNum'
import { formatPercent } from 'thorchain-info-common/build/helpers/formatPercent'
import { ValueColored } from '../../atoms/ValueColored'
import { IPair } from '../../store/Pair'
import { IStore } from '../../store/Store'

interface IProps {
  store: IStore
}

export const PairsListView = observer(({ store, store: { pairs } }: IProps) => <Container>
  <Header>
    <Col>Pair</Col>
    <Col>Price</Col>
    <Col>Change</Col>
  </Header>
  {pairs.map(pair => (
    <PairLine key={pair.id} pair={pair} store={store} />
  ))}
</Container>)

const PairLine = observer(({ pair, store: { selectPair } }: { pair: IPair, store: IStore }) =>
  // tslint:disable-next-line:jsx-no-lambda
  <PairLineRow onClick={() => selectPair(pair)}>
    <Col>{pair.amountDenom}/{pair.priceDenom}</Col>
    <Col>{pair.ohlcv && formatNum(pair.ohlcv.c, 8)}</Col>
    <Col><ValueColored change={pair.ohlcv ? pair.ohlcv.change : 0}>
      {pair.ohlcv && formatPercent(pair.ohlcv.changePercent, 2, true)}</ValueColored></Col>
  </PairLineRow>,
)

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

const PairLineRow = styled.button`
  background: transparent;
  appearance: none;
  border: none;

  font-family: "Open Sans";
  font-size: 14px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.7px;

  display: flex;
  width: 100%;
  padding: 4px 20px;
  text-align: left;
  outline: 0;

  :focus, :hover {
    font-weight: 900;
    background: #747B8110;
  }

  div:last-child {
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
