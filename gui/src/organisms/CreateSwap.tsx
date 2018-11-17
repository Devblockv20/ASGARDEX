import * as React from 'react'
import styled from 'styled-components'
import { Coin } from '../atoms/Coin'
import { TokenAmountDisplay } from '../atoms/TokenAmountDisplay'
import swapDivider from '../images/swap_divider.png'
import swapDivider2x from '../images/swap_divider@2x.png'

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

interface IState {
  selectedReceiveToken: string,
  selectedExchangeToken: string,
  selectedExchangeAmount: number
}

export class CreateSwap extends React.Component<{}, IState> {
  public state = { selectedReceiveToken: 'ETH', selectedExchangeToken: 'BTC', selectedExchangeAmount: 0 }

  public handleExchangeTokenClick(selectedExchangeToken:string, selectedExchangeAmount:number) {
    this.setState({
      selectedExchangeAmount,
      selectedExchangeToken,
    })
  }

  public handleReceiveTokenClick(selectedReceiveToken:string) {
    this.setState({
      selectedReceiveToken,
    })
  }

  public render() {
    const { selectedReceiveToken, selectedExchangeToken } = this.state

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

    // TODO replace with real token info
    const exchangeTokens = [
      { denom: 'BTC' },
      { denom: 'ETH' },
      { denom: 'LTC' },
      { denom: 'XMR' },
      { denom: 'DSH' },
      { denom: 'BCH' },
      { denom: 'USDT' },
      { denom: 'ZIL' },
    ]

    return (
      <>
      <Row>
        <Col>
          <WalletWrapper>
            <Header>
              Your Wallet
            </Header>
            {walletTokens.map((token) => (
              <CoinWrapper>
                <Coin
                  type={token.denom}
                  selected={selectedExchangeToken === token.denom}
                  style={{ marginRight: 10 }}
                  onClick={this.handleExchangeTokenClick.bind(this, token.denom, token.amount)}
                />
                <CoinAmount>
                  {token.amount} {token.denom}
                </CoinAmount>
              </CoinWrapper>
            ))}
          </WalletWrapper>
        </Col>
        <Col>
          <SwapWrapper>
            <SwapHeader>
              Exchange
            </SwapHeader>
            <TokenAmountDisplay type={selectedExchangeToken} amount={10}/>
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
            <TokenAmountDisplay type={selectedReceiveToken} amount={10}/>
          </SwapWrapper>
        </Col>
        <Col>
          <TokensWrapper>
            <Header>
              Tokens
            </Header>
            {exchangeTokens.map((token) => (
              <Coin
                type={token.denom}
                selected={selectedReceiveToken === token.denom}
                style={{ display: 'block', marginLeft: 'auto', marginBottom: 10 }}
                onClick={this.handleReceiveTokenClick.bind(this, token.denom)}
              />
            ))}
          </TokensWrapper>
        </Col>
      </Row>
      </>
    )
  }
}
