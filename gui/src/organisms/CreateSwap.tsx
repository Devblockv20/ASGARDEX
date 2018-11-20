import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled, { css } from 'styled-components'
import { Coin } from '../atoms/Coin'
import swapDivider from '../images/swap_divider.png'
import swapDivider2x from '../images/swap_divider@2x.png'
import { IStore } from '../store/Store'
import { SummaryWrapper, SwapSummary } from './SwapSummary'
import { TokenExchangeAmountDisplay } from './TokenExchangeAmountDisplay'
import { TokenReceiveAmountDisplay } from './TokenReceiveAmountDisplay'

interface IProps {
  store?: IStore
}

interface IState {
  selectedExchangeAmount: number | null,
  selectedExchangePercentage: number,
  selectedExchangeToken: string | null,
  selectedReceiveToken: string | null,
}

@inject('store')
@observer
export class CreateSwap extends React.Component<IProps, IState> {
  public state = {
    selectedExchangeAmount: null,
    selectedExchangePercentage: 100,
    selectedExchangeToken: null,
    selectedReceiveToken: null,
  }

  constructor(props:IProps) {
    super(props)

    // Fetch token prices every 5 seconds
    props.store!.fetchPrices()
    setInterval(() => props.store!.fetchPrices(), 5000)
  }

  public handleExchangeTokenClick = (selectedExchangeToken:string, selectedExchangeAmount:number) => () => {
    this.setState({
      selectedExchangeAmount,
      selectedExchangeToken,
    })
  }

  public handleReceiveTokenClick = (selectedReceiveToken:string) => () => {
    this.setState({
      selectedReceiveToken,
    })
  }

  public handleExchangePercentageClick = (selectedExchangePercentage:number) => {
    this.setState({
      selectedExchangePercentage,
    })
  }

