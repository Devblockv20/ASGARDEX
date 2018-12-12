import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { formatNum } from 'thorchain-info-common/build/helpers/formatNum'
import { ITrade } from '../../store/Trade'

interface IProps {
  setTradePageTradeHistoryType: (type: 'market' | 'own') => void
  tradePageTradeHistoryType: 'market' | 'own'
  trades: ITrade[]
  tradesOwn: ITrade[]
}

@observer
export class TradeHistoryView extends React.Component<IProps> {

  public render() {
    const { tradePageTradeHistoryType, trades, tradesOwn } = this.props

    return (
      <Container>
        <Header>
          Trade History
          <Button active={tradePageTradeHistoryType === 'market'} onClick={this.setMarket}>Market</Button>
          <Button active={tradePageTradeHistoryType === 'own'} onClick={this.setOwn}>Yours</Button>
        </Header>
        {(tradePageTradeHistoryType === 'market' ? trades : tradesOwn).map(trade => (
          <TradeLine key={trade.key} trade={trade} />
        ))}
      </Container>
    )
  }
  private setMarket = () => this.props.setTradePageTradeHistoryType('market')
  private setOwn = () => this.props.setTradePageTradeHistoryType('own')
}

const Button = styled.button<{ active: boolean }>`
  margin-left: 14px;
  background: transparent;
  border-radius: 5px;
  font-family: 'Open Sans';
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.63px;
  text-align: center;
  color: #ffffff;
  width: 88px;
  height: 25px;
  border: 1px solid white;
  opacity: ${({ active }) => active ? '1' : '0.5'};
  outline: none;
`

const TradeLine = observer(({ trade }: { trade: ITrade }) => <TradeLineRow>
  <Col>{formatNum(trade.price, 2)}</Col>
  <Col>{formatNum(trade.amount, 6)}</Col>
  <Col>{formatNum(trade.volume, 8)}</Col>
</TradeLineRow>)

const Container = styled.div`
  padding-bottom: 8px;
`

const Header = styled.div`
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.7px;
  margin: 20px 0 8px;

  background: #747B8110;
  padding: 10px 20px;
`

const TradeLineRow = styled.div`
  display: flex;
  font-family: "Open Sans";
  font-size: 14px;
  letter-spacing: 0.7px;
  opacity: 1;
  padding: 4px 20px;
`

const Col = styled.div`
  flex: 1 0 30%;

  :first-child {
    flex: 1 0 35%;
  }

  :last-child {
    flex: 1 0 35%;
    text-align: right;
  }
`
