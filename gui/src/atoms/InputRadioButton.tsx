import styled, { css } from 'styled-components'

export const InputRadioButton = styled.button<{ active?: boolean }>`
  height: 35px;
  border: 1px solid ${({ active }) => active ? '#50E3C2' : '#323C47'};
  padding: 0px 13px;
  background: #323C47;
  border-radius: 5px;
  font-family: Helvetica;
  font-size: 15px;
  color: white;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  ${props => props.active && css`
    color: #50E3C2;
  `}

  :hover, :focus {
    border: 1px solid #3D4E61;
    outline: none;
    ${props => props.active && css`
      border: 1px solid #50E3C2;
    `}
  }
`
