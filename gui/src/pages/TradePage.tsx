import * as React from 'react'
import { Card } from '../atoms/Card'
import { Col } from '../atoms/Col'
import { Content } from '../atoms/Content'
import { Layout } from '../atoms/Layout'
import { Row } from '../atoms/Row'
import { env } from '../helpers/env'
import { OrderbookContainer } from '../organisms/Orderbook/Container'
import { PairInfoBarContainer } from '../organisms/PairInfoBar/Container'
import { PairsListContainer } from '../organisms/PairsList/Container'
import { PlaceOrder } from '../organisms/PlaceOrder'
import { TopNavbar } from '../organisms/TopNavbar'
import { TradeHistoryContainer } from '../organisms/TradeHistory/Container'
import { TVChartContainer } from '../organisms/TVChartContainer'

export const TradePage = () => (
  <Layout>
    <TopNavbar page="trade"/>
    <Content>
      <PairInfoBarContainer />
      <Row>
        <Col style={{ flex: '0 0 390px' }}>
          <Card style={{ flex: '1 0 auto' }}>
            <PairsListContainer />
            <TradeHistoryContainer />
          </Card>
        </Col>
        <Col style={{ flex: '1 0 820px' }}>
          <Card style={{ flex: '1 0 auto' }}>
            <TVChartContainer symbol="XMR" datafeedUrl={`${env.REACT_APP_API_HOST}/tradingview`}/>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <PlaceOrder />
          </Card>
        </Col>
        <Col style={{ flex: '0 0 390px' }}>
          <Card style={{ flex: '1 0 auto' }}>
            <OrderbookContainer />
          </Card>
        </Col>
      </Row>
    </Content>
  </Layout>
)

