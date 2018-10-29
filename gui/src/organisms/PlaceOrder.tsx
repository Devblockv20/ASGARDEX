import * as React from 'react'
import styled from 'styled-components'
import { LimitOrderForm } from './LimitOrderForm'

export const PlaceOrder = () => (
  <>
    <Tabs><Tab><H2>Limit</H2></Tab></Tabs>
    <Row>
      <Col>
        <LimitOrderForm buy={true} />
      </Col>
      <Divider />
      <Col>
        <LimitOrderForm buy={false} />
      </Col>
    </Row>
  </>
)

const Tabs = styled.div`
  flex: 0 0 48px;
`

const Tab = styled.div`
  display: inline-block;
  padding: 11px 20px;
`

const H2 = styled.h2`
  display: inline;
  font-family: 'Open Sans';
  font-size: 18px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.63px;
`

const Row = styled.div`
  display: flex;
`

const Col = styled.div`
  flex: 1 0 auto;
  margin: 34px 20px 40px;
`

const Divider = styled.div`
  flex: 0 0 1px;
  background: #3D4E61;
  margin: 34px 0 40px;
`
