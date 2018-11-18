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
    const { trades } = this.props.store!.pairSelected

    if (!trades) { return null }

    return <TradeHistoryView trades={trades} />
  }
}
