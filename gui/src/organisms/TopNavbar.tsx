import * as React from 'react'
import styled from 'styled-components'
import { Logos } from '../atoms/Logos'

const Container = styled.div`
  flex: 0;
  height: 90px;
  background: #1C2731;
  display: flex;
  align-items: center;
`

export const TopNavbar = () => (
  <Container>
    <Logos />
  </Container>
)
