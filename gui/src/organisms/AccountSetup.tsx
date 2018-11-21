import * as React from 'react'
import styled from 'styled-components'
import { Header } from '../atoms/Header'

export const AccountSetup = () => (
  <Wrapper>
    <Header borderBottom={true}>Account</Header>
    This is the account setup section
  </Wrapper>
)

const Wrapper = styled.div`
  padding: 20px;
`
