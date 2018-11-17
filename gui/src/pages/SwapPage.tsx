import * as React from 'react'
import { Card } from '../atoms/Card'
import { Col } from '../atoms/Col'
import { Content } from '../atoms/Content'
import { Layout } from '../atoms/Layout'
import { Row } from '../atoms/Row'
import { CreateSwap } from '../organisms/CreateSwap'
import { TopNavbar } from '../organisms/TopNavbar'

export const SwapPage = () => (
  <Layout>
    <TopNavbar page="swap"/>
    <Content>
      <Row>
        <Col style={{ flex: '1 0 820px' }}>
          <Card style={{ marginTop: 20 }}>
            <CreateSwap />
          </Card>
        </Col>
      </Row>
    </Content>
  </Layout>
)

