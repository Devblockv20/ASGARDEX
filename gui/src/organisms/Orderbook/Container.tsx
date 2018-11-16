import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { IStore } from '../../store/Store'
import { OrderbookView } from './View'

interface IProps {
  store?: IStore
}

@inject('store')
@observer
export class OrderbookContainer extends React.Component<IProps, object> {
  public render() {
    const { ohlcv, buyOrderbook, sellOrderbook } = this.props.store!.pairSelected

    if (!ohlcv || !buyOrderbook || !sellOrderbook) { return null }

    return <OrderbookView buyOrderbook={buyOrderbook} sellOrderbook={sellOrderbook} ohlcv={ohlcv} />
  }
}