  public render() {
    const {
      selectedExchangeAmount,
      selectedExchangePercentage,
      selectedExchangeToken,
      selectedReceiveToken,
    } = this.state

    const { getTokenPriceInUsdt } = this.props.store!

    // TODO replace with real wallet info
    const walletTokens = [
      {
        amount: '0.1',
        denom: 'BTC',
      },
      {
        amount: '10',
        denom: 'ETH',
      },
      {
        amount: '10',
        denom: 'LTC',
      },
      {
        amount: '100',
        denom: 'XMR',
      },
    ]

    const exchangeTokensToRender = [
      { denom: 'BTC' },
      { denom: 'ETH' },
      { denom: 'LTC' },
      { denom: 'XMR' },
      { denom: 'DASH' },
      // { denom: 'BCH' }, TODO uncomment when hard fork of BCH has been resolved
      { denom: 'USDT' },
      { denom: 'ZIL' },
    ]

    const totalExchangeAmount = (selectedExchangeAmount || 0) * (selectedExchangePercentage / 100)

    // TODO replace this with real data from CLPs
    const tokenExchangeRate = 3.2

    return (
      <>
      <Row>
        <Col>
          <WalletWrapper>
            <Header>
              Your Wallet
            </Header>
            {walletTokens.map((token) => (
              <CoinWrapper key={token.denom}>
                <Coin
                  type={token.denom}
                  selected={selectedExchangeToken === token.denom}
                  style={{ marginRight: 10 }}
                  onClick={this.handleExchangeTokenClick(token.denom, Number(token.amount))}
                />
                <CoinAmount>
                  {token.amount} {token.denom}
                </CoinAmount>
              </CoinWrapper>
            ))}
          </WalletWrapper>
        </Col>
        <Col>
          <Row>
            <Col>
              <SwapWrapper>
                <SwapHeader>
                  Exchange
                </SwapHeader>
                {selectedExchangeToken && (
                  <TokenExchangeAmountDisplay
                    type={selectedExchangeToken}
                    amount={selectedExchangeAmount || 0}
                    dollarsExchangeRate={getTokenPriceInUsdt(1, selectedExchangeToken)}
                    selectedPercentage={selectedExchangePercentage}
                    onPercentageSelectClick={this.handleExchangePercentageClick}
                  />
                )}
                {!selectedExchangeToken && (
                  <EmptyState>
                    Select a token from your wallet.
                  </EmptyState>
                )}
              </SwapWrapper>
            </Col>
            <Col>
              <ImgDivider
                src={swapDivider}
                srcSet={`${swapDivider} 1x, ${swapDivider2x} 2x`}
                alt="Divider"
              />
            </Col>
            <Col>
              <SwapWrapper>
                <SwapHeader>
                  Receive
                </SwapHeader>
                {selectedReceiveToken && (
                  <TokenReceiveAmountDisplay
                    type={selectedExchangeToken || ''}
                    amount={totalExchangeAmount}
                    dollarsExchangeRate={getTokenPriceInUsdt(1, selectedReceiveToken)}
                    receiveExchangeRate={tokenExchangeRate}
                    receiveType={selectedReceiveToken}
                  />
                )}
                {!selectedReceiveToken && (
                  <EmptyState>
                    Select a token to receive.
                  </EmptyState>
                )}
              </SwapWrapper>
            </Col>
          </Row>
          <Row>
            <Col>
              {selectedExchangeToken && selectedReceiveToken && (
                <SwapSummary
                  exchangeType={selectedExchangeToken}
                  receiveType={selectedReceiveToken}
                  exchangeAmount={totalExchangeAmount}
                  receiveAmount={totalExchangeAmount * tokenExchangeRate}
                  dollarsExchangeAmount={getTokenPriceInUsdt(totalExchangeAmount, selectedExchangeToken)}
                  dollarsReceiveAmount={
                    getTokenPriceInUsdt(totalExchangeAmount * tokenExchangeRate, selectedReceiveToken)
                  }
                />
              )}
              {(!selectedExchangeToken || !selectedReceiveToken) && (
                <SummaryWrapper/>
              )}
              <SwapButton disabled={(!selectedExchangeToken || !selectedReceiveToken)}>Swap</SwapButton>
            </Col>
          </Row>
        </Col>
        <Col>
          <TokensWrapper>
            <Header>
              Tokens
            </Header>
            {exchangeTokensToRender.map((token) => (
              <Coin
                key={token.denom}
                type={token.denom}
                selected={selectedReceiveToken === token.denom}
                style={{ display: 'block', marginLeft: 'auto', marginBottom: 10 }}
                onClick={this.handleReceiveTokenClick(token.denom)}
              />
            ))}
          </TokensWrapper>
        </Col>
      </Row>
      </>
    )
  }
}

const Header = styled.h2`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1.5px;
  color: #4e6376;
  text-transform: uppercase;
`

const SwapHeader = styled.h2`
  font-size: 20x;
  font-weight: 500;
  font-family: 'Exo 2';
  color: #fff;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`

const Row = styled.div`
  display: flex;
`

const Col = styled.div`
  flex: 1 0 auto;
  margin: 20px;
`

const SwapWrapper = styled.div`
  padding-top: 40px;
  text-align: center;
`

const TokensWrapper = styled.div`
  text-align: right;
`

const WalletWrapper = styled.div`
  text-align: left;
`

const ImgDivider = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
`

const CoinWrapper = styled.div`
  display: block;
  text-align: left;
  margin-bottom: 10px;
  font-size: 18px;
  letter-spacing: 1.4px;
  color: #4e6376;
`

const CoinAmount = styled.span`
  position: relative;
  top: 2px;
`

const EmptyState = styled.div`
  width: 320px;
  height: 190px;
  text-align: center;
  padding-top: 75px;
  font-size: 18px;
`

const SwapButton = styled.button`
  border-radius: 5px;
  height: 35px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: #1c2731;
  text-transform: uppercase;
  border: 1px solid #50e3c2;
  font-family: 'Exo 2';
  width: 160px;
  color: #fff;
  font-size: 18px;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  cursor: pointer;
  ${props => props.disabled && css`
    border: 1px solid #4e6376;
    color: #4e6376;
  `}
`
