import styled from 'styled-components'

export const Alert = styled.div<{ color?: 'success' | 'danger' }>`
  margin-top: 22px;
  font-family: 'Helvetica';
  font-size: 15px;
  background: ${({ color }) => color === 'success' ? '#00C486' : '#fe4764'};
  border-radius: 5px;
  color: #ffffff;
  padding: 22px;
`
