import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { formatNum } from 'thorchain-info-common/build/helpers/formatNum'
import { Button } from '../atoms/Button'
import { Col } from '../atoms/Col'
import { Header } from '../atoms/Header'
import { Input } from '../atoms/Input'
import { Label } from '../atoms/Label'
import { Row } from '../atoms/Row'
import { ICoin } from '../store/Coin'
import { IStore } from '../store/Store'

interface IProps {
  store?: IStore
}

interface IState {
  privateKey: string
}

@inject('store')
@observer
export class AccountSetup extends React.Component<IProps, IState> {

  public state = {
    privateKey: '',
  }

  private fileInputRef: any

  public handleCreateAccountClick = () => {
    const { store } = this.props
    store!.createWallet()
    this.clearPrivateKeyState()
  }

  public handleForgetAccountClick = () => {
    const { store } = this.props
    store!.forgetWallet()
    this.clearPrivateKeyState()
  }

  public handleSelectFileClick = () => {
    if (!this.fileInputRef) {
      return
    }

    this.fileInputRef.click()
  }

  public handleFileUpload = (uploadEvent: any) => {
    const file = uploadEvent.target.files[0]
    const reader = new FileReader()

    reader.onload = (readEvent: any) => {
      const walletString = readEvent.target.result
      const { store } = this.props
      store!.loadWallet(walletString)
      this.clearPrivateKeyState()
    }

    reader.readAsText(file)
  }

  public handleLoadPrivateKey = () => {
    const { privateKey } = this.state
    const { store } = this.props

    store!.loadWalletFromPrivateKey(privateKey)
  }

  public handlePrivateKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const privateKey = event.target.value

    this.setState({
      privateKey,
    })
  }

  public clearPrivateKeyState = () => {
    this.setState({
      privateKey: '',
    })
  }

  public render() {
    const { store } = this.props
    const wallet = store!.wallet
    const walletErrorMessage = store!.ui.walletErrorMessage

    return (
      <Wrapper>
        <Header borderBottom={true}>Account</Header>
        <Row>
          <Col>
            <Label>Token owner</Label>
            <Input
              placeholder="Enter your private key"
              value={wallet ? wallet.privateKey : this.state.privateKey}
              disabled={Boolean(wallet)}
              onChange={this.handlePrivateKeyChange}
            />
            {!wallet && (
              <React.Fragment>
                <Label>or select wallet file</Label>
                <Button onClick={this.handleSelectFileClick}>Select file</Button>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={this.handleFileUpload}
                  ref={(fileInput) => this.fileInputRef = fileInput}
                />
              </React.Fragment>
            )}
            {walletErrorMessage && (
              <WalletError>{walletErrorMessage}</WalletError>
            )}
            <Row style={{ marginTop: 20 }}>
              <Col style={{ margin: 0 }}>
                <Label>Name</Label>
                <Text>MY WALLET</Text>
                <Label style={{ marginTop: 8 }}>Tokens</Label>
                {wallet && wallet.coins.map((coin: ICoin) => (
                  <Text key={coin.denom}>
                    {formatNum(Number(coin.amount), 4)} {coin.denom}
                  </Text>
                ))}
                {(!wallet || wallet.coins.length === 0) && (
                  <Text>
                    NONE
                  </Text>
                )}
              </Col>
              <Col>
                <Label>Address</Label>
                <Text>{wallet ? wallet.address : 'NONE'}</Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Buttons>
              {!wallet && (
                <Button onClick={this.handleLoadPrivateKey}>Add private key</Button>
              )}
              {!wallet && (
                <Button primary={true} onClick={this.handleCreateAccountClick}>Create new wallet</Button>
              )}
              {wallet && (
                <Button onClick={this.handleForgetAccountClick}>Forget account</Button>
              )}
            </Buttons>
          </Col>
        </Row>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding: 20px;
`

const Buttons = styled.div`
  padding-top: 18px;
  display: flex;
  flex-direction: column;
`

const Text = styled.p`
  font-size: 20px;
  letter-spacing: 1.5px;
  color: #fff;
  margin-top: 0;
  margin-bottom: 10px;
`

const WalletError = styled.div`
  font-size: 14px;
  color: #ab4242;
  margin-bottom: 10px;
  max-width: 400px;
`

