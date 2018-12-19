import * as React from 'react'
import styled from 'styled-components'
import { formatNum } from 'thorchain-info-common/build/helpers/formatNum'
import { Coin } from '../atoms/Coin'
import { screenSizes } from '../helpers/theme'
import tokens from '../helpers/tokens'

interface IProps {
  type: string,
  amount: number,
  dollarsExchangeRate?: number | null,
  receiveExchangeRate?: number | null,
  receiveType: string,
}

export const TokenReceiveAmountDisplay = ({
  type,
  amount,
  dollarsExchangeRate,
  receiveExchangeRate=1,
  receiveType,
}: IProps) => {
  const tokenData = tokens[type]
  const receiveTokenData = tokens[receiveType]
  const dollars = dollarsExchangeRate ? (receiveExchangeRate || 1) * dollarsExchangeRate * amount : 0
  const receiveAmount = (receiveExchangeRate || 0) * amount

  return (
    <Wrapper>
      <TokenInfoWrapper>
        <Coin
          type={receiveType}
          selected={true}
        />
        <TokenInfo>
          <TokenName>{receiveTokenData.name} ({receiveTokenData.denom})</TokenName>
          {tokenData && receiveTokenData && (
            <TokenAmounts>
              {formatNum(amount, 4)} {tokenData.denom}
              {' '}={' '}
              {receiveExchangeRate === null ? '?' : formatNum(receiveAmount, 4)} {receiveTokenData.denom}
            </TokenAmounts>
          )}
        </TokenInfo>
      </TokenInfoWrapper>
      <CalculatedAmounts>
        <TokenAmountWrapper>
          <Amount>
            {formatNum(receiveAmount, 4)}
          </Amount>
          <Denom>
            {receiveTokenData.denom}
          </Denom>
        </TokenAmountWrapper>
        <Separator/>
        <USDAmountWrapper>
          <Amount>
            {dollarsExchangeRate ? `$${formatNum(dollars)}` : '?'}
          </Amount>
          <Denom>
            USD
          </Denom>
        </USDAmountWrapper>
      </CalculatedAmounts>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 250px;
  width: 320px;
  margin-top: 30px;
  display: block;
  position: relative;
  @media (max-width: ${screenSizes.massive}) {
    width: 270px;
  }
`

const TokenInfoWrapper = styled.div`
  border-radius: 5px;
  border: 1px solid #fff;
  padding: 10px;
  text-align: left;
  color: #fff; 
  letter-spacing: 1.5px;
`

const TokenInfo = styled.div`
  display: inline-block;
  margin-left: 20px;
  vertical-align: middle;
  width: 220px;
  @media (max-width: ${screenSizes.massive}) {
    width: 170px;
  }
`

const TokenName = styled.div`
  font-size: 20px;
`

const TokenAmounts = styled.div`
  font-size: 14px;
`

const CalculatedAmounts = styled.div`
  letter-spacing: 1.5px;
  font-size: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
`

const Separator = styled.div`
  height: 1px;
  background-color: #fff;
  margin-top: 5px;
  margin-bottom: 5px;
`
const TokenAmountWrapper = styled.div`
  display: flex;
  color: #fff;
`
const USDAmountWrapper = styled.div`
  display: flex;
  color: #4e6376;
`
const Amount = styled.div`
`
const Denom = styled.div`
  margin-left: auto;
`

