import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { Alert } from '../atoms/Alert'
import { Button } from '../atoms/Button'
import { Coin } from '../atoms/Coin'
import { SearchInput } from '../atoms/SearchInput'
import { screenSizes } from '../helpers/theme'
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
  isSwapping: boolean,
  selectedExchangeAmount: number | null,
  selectedExchangePercentage: number,
  selectedExchangeToken: string | null,
  selectedReceiveToken: string | null,
  showSwapSuccess: boolean,
  swapError: string | null,
  tokenSearchTerm: string,
  totalExchangeAmount: number,
}

@inject('store')
@observer
export class CreateSwap extends React.Component<IProps, IState> {
  public state = {
    isSwapping: false,
    selectedExchangeAmount: null,
    selectedExchangePercentage: 100,
    selectedExchangeToken: null,
    selectedReceiveToken: null,
    showSwapSuccess: false,
    swapError: null,
    tokenSearchTerm: '',
    totalExchangeAmount: 0,
  }

  constructor(props:IProps) {
    super(props)

    // Fetch token prices & CLPs every 5 seconds
    props.store!.fetchPrices()
    props.store!.fetchCLPs()
    setInterval(() => {
      props.store!.fetchPrices()
      props.store!.fetchCLPs()
    }, 5000)
  }

  public handleExchangeTokenClick = (selectedExchangeToken:string, selectedExchangeAmount:number) => () => {
    this.setState({
      selectedExchangeAmount,
      selectedExchangePercentage: 100,
      selectedExchangeToken,
      totalExchangeAmount: selectedExchangeAmount,
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
      totalExchangeAmount: (this.state.selectedExchangeAmount || 0) * (selectedExchangePercentage / 100),
    })
  }

  public handleTotalAmountChange = (totalExchangeAmount:number) => {
    this.setState({
      totalExchangeAmount,
    })
  }

  public handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      tokenSearchTerm: event.target.value,
    })
  }

  public handleSwapSuccessDismiss = () => {
    this.setState({
      showSwapSuccess: false,
    })
  }

  public handleSwapClick = () => {
    const {
      selectedExchangeToken,
      selectedReceiveToken,
      totalExchangeAmount,
    } = this.state

    const { store } = this.props

    if (!selectedExchangeToken || !selectedReceiveToken || !totalExchangeAmount) {
      return
    }

    this.setState({
      isSwapping: true,
    })

    return store!.signAndBroadcastClpTradeTx(
      selectedExchangeToken,
      selectedReceiveToken,
      totalExchangeAmount,
    ).then(() => {
      const { wallet } = store!

      if (!wallet) {
        return
      }

      // Refresh coins in wallet
      return wallet.fetchCoinsAccountNumberAndSequence() as any
    }).then(() => {
      this.setState({
        isSwapping: false,
        showSwapSuccess: true,
      })
    }).catch((err) => {
      this.setState({
        isSwapping: false,
        swapError: err.message,
      })
    })
  }

  public render() {
    const {
      isSwapping,
      selectedExchangePercentage,
      selectedExchangeToken,
      selectedReceiveToken,
      showSwapSuccess,
      tokenSearchTerm,
      totalExchangeAmount,
      selectedExchangeAmount,
      swapError,
    } = this.state

    const { getTokenPriceInUsdt, getTokenExchangeRate, clps, wallet } = this.props.store!

    let exchangeTokensToRender = clps.map(pool => ({ denom: pool.denom }))
    exchangeTokensToRender.push({ denom: 'RUNE' })

    exchangeTokensToRender = exchangeTokensToRender.filter((token, index) => {
      // Exclude these tokens for now - they're not available in Binance's pricing API
      if (token.denom === 'LOKI' || token.denom === 'CAN') {
        return false
      }

      if (tokenSearchTerm === '') {
        return true
      }

      const tokenData = tokens[token.denom]
      const tokenName = tokenData ? tokenData.name.toUpperCase() : ''
      const searchTerm = tokenSearchTerm.toUpperCase()

      return token.denom.includes(searchTerm) || tokenName.includes(searchTerm) || Number(searchTerm) === index
    })

    const tokenExchangeRate = selectedExchangeToken === null || selectedReceiveToken === null
      ? null
      : getTokenExchangeRate(selectedExchangeToken, selectedReceiveToken)

    // Can't exchange more than you have in your wallet
    const maxExchangeAmount = selectedExchangeAmount || 0

    return (
      <React.Fragment>
      <Row>
        <Col>
          <WalletWrapper>
            <Header>
              Your Wallet
            </Header>
            {wallet && wallet.coins.map((token) => (
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
                    totalExchangeAmount={totalExchangeAmount}
                    maxExchangeAmount={maxExchangeAmount}
                    selectedPercentage={selectedExchangePercentage}
                    dollarsExchangeRate={getTokenPriceInUsdt(1, selectedExchangeToken)}
                    onPercentageSelectClick={this.handleExchangePercentageClick}
                    onTotalAmountChange={this.handleTotalAmountChange}
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
                  receiveAmount={totalExchangeAmount * (tokenExchangeRate || 0)}
                  dollarsExchangeAmount={getTokenPriceInUsdt(totalExchangeAmount, selectedExchangeToken)}
                  dollarsReceiveAmount={
                    getTokenPriceInUsdt(totalExchangeAmount * (tokenExchangeRate || 0), selectedReceiveToken)
                  }
                />
              )}
              {(!selectedExchangeToken || !selectedReceiveToken) && (
                <SummaryWrapper/>
              )}
              {swapError && (
                <SwapError>
                  {swapError}
                </SwapError>
              )}
              {showSwapSuccess && (
                <Alert color="success" onDismiss={this.handleSwapSuccessDismiss}>
                  Swap executed successfully.
                </Alert>
              )}
              <SwapButton
                primary={true}
                disabled={(!selectedExchangeToken || !selectedReceiveToken || isSwapping)}
                onClick={this.handleSwapClick}
              >
                {isSwapping ? 'Swapping...' : 'Swap'}
              </SwapButton>
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
      </React.Fragment>
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
  
  @media (max-width: ${screenSizes.massive}) {
    width: 200px;
  }
  @media (max-width: ${screenSizes.huge}) {
    display: none;
  }
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
  @media (max-width: ${screenSizes.massive}) {
    width: 270px;
  }
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

const SwapError = styled.div`
  text-align: center;
  font-size: 14px;
  color: #ab4242;
  margin-top: 30px;
  margin-bottom: 0;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`
