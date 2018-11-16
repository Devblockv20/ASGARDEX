import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { formatNum } from 'thorchain-info-common/build/helpers/formatNum'
import { formatPercent } from 'thorchain-info-common/build/helpers/formatPercent'
import { IPair } from '../../store/Store'

interface IProps {
  pairSelected: IPair
}

export const PairInfoBarView = observer(({ pairSelected: { amountDenom, priceDenom, ohlcv } }: IProps) => (
  <Container>
    <Ticker>{amountDenom}<TickerPriceDenom>/{priceDenom}</TickerPriceDenom></Ticker>
    {ohlcv && (
      <>
        <Col><SmallTitle>Last Price</SmallTitle><Value>
          <ValueColored change={ohlcv.change}>{formatNum(ohlcv.c, 2)}</ValueColored>{'   '}
          <ValueSmall>${formatNum(getInUsd(ohlcv.c), 2)}</ValueSmall>
        </Value></Col>
        <Col><SmallTitle>24h Change</SmallTitle><Value><ValueColored change={ohlcv.change}>
          {formatNum(ohlcv.change, 2)}{'   '}{formatPercent(ohlcv.changePercent, 2, true)}
        </ValueColored></Value></Col>
        <Col><SmallTitle>24h High</SmallTitle><Value>{formatNum(ohlcv.h, 2)}</Value></Col>
        <Col><SmallTitle>24h Low</SmallTitle><Value>{formatNum(ohlcv.l, 2)}</Value></Col>
        <Col><SmallTitle>24h Volume</SmallTitle><Value>{formatNum(ohlcv.v, 2)} {priceDenom}</Value></Col>
      </>
    )}
  </Container>
))

const Container = styled.div`
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.7px;

  display: flex;
  align-items: center;
`

const Ticker = styled.div`
  flex: 1 0 auto;
  margin-right: 29px;

  font-size: 22px;
  letter-spacing: 0.77px;
`

const TickerPriceDenom = styled.span`
  font-size: 20px;
  letter-spacing: 1.5px;
`

const Col = styled.div`
  flex: 1 0 auto;
  margin-right: 58px;
`

const SmallTitle = styled.div`
  font-size: 16px;
  letter-spacing: 0.63px;
  opacity: 0.5;
`

const Value = styled.div`
`

const ValueColored = styled.span<{ change: number }>`
  color: ${({ change }) => change > 0 ? '#00C486' : change < 0 ? '#FE4764' : 'white'};
`

const ValueSmall = styled.span`
  font-size: 18px;
`

// TODO replace with dynamic function by Haneef
const getInUsd = (amount: number) => {
  const ethPerRune = 1 / 12500
  const usdPerEth = 204.43
  const usd = amount * ethPerRune * usdPerEth
  return usd
}
