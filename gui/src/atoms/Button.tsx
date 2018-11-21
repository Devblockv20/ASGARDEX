import styled, { css } from 'styled-components'

export const Button = styled<{ primary?: boolean, disabled?: boolean }, 'button'>('button')`
  border-radius: 5px;
  height: 35px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: #1c2731;
  text-transform: uppercase;
  border: 1px solid #4e6376;
  font-family: 'Exo 2';
  min-width: 160px;
  max-width: 200px;
  color: #fff;
  font-size: 18px;
  display: block;
  cursor: pointer;
  margin-bottom: 10px;
  outline: none;
  ${props => props.primary && css`
    border: 1px solid #50e3c2;
  `}
  ${props => props.disabled && css`
    border: 1px solid #4e6376;
    color: #4e6376;
  `}
`
