import * as React from 'react'
import styled from 'styled-components'
import { Button } from '../atoms/Button'
import { Col } from '../atoms/Col'
import { Header } from '../atoms/Header'
import { Input } from '../atoms/Input'
import { Label } from '../atoms/Label'
import { Row } from '../atoms/Row'

export const AccountSetup = () => (
  <Wrapper>
    <Header borderBottom={true}>Account</Header>
    <Row>
      <Col>
        <Label>Token owner</Label>
        <Input placeholder="Enter your private key"/>
        <Label>or select wallet file</Label>
        <Button>Select file</Button>
        <Row style={{ marginTop: 20 }}>
          <Col style={{ margin: 0 }}>
            <Label>Name</Label>
            <Text>My Wallet</Text>
            <Label style={{ marginTop: 8 }}>Tokens</Label>
            <Text>
              10,000 RUNE
            </Text>
            <Text>
              10 ETH
            </Text>
            <Text>
              1 BTC
            </Text>
          </Col>
          <Col>
            <Label>Address</Label>
            <Text>TOX12345.....ABCDEF</Text>
          </Col>
        </Row>
      </Col>
      <Col>
        <Buttons>
          <Button primary={true}>Add account</Button>
          <Button>Forget account</Button>
        </Buttons>
      </Col>
    </Row>
  </Wrapper>
)

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
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 10px;
`

