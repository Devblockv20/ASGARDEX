import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { IStore } from '../../store/Store'
import { PairInfoBarView } from './View'

interface IProps {
  store?: IStore
}

@inject('store')
@observer
export class PairInfoBarContainer extends React.Component<IProps, object> {
  public render() {
    const { pairSelected, naturalTokenToToken } = this.props.store!

    if (!pairSelected) { return <Container /> }

    return <Container>
      <PairInfoBarView pairSelected={pairSelected} naturalTokenToToken={naturalTokenToToken} />
    </Container>
  }
}

const Container = styled.div`
  flex: 0;
  height: 49px;
  margin: 6px 24px 12px;
`
