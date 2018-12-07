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
import { ICoin, IStore } from '../store/Store'

interface IProps {
  store?: IStore
}

@inject('store')
@observer
export class AccountSetup extends React.Component<IProps, {}> {

  private fileInputRef: any

  public handleCreateAccountClick = () => {
    const { store } = this.props
    store!.createWallet()
  }

  public handleForgetAccountClick = () => {
    const { store } = this.props
    store!.forgetWallet()
  }

  public handleSelectFileClick = () => {
    if (!this.fileInputRef) {
      return
    }

    this.fileInputRef.click()
  }

  public handleFileUpload = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (readEvent: any) => {
      const walletString = readEvent.target.result
      const { store } = this.props
      store!.loadWallet(walletString)
    }

    reader.readAsText(file)
  }

  public render() {
    const { store } = this.props
    const wallet = store!.wallet

    return (
      <Wrapper>
        <Header borderBottom={true}>Account</Header>
        <Row>
          <Col>
            <Label>Token owner</Label>
            {/* Note: disabled for now, as we don't have a function to turn priv key -> pub key & address */}
            <Input placeholder="Enter your private key (disabled for now)" disabled={true}/>
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
                <Button primary={true} onClick={this.handleCreateAccountClick}>Create account</Button>
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

