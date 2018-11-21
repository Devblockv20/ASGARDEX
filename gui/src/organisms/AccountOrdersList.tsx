import * as moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'
import { Header } from '../atoms/Header'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../atoms/Table'

// TODO replace with real orders data
const orders = [
  {
    amount: 1.2,
    block: '123,456',
    denom: 'ETH',
    hash: '0x1234...ABCD',
    price: 1000,
    time: new Date(),
    type: 'sell',
  },
  {
    amount: 0.5,
    block: '123,456',
    denom: 'BTC',
    hash: '0x1234...ABCD',
    price: 1000,
    time: new Date(),
    type: 'buy',
  },
]

export const AccountOrdersList = () => (
  <Wrapper>
    <Header borderBottom={true}>Orders</Header>
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Order</TableCell>
          <TableCell>Token</TableCell>
          <TableCell>Price (Rune)</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Block</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Hash</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow>
            <TableCell>{order.type}</TableCell>
            <TableCell>{order.denom}</TableCell>
            <TableCell>{order.price}</TableCell>
            <TableCell>{order.amount}</TableCell>
            <TableCell>{order.block}</TableCell>
            <TableCell>{moment(order.time).format('D MMM YYYY, HH:mm')}</TableCell>
            <TableCell>{order.hash}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Wrapper>
)

const Wrapper = styled.div`
  padding: 20px;
  padding-bottom: 40px;
  min-height: 200px;
`
