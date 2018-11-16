import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { IStore } from '../../store/Store'
import { PairsListView } from './View'

interface IProps {
  store?: IStore
}

@inject('store')
@observer
export class PairsListContainer extends React.Component<IProps, object> {
  public render() {
    const { pairs } = this.props.store!

    if (!pairs) { return null }

    return <PairsListView pairs={pairs} />
  }
}
