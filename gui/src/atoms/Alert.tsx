import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  color?: 'success' | 'danger',
  children?: any,
  onDismiss?: () => void,
  style?: any,
}

export const Alert = ({ color, style, children, onDismiss }: IProps) => (
  <AlertWrapper>
    <BaseAlert color={color} style={style}>{children}</BaseAlert>
    {onDismiss && (
      <DismissButton onClick={onDismiss}>X</DismissButton>
    )}
  </AlertWrapper>
)

export const BaseAlert = styled.div<{ color?: 'success' | 'danger' }>`
  margin-top: 22px;
  font-family: 'Helvetica';
  font-size: 15px;
  background: ${({ color }) => color === 'success' ? '#00C486' : '#fe4764'};
  border-radius: 5px;
  color: #ffffff;
  padding: 22px;
`

const AlertWrapper = styled.div`
  position: relative;
`

const DismissButton = styled.button`
  border: none;
  background: transparent;
  color: #fff;
  position: absolute;
  right: 15px;
  top: 18px;
  height: 24px;
  width: 24px;
  text-align: center;
  font-size: 14px;
  padding: 0;
  cursor: pointer;
`
