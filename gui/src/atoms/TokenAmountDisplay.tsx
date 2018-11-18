// tslint:disable:jsx-no-lambda
import * as React from 'react'
import styled from 'styled-components'
import { formatNum } from 'thorchain-info-common/build/helpers/formatNum'
import tokens from '../helpers/tokens'
import { Coin } from './Coin'
import { InputRadioButton } from './InputRadioButton'

interface IProps {
  type: string,
  amount: number,
  dollarsExchangeRate?: number,
  selectedPercentage?: number,
  onPercentageSelectClick?: (percentage:number) => void
}

export const TokenAmountDisplay = ({
   type,
   amount,
   dollarsExchangeRate,
   selectedPercentage=100,
   onPercentageSelectClick,
}: IProps) => {
  const tokenData = tokens[type] ? tokens[type] : tokens.BTC
  const dollars = dollarsExchangeRate && selectedPercentage ?
    (selectedPercentage / 100) * dollarsExchangeRate * amount
    : 0
  const percentageAmount = (selectedPercentage / 100) * amount

  return (
    <Wrapper>
      <TokenInfoWrapper>
        <Coin
          type={type}
          selected={true}
        />
        <TokenInfo>
          <TokenName>{tokenData.name} ({tokenData.denom})</TokenName>
          <TokenAmounts>
            {formatNum(percentageAmount, 4)} {tokenData.denom}
            {' '}
            {dollarsExchangeRate && (<Dollars>(${formatNum(dollars)} USD)</Dollars>)}
          </TokenAmounts>
        </TokenInfo>
      </TokenInfoWrapper>
      {selectedPercentage && onPercentageSelectClick && (
        <PercentageButtons>
          <InputRadioButton
            active={selectedPercentage === 25}
            style={{ flex: '1 0 60px', margin: '0 5px' }}
            onClick={() => onPercentageSelectClick(25)}
          >
            25%
          </InputRadioButton>
          <InputRadioButton
            active={selectedPercentage === 50}
            style={{ flex: '1 0 60px', margin: '0 5px' }}
            onClick={() => onPercentageSelectClick(50)}
          >
            50%
          </InputRadioButton>
          <InputRadioButton
            active={selectedPercentage === 75}
            style={{ flex: '1 0 60px', margin: '0 5px' }}
            onClick={() => onPercentageSelectClick(75)}
          >
            75%
          </InputRadioButton>
          <InputRadioButton
            active={selectedPercentage === 100}
            style={{ flex: '1 0 60px', margin: '0 5px' }}
            onClick={() => onPercentageSelectClick(100)}
          >
            100%
          </InputRadioButton>
        </PercentageButtons>
      )}
      {dollarsExchangeRate && (
        <CalculatedAmounts>
          <TokenAmountWrapper>
            <Amount>
              {formatNum(percentageAmount, 4)}
            </Amount>
            <Denom>
              {tokenData.denom}
            </Denom>
          </TokenAmountWrapper>
          <Separator/>
          <USDAmountWrapper>
            <Amount>
              ${formatNum(dollars)}
            </Amount>
            <Denom>
              USD
            </Denom>
          </USDAmountWrapper>
        </CalculatedAmounts>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 250px;
  min-width: 280px;
  margin-top: 30px;
  display: block;
  position: relative;
`

const TokenInfoWrapper = styled.div`
  border-radius: 5px;
  border: 1px solid #50e3c2;
  padding: 10px;
  text-align: left;
  color: #50e3c2; 
  letter-spacing: 1.5px;
`

const TokenInfo = styled.div`
  display: inline-block;
  margin-left: 20px;
  vertical-align: middle;
`

const TokenName = styled.div`
  font-size: 20px;
`

const TokenAmounts = styled.div`
  font-size: 14px;
`

const Dollars = styled.span`
  color: #747b81;
`

const PercentageButtons = styled.div`
  margin-top: 20px;
  display: flex;
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
  background-color: #50E3C2;
  margin-top: 5px;
  margin-bottom: 5px;
`
const TokenAmountWrapper = styled.div`
  display: flex;
  color: #50e3c2;
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

