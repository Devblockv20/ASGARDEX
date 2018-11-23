import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { formatNum } from 'thorchain-info-common/build/helpers/formatNum'
import { formatPercent } from 'thorchain-info-common/build/helpers/formatPercent'
import { ValueColored } from '../../atoms/ValueColored'
import { getInUsd } from '../../helpers/getInUsd'
import { IPair, IStore } from '../../store/Store'

interface IProps {
  pairSelected: IPair
  naturalTokenToToken: IStore['naturalTokenToToken']
}

export const PairInfoBarView = observer((
  { pairSelected, pairSelected: { amountDenom, priceDenom, ohlcv }, naturalTokenToToken }: IProps) => {
  return (
    <Container>
      <Ticker>{amountDenom}<TickerPriceDenom>/{priceDenom}</TickerPriceDenom></Ticker>
      {ohlcv && <Ohlcv pairSelected={pairSelected} naturalTokenToToken={naturalTokenToToken} />}
    </Container>
  )
})

const Ohlcv = observer((
  { pairSelected: { priceDenom, ohlcv }, naturalTokenToToken }: IProps) => {
  const h = naturalTokenToToken(ohlcv!.h, priceDenom)
  const l = naturalTokenToToken(ohlcv!.l, priceDenom)
  const c = naturalTokenToToken(ohlcv!.c, priceDenom)
  const v = naturalTokenToToken(ohlcv!.v, priceDenom)
  const change = naturalTokenToToken(ohlcv!.change, priceDenom)

  return (
    <>
      <Col><SmallTitle>Last Price</SmallTitle><Value>
        <ValueColored change={change} title={formatNum(c)}>
          {formatNum(c, 2)}
        </ValueColored>
        {'   '}
        <ValueSmall>${formatNum(getInUsd(c), 2)}</ValueSmall>
      </Value></Col>
      <Col><SmallTitle>24h Change</SmallTitle><Value><ValueColored change={change}>
        <span title={formatNum(change)}>
          {formatNum(change, 2)}
        </span>{'   '}
        {formatPercent(ohlcv!.changePercent, 2, true)}
      </ValueColored></Value></Col>
      <Col><SmallTitle>24h High</SmallTitle><Value title={formatNum(h)}>
        {formatNum(h, 2)}</Value></Col>
      <Col><SmallTitle>24h Low</SmallTitle><Value title={formatNum(l)}>
        {formatNum(l, 2)}</Value></Col>
      <Col><SmallTitle>24h Volume</SmallTitle><Value title={formatNum(v)}>
        {formatNum(v, 2)} {priceDenom}</Value></Col>
    </>
  )
})

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
  margin-right: 29px;
  flex: 0 0 auto;

  font-size: 22px;
  letter-spacing: 0.77px;
`

const TickerPriceDenom = styled.span`
  font-size: 20px;
  letter-spacing: 1.5px;
`

const Col = styled.div`
  flex: 0 0 auto;
  margin-right: 58px;
`

const SmallTitle = styled.div`
  font-size: 16px;
  letter-spacing: 0.63px;
  opacity: 0.5;
`

const Value = styled.div`
`

const ValueSmall = styled.span`
  font-size: 18px;
`
