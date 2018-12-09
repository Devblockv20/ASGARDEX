import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { IStore } from '../../store/Store'
import { TradeHistoryView } from './View'

interface IProps {
  store?: IStore
}

@inject('store')
@observer
export class TradeHistoryContainer extends React.Component<IProps, object> {
  public render() {
    const { pairSelected, ui: { setTradePageTradeHistoryType, tradePageTradeHistoryType } } = this.props.store!
    const { trades, tradesOwn } = pairSelected

    if (!trades || !tradesOwn) { return null }

    return <TradeHistoryView
      setTradePageTradeHistoryType={setTradePageTradeHistoryType} tradePageTradeHistoryType={tradePageTradeHistoryType}
      trades={trades} tradesOwn={tradesOwn} />
  }
}
