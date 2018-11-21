import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { Button } from '../atoms/Button'
import { Coin } from '../atoms/Coin'
import { SearchInput } from '../atoms/SearchInput'
import tokens from '../helpers/tokens'
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
  tokenSearchTerm: string,
}

@inject('store')
@observer
export class CreateSwap extends React.Component<IProps, IState> {
  public state = {
    selectedExchangeAmount: null,
    selectedExchangePercentage: 100,
    selectedExchangeToken: null,
    selectedReceiveToken: null,
    tokenSearchTerm: '',
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

  public handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      tokenSearchTerm: event.target.value,
    })
  }

  public render() {
    const {
      selectedExchangeAmount,
      selectedExchangePercentage,
      selectedExchangeToken,
      selectedReceiveToken,
      tokenSearchTerm,
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
    ].filter((token) => {
      if (tokenSearchTerm === '') {
        return true
      }

      const tokenData = tokens[token.denom]
      const tokenName = tokenData ? tokenData.name.toUpperCase() : ''
      const upperCaseSearchTerm = tokenSearchTerm.toUpperCase()

      return token.denom.includes(upperCaseSearchTerm) || tokenName.includes(upperCaseSearchTerm)
    })

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
              <SwapButton primary={true} disabled={(!selectedExchangeToken || !selectedReceiveToken)}>Swap</SwapButton>
              <Disclaimer>
                Swaps are executed at the best possible price against both the CLP and the order book.
              </Disclaimer>
            </Col>
          </Row>
        </Col>
        <Col>
          <TokensWrapper>
            <Header>
              Tokens
            </Header>
            <SearchInput onChange={this.handleSearchChange} value={tokenSearchTerm}/>
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

const SwapButton = styled(Button)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  display: block;
`

const Disclaimer = styled.div`
  text-align: center;
  font-family: 'Helvetica';
  font-size: 12px;
  color: #4e6376;
  margin-top: 30px;
`
