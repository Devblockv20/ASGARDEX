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

const Placeholder = styled<{
  big: boolean,
  selected: boolean,
  onClick?: ((event: React.MouseEvent<HTMLDivElement>) => void),
}, 'div'>('div')`
  height: 50px;
  width: 50px;
  vertical-align: middle;
  display: inline-block;
  border-radius: 50px;
  background: #314151;
  color: #586e81;
  text-align: center;
  padding-top: 16px;
  box-sizing: border-box;
  font-family: 'Exo 2';
  font-size: 14px;
  ${props => props.big && css`
    height: 80px;
    width: 80px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 80px;
    font-size: 20px;
    padding-top: 27px;
  `}
  ${props => props.onClick && css`
    cursor: pointer;
  `}
  ${props => props.selected && css`
    background: #fff;
  `}
`

export const Coin = ({ selected, type, big, style, onClick }: IProps) => {
  const coinData = tokens[type] ? tokens[type] : tokens.BTC
  const coinImage = selected ? coinData.colorImage : coinData.greyImage

  if (!coinImage) {
    return (
      <Placeholder
        big={Boolean(big)}
        selected={selected}
        onClick={onClick}
        style={style}
        tabIndex={onClick ? 0 : undefined}
      >
        {coinData.denom}
      </Placeholder>
    )
  }

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
