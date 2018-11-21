import * as React from 'react'
import { Card } from '../atoms/Card'
import { Col } from '../atoms/Col'
import { Content } from '../atoms/Content'
import { Layout } from '../atoms/Layout'
import { Row } from '../atoms/Row'
import { AccountOrdersList } from '../organisms/AccountOrdersList'
import { AccountSetup } from '../organisms/AccountSetup'
import { TopNavbar } from '../organisms/TopNavbar'

export const AccountPage = () => (
  <Layout>
    <TopNavbar page="account"/>
    <Content>
      <Row>
        <Col style={{ flex: '1 0 820px' }}>
          <Card style={{ marginTop: 20 }}>
            <AccountSetup/>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <AccountOrdersList/>
          </Card>
        </Col>
      </Row>
    </Content>
  </Layout>
)

