import * as React from 'react'
import styled from 'styled-components'
import tokens from '../helpers/tokens'
import { Coin } from './Coin'

interface IProps {
  type: string,
  amount: number,
  onPercentageSelectClick?: () => void
}

const Wrapper = styled.div`
  border-radius: 5px;
  border: 1px solid #50e3c2;
  padding: 10px;
  width: 100%;
  text-align: left;
  min-height: 50px;
  min-width: 250px;
  width: 100%;
  margin-top: 30px;
  color: #50e3c2; 
  letter-spacing: 1.5px;
`

const TokenInfo = styled.div`
  display: inline-block
  margin-left: 20px;
`
const TokenName = styled.div`
  font-size: 20px;
`
const TokenAmounts = styled.div`
  font-size: 14px;
`

export const TokenAmountDisplay = ({ type, amount, onPercentageSelectClick }: IProps) => {
  const tokenData = tokens[type] ? tokens[type] : tokens.BTC
  return (
    <Wrapper>
      <Coin
        type={type}
        selected={true}
      />
      <TokenInfo>
        <TokenName>{tokenData.name} ({tokenData.denom})</TokenName>
        <TokenAmounts>{amount} {tokenData.denom}</TokenAmounts>
      </TokenInfo>
    </Wrapper>
  )
}
