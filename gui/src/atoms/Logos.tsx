import * as React from 'react'
import styled from 'styled-components'
import logoAsgardex1x from '../images/asgardex_logo_white_text.png'
import logoAsgardex2x from '../images/asgardex_logo_white_text@2x.png'
import logoThorchain1x from '../images/thorchain_logo_white_text.png'
import logoThorchain2x from '../images/thorchain_logo_white_text@2x.png'

export const Container = styled.section`
  margin-left: 29px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
`

export const H1 = styled.h1`
  margin: 0;
  position: absolute;
  visibility: hidden;
`

const Logo = styled.img``

const LogoThorchain = Logo
const LogoAsgardex = styled(Logo)`
  margin-left: 19px;
`

export const Logos = () =>
  <Container>
    <H1>THORChain ASGARDEX</H1>
    <LogoThorchain src={logoThorchain1x} srcSet={`${logoThorchain1x} 1x, ${logoThorchain2x} 2x`} alt="THORChain Logo" />
    <LogoAsgardex src={logoAsgardex1x} srcSet={`${logoAsgardex1x} 1x, ${logoAsgardex2x} 2x`} alt="ASGARDEX Logo" />
  </Container>
