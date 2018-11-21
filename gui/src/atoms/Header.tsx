import styled, { css } from 'styled-components'

export const Header = styled<{ borderBottom?: boolean }, 'h2'>('h2')`
  font-family: 'Exo 2';
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1.5px;
  color: #fff;
  width: 100%;
  text-transform: uppercase;
  margin-top: 0;
  ${props => props.borderBottom && css`
    padding-bottom: 7px;
    border-bottom: 1px solid #00ccff;
  `}
`
