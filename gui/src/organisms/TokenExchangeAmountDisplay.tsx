// tslint:disable:jsx-no-lambda
import { debounce } from 'lodash'
import * as React from 'react'
import styled from 'styled-components'
import { formatNum } from 'thorchain-info-common/build/helpers/formatNum'
import { Coin } from '../atoms/Coin'
import { InputRadioButton } from '../atoms/InputRadioButton'
import tokens from '../helpers/tokens'

interface IProps {
  type: string,
  totalExchangeAmount: number,
  maxExchangeAmount: number,
  dollarsExchangeRate?: number | null,
  selectedPercentage?: number,
  onPercentageSelectClick?: (percentage:number) => void,
  onTotalAmountChange?: (totalExchangeAmount:number) => void
}

interface IState {
  totalAmountString: string
}

export class TokenExchangeAmountDisplay extends React.Component<IProps, IState> {

  public state = {
    totalAmountString: '',
  }

  constructor(props: IProps) {
    super(props)

    const {
      totalExchangeAmount,
    } = props

    this.state = {
      totalAmountString: formatNum(totalExchangeAmount, 6),
    }

    this.updateTotalAmount = debounce(this.updateTotalAmount, 1000)
  }

  public componentDidUpdate(prevProps: IProps) {
    const {
      totalExchangeAmount,
    } = this.props

    if (
      prevProps.totalExchangeAmount === totalExchangeAmount ||
      Number(this.state.totalAmountString.replace(',', '')) === totalExchangeAmount
    ) {
      return
    }

    this.setState({
      totalAmountString: formatNum(totalExchangeAmount, 6),
    })
  }

  public handleTotalAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const totalAmountString = event.target.value

    this.setState({
      totalAmountString,
    })

    this.updateTotalAmount()
  }

  public updateTotalAmount = () => {
    const { totalAmountString } = this.state
    const { onTotalAmountChange, onPercentageSelectClick, maxExchangeAmount } = this.props

    let totalExchangeAmount = Number(totalAmountString.replace(',', ''))
    totalExchangeAmount = Math.min(Number.isNaN(totalExchangeAmount) ? 0 : totalExchangeAmount, maxExchangeAmount)
    const selectedPercentage = Math.round((totalExchangeAmount / maxExchangeAmount) * 100)

    if (onTotalAmountChange) {
      onTotalAmountChange(totalExchangeAmount)
    }

    if (onPercentageSelectClick) {
      onPercentageSelectClick(selectedPercentage)
    }

    this.setState({
      totalAmountString: formatNum(totalExchangeAmount, 6),
    })
  }

  public render() {
    const {
      type,
      dollarsExchangeRate,
      maxExchangeAmount,
      totalExchangeAmount,
      selectedPercentage=100,
      onPercentageSelectClick,
    } = this.props

    const {
      totalAmountString,
    } = this.state

    const tokenData = tokens[type] ? tokens[type] : tokens.BTC
    const maxDollars = dollarsExchangeRate ? maxExchangeAmount * dollarsExchangeRate : 0
    const dollars = dollarsExchangeRate ? totalExchangeAmount * dollarsExchangeRate : 0

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
              {formatNum(maxExchangeAmount, 4)} {tokenData.denom}
              {' '}
              {dollarsExchangeRate && (
                <Dollars>(${formatNum(maxDollars)} USD)</Dollars>
              )}
            </TokenAmounts>
          </TokenInfo>
        </TokenInfoWrapper>
        {onPercentageSelectClick && (
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
              <InputAmount value={totalAmountString} onChange={this.handleTotalAmountChange}/>
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
}

const Wrapper = styled.div`
  min-height: 250px;
  min-width: 320px;
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
const InputAmount = styled.input`
  color: #50e3c2;
  background: transparent;
  border: none;
  letter-spacing: 1.5px;
  font-size: 20px;
  outline: none;
`
const Denom = styled.div`
  margin-left: auto;
`

