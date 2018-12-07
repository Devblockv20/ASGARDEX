import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Logos } from '../atoms/Logos'
import { IStore } from '../store/Store'

interface IProps {
  page: string,
  store?: IStore
}

@inject('store')
@observer
export class TopNavbar extends React.Component<IProps, {}> {

  public render() {
    const { page, store } = this.props
    const wallet = store!.wallet

    return (
      <Container>
        <Logos />
        <NavItems>
          <NavItem selected={page === 'vote'}>Vote</NavItem>
          <Link to="/">
            <NavItem selected={page === 'trade'}>Trade</NavItem>
          </Link>
          <Link to="/swap">
            <NavItem selected={page === 'swap'}>Swap</NavItem>
          </Link>
        </NavItems>
        <AccountInfo>
          <Link to="/account">
            <LoggedOut>{wallet ? 'View Wallet' : 'Add Wallet'}</LoggedOut>
          </Link>
        </AccountInfo>
      </Container>
    )
  }
}

const Container = styled.div`
  flex: 0;
  height: 90px;
  background: #1C2731;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NavItems = styled.div`
  flex: 0;
  height: 90px;
  display: flex;
  align-items: center;
  padding-right: 15px;
`

const NavItem = styled<{ selected: boolean }, 'button'>('button')`
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.54);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  outline: none;
  cursor: pointer;
  margin-right: 15px;
  margin-left: 15px;
  ${props => props.selected && css`
        color: #fff;
  `}
`

const AccountInfo = styled.div`
  flex: 0;
  height: 90px;
  display: flex;
  align-items: center;
`

const LoggedOut = styled.button`
  background: transparent;
  border: none;
  font-size: 15px;
  letter-spacing: 1.1px;
  color: #00c486;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
  height: 90px;
  width: 180px;
`
