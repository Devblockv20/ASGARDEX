import * as React from 'react'
import styled from 'styled-components'
import { formatNum } from 'thorchain-info-common/build/helpers/formatNum'
import { Coin } from '../atoms/Coin'
import arrowImage from '../images/arrow_right.png'

interface IProps {
  exchangeType: string,
  receiveType: string
  exchangeAmount: number,
  receiveAmount: number,
  dollarsExchangeAmount: number,
  dollarsReceiveAmount: number,
}

export class SwapSummary extends React.Component<IProps, {}> {
  public render() {
    const {
      dollarsExchangeAmount,
      dollarsReceiveAmount,
      exchangeAmount,
      exchangeType,
      receiveAmount,
      receiveType,
    } = this.props

    return (
      <SummaryWrapper>
        <ExchangeSummary>
          <InfoWrapper>
            <div>
              You will exchange
            </div>
            <TokenExchangeAmount>
              {formatNum(exchangeAmount, 4)} {exchangeType}
            </TokenExchangeAmount>
            <div>
              ${formatNum(dollarsExchangeAmount)} USD
            </div>
          </InfoWrapper>
          <CoinWrapper>
            <Coin type={exchangeType} big={true} selected={true}/>
          </CoinWrapper>
        </ExchangeSummary>
        <Separator>
          <img src={arrowImage}/>
        </Separator>
        <ReceiveSummary>
          <CoinWrapper>
            <Coin type={receiveType} big={true} selected={true}/>
          </CoinWrapper>
          <InfoWrapper>
            <div>
              You will receive
            </div>
            <TokenReceiveAmount>
              {formatNum(receiveAmount, 4)} {receiveType}
            </TokenReceiveAmount>
            <div>
              ${formatNum(dollarsReceiveAmount)} USD
            </div>
          </InfoWrapper>
        </ReceiveSummary>
      </SummaryWrapper>
    )
  }
}

export const SummaryWrapper = styled.div`
  width: 100%;
  min-height: 120px;
  background-image: linear-gradient(to left, #1c2731, #101921 51%, #1c2731);
  text-align: center;
  padding-top: 30px;
  letter-spacing: 1.5px;
`

const ExchangeSummary = styled.div`
  display: inline-block;
`

const ReceiveSummary = styled.div`
  display: inline-block;
`

const CoinWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const TokenExchangeAmount = styled.div`
  font-size: 20px;
  color: #50e3c2;
`

const TokenReceiveAmount = styled.div`
  font-size: 20px;
  color: #fff;
`

const InfoWrapper = styled.div`
  display: inline-block;
  font-size: 18px;
  color: #4e6376;
  line-height: 27px;
  vertical-align: middle;
`

const Separator = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-left: 65px;
  margin-right: 65px;
`
