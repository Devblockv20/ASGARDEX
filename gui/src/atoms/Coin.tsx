import * as React from 'react'
import styled, { css } from 'styled-components'
import tokens from '../helpers/tokens'

interface IProps {
  selected: boolean,
  type: string,
  big?: boolean,
  style?: object,
  onClick?: ((event: React.MouseEvent<HTMLImageElement>) => void)
}

const Image = styled<{ big: boolean, onClick?: ((event: React.MouseEvent<HTMLImageElement>) => void) }, 'img'>('img')`
  height: 50px;
  width: 50px;
  vertical-align: middle;
  ${props => props.big && css`
    height: 80px;
    width: 80px;
    margin-left: 15px;
    margin-right: 15px;
  `}
  ${props => props.onClick && css`
    cursor: pointer;
  `}
`

export const Coin = ({ selected, type, big, style, onClick }: IProps) => {
  const coinData = tokens[type] ? tokens[type] : tokens.BTC
  const coinImage = selected ? coinData.colorImage : coinData.greyImage

  return (
    <Image
      src={coinImage['1x']}
      srcSet={`${coinImage['1x']} 1x, ${coinImage['2x']} 2x`}
      alt={coinData.name}
      big={Boolean(big)}
      style={style}
      onClick={onClick}
    />
  )
}
