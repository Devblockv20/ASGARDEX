import styled from 'styled-components'
import { BodyText } from './BodyText'

export const inputTickerAdditionPadding = { paddingRight: 67 }
export const inputTickerAdditionPaddingWide = { paddingRight: 106 }

export const InputTickerAddition = styled(BodyText)`
  display: block;
  opacity: 0.5;
  position: absolute;
  right: 13px;
  top: 8px;
  width: 104px;
  text-align: right;
  pointer-events: none;
`
