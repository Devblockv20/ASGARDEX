import styled from 'styled-components'

export const ValueColored = styled.span<{ change: number }>`
color: ${({ change }) => change > 0 ? '#00C486' : change < 0 ? '#FE4764' : 'white'};
`
