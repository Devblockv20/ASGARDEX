import * as React from 'react'
import { env } from '../../helpers/env'
import { http } from '../../helpers/http'
import { IOrderbook } from './IOrderbook'
import { OrderbookView } from './View'

interface IProps {
  priceDenom: string
  amountDenom: string
}

interface IState {
  buyOrderbook: null | IOrderbook
  sellOrderbook: null | IOrderbook
}

export class OrderbookContainer extends React.Component<IProps, IState> {
  public state = { buyOrderbook: null, sellOrderbook: null }
  private intervals: NodeJS.Timer[] = []

  public async componentWillMount() {
    this.loadOrderbooks()
    this.intervals.push(setInterval(this.loadOrderbooks, 1000))
  }

  public componentWillUnmount() {
    this.intervals.forEach(interval => clearInterval(interval))
  }

  public render() {
    const { buyOrderbook, sellOrderbook } = this.state

    if (!buyOrderbook || !sellOrderbook) { return null }

    return <OrderbookView buyOrderbook={buyOrderbook} sellOrderbook={sellOrderbook} />
  }

  private loadOrderbooks = async () => {
    const [buyOrderbook, sellOrderbook] = await Promise.all([
      http.post(env.REACT_APP_LCD_API_HOST + '/exchange/query-order-book',
        { kind: 'buy', amount_denom: this.props.amountDenom, price_denom: this.props.priceDenom }),
      http.post(env.REACT_APP_LCD_API_HOST + '/exchange/query-order-book',
        { kind: 'sell', amount_denom: this.props.amountDenom, price_denom: this.props.priceDenom }),
    ])

    this.setState({ buyOrderbook, sellOrderbook })
  }
}
