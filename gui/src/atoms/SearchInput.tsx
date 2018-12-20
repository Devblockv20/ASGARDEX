import * as React from 'react'
import styled from 'styled-components'
import { screenSizes } from '../helpers/theme'
import searchIcon from '../images/search_icon.png'
import { Input } from './Input'

interface IProps {
  value?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput = ({ value='', onChange }: IProps) => (
  <SearchWrapper>
    <SearchImage src={searchIcon}/>
    <SearchEl placeholder="Search..." value={value} onChange={onChange} />
  </SearchWrapper>
)

const SearchEl = styled(Input)`
  max-width: 200px;
  margin-bottom: 15px;
  padding-left: 35px;
  @media (max-width: ${screenSizes.massive}) {
    max-width: 150px;
  }
`

const SearchWrapper = styled.div`
  position: relative;
  display: inline-block;
`

const SearchImage = styled.img`
  height: 20px;
  position: absolute;
  top: 8px;
  left: 8px;
  opacity: 0.4;
`
