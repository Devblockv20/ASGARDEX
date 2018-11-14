import * as React from 'react'
import styled from 'styled-components'
import { BodyText } from '../atoms/BodyText'
import { Input } from '../atoms/Input'
import { InputRadioButton } from '../atoms/InputRadioButton'
import { InputTickerAddition, inputTickerAdditionPadding, inputTickerAdditionPaddingWide,
  } from '../atoms/InputTickerAddition'

interface IProps {
  buy: boolean
}

export const LimitOrderForm = ({ buy }: IProps) => (
  <>
    <H2>{buy ? 'Buy' : 'Sell'}</H2>
    <FormRow style={{ marginTop: 41 }}>
      <ColLabel><BodyText>Price:</BodyText></ColLabel>
      <ColInput>
        <Input style={inputTickerAdditionPaddingWide} />
        <InputTickerAddition>{buy ? 'RUNE/BTC' : 'BTC/RUNE'}</InputTickerAddition>
      </ColInput>
    </FormRow>
    <FormRow style={{ marginTop: 12 }}>
      <ColLabel><BodyText>Amount:</BodyText></ColLabel>
      <ColInput>
        <Input style={inputTickerAdditionPadding} />
        <InputTickerAddition>{buy ? 'RUNE' : 'BTC'}</InputTickerAddition>
      </ColInput>
    </FormRow>
    <FormRow style={{ marginTop: 12 }}>
      <ColLabel><BodyText>Total:</BodyText></ColLabel>
      <ColInput>
        <Input style={inputTickerAdditionPadding} />
        <InputTickerAddition>{buy ? 'BTC' : 'RUNE'}</InputTickerAddition>
        <InputRadioButtonGroup>
          <InputRadioButton active={buy} style={{ flex: '1 0 60px', margin: '0 5px' }}>25%</InputRadioButton>
          <InputRadioButton style={{ flex: '1 0 60px', margin: '0 5px' }}>50%</InputRadioButton>
          <InputRadioButton style={{ flex: '1 0 60px', margin: '0 5px' }}>75%</InputRadioButton>
          <InputRadioButton active={!buy} style={{ flex: '1 0 60px', margin: '0 5px' }}>100%</InputRadioButton>
        </InputRadioButtonGroup>
      </ColInput>
    </FormRow>
    <FormRow style={{ marginTop: 10 }}>
      <ColLabel />
      <ColInput style={{ textAlign: 'right' }}><BodyText style={{ opacity: 0.56 }}>
        Of available: {buy ? '34,000 RUNE' : '1.0 BTC'}
      </BodyText></ColInput>
    </FormRow>
    {buy ? <ButtonBuy>BUY BTC</ButtonBuy> : <ButtonSell>SELL BTC</ButtonSell>}
  </>
)


const H2 = styled.h2`
  display: inline;
  font-family: 'Open Sans';
  font-size: 18px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.63px;
`

const FormRow = styled.div`
  display: flex;
`

const ColLabel = styled.div`
  flex: 0 0 76px;
  margin-top: 6px;
`

const ColInput = styled.div`
  flex: 1 0 auto;
  position: relative;
`

const ButtonBuy = styled.button`
  margin-top: 22px;
  background: #00C486;
  border-radius: 5px;
  font-family: 'Exo 2';
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1.4px;
  text-align: center;
  color: #ffffff;
  width: 100%;
  height: 35px;
  border: 1px solid transparent;
  outline: none;
`

const ButtonSell = styled(ButtonBuy)`
  background: #fe4764;
`

const InputRadioButtonGroup = styled.div`
  margin: 12px -5px 0;
  display: flex;
`
