import { ErrorMessage, Field, Form, FormikProps } from 'formik'
import * as React from 'react'
import styled from 'styled-components'
import { BodyText } from '../../atoms/BodyText'
import { FieldError } from '../../atoms/FieldError'
import { Input } from '../../atoms/Input'
import { InputRadioButton } from '../../atoms/InputRadioButton'
import {
  InputTickerAddition, inputTickerAdditionPadding, inputTickerAdditionPaddingWide,
} from '../../atoms/InputTickerAddition'
import { FieldInput } from '../../molecules/FieldInput'

export interface IFormValues {
  amount: string
  price: string
}

interface IViewProps {
  availableAmountDenom: string | null,
  availablePriceDenom: string | null,
  amountDenom: string,
  priceDenom: string,
  buy: boolean,
  total: number | null
  setPercentage: (percentage: number) => () => void
  isPercentage: (percentage: number) => boolean
}

export const LimitOrderFormView = ({
  availableAmountDenom, availablePriceDenom, amountDenom, priceDenom, buy, total, setPercentage, isPercentage,
}: FormikProps<IFormValues> & IViewProps) => (
  <Form>
    <H2>{buy ? 'Buy' : 'Sell'}</H2>
    <FormRow style={{ marginTop: 41 }}>
      <ColLabel><BodyText>Price:</BodyText></ColLabel>
      <ColInput>
        <Field name="price" component={FieldInput} style={inputTickerAdditionPaddingWide} />
        <InputTickerAddition>{priceDenom}/{amountDenom}</InputTickerAddition>
        <ErrorMessage name="price" component={FieldError} />
      </ColInput>
    </FormRow>
    <FormRow style={{ marginTop: 12 }}>
      <ColLabel><BodyText>Amount:</BodyText></ColLabel>
      <ColInput>
        <Field name="amount" component={FieldInput} style={inputTickerAdditionPadding} />
        <InputTickerAddition>{amountDenom}</InputTickerAddition>
        <ErrorMessage name="amount" component={FieldError} />
      </ColInput>
    </FormRow>
    <FormRow style={{ marginTop: 12 }}>
      <ColLabel><BodyText>Total:</BodyText></ColLabel>
      <ColInput>
        <Input style={inputTickerAdditionPadding} disabled={true} value={total || ''} />
        <InputTickerAddition>{priceDenom}</InputTickerAddition>
        <InputRadioButtonGroup>
          <BtnPercentage type="button" onClick={setPercentage(0.25)} active={isPercentage(0.25)}>25%</BtnPercentage>
          <BtnPercentage type="button" onClick={setPercentage(0.5)} active={isPercentage(0.5)}>50%</BtnPercentage>
          <BtnPercentage type="button" onClick={setPercentage(0.75)} active={isPercentage(0.75)}>75%</BtnPercentage>
          <BtnPercentage type="button" onClick={setPercentage(1)} active={isPercentage(1)}>100%</BtnPercentage>
        </InputRadioButtonGroup>
      </ColInput>
    </FormRow>
    <FormRow style={{ marginTop: 10 }}>
      <ColLabel />
      <ColInput style={{ textAlign: 'right' }}><BodyText style={{ opacity: 0.56 }}>
        Of available:{' '}
        {buy ? `${availablePriceDenom || 0} ${priceDenom}` : `${availableAmountDenom || 0} ${amountDenom}`}
      </BodyText></ColInput>
    </FormRow>
    {buy ? <ButtonBuy type="submit">BUY {amountDenom}</ButtonBuy> :
      <ButtonSell type="submit">SELL {amountDenom}</ButtonSell>}
  </Form>
)

const BtnPercentage = styled(InputRadioButton)`
  flex: 1 0 60px;
  margin: 0 5px;
`

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
