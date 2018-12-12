import { ErrorMessage, Field, Form, FormikProps } from 'formik'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { Alert } from '../../atoms/Alert'
import { BodyText } from '../../atoms/BodyText'
import { FieldError } from '../../atoms/FieldError'
import { Input } from '../../atoms/Input'
import { InputRadioButton } from '../../atoms/InputRadioButton'
import {
  InputTickerAddition, inputTickerAdditionPadding, inputTickerAdditionPaddingWide,
} from '../../atoms/InputTickerAddition'
import { FieldInput } from '../../molecules/FieldInput'
import { IFormValues, IStatus } from './Container'

interface IViewProps {
  availableTokensAmountDenom: string | null,
  availableTokensPriceDenom: string | null,
  amountDenom: string,
  priceDenom: string,
  buy: boolean,
  total: number | null
  setPercentage: (percentage: number) => () => void
  isPercentage: (percentage: number) => boolean
  status: IStatus
}

export const LimitOrderFormView = observer(({
  availableTokensAmountDenom, availableTokensPriceDenom, amountDenom, priceDenom,
  buy, total, setPercentage, isPercentage, status, errors,
}: FormikProps<IFormValues> & IViewProps) => (
  <Form>
    <H2>{buy ? 'Buy' : 'Sell'}</H2>
    <FormRow style={{ marginTop: 41 }}>
      <ColLabel><BodyText>Price:</BodyText></ColLabel>
      <ColInput>
        <Field name="price" component={FieldInput} style={inputTickerAdditionPaddingWide}
          disabled={status.is === 'loading'} />
        <InputTickerAddition>{priceDenom}/{amountDenom}</InputTickerAddition>
        <ErrorMessage name="price" component={FieldError} />
      </ColInput>
    </FormRow>
    <FormRow style={{ marginTop: 12 }}>
      <ColLabel><BodyText>Amount:</BodyText></ColLabel>
      <ColInput>
        <Field name="amount" component={FieldInput} style={inputTickerAdditionPadding}
          disabled={status.is === 'loading'} />
        <InputTickerAddition>{amountDenom}</InputTickerAddition>
        <ErrorMessage name="amount" component={FieldError} />
      </ColInput>
    </FormRow>
    <FormRow style={{ marginTop: 12 }}>
      <ColLabel><BodyText>Total:</BodyText></ColLabel>
      <ColInput>
        <Input style={inputTickerAdditionPadding} disabled={true} value={total || ''} />
        <InputTickerAddition>{priceDenom}</InputTickerAddition>
        {errors.total && <FieldError>{errors.total}</FieldError>}
        <InputRadioButtonGroup>
          <BtnPercentage type="button" disabled={status.is === 'loading'}
            onClick={setPercentage(0.25)} active={isPercentage(0.25)}>25%</BtnPercentage>
          <BtnPercentage type="button" disabled={status.is === 'loading'}
            onClick={setPercentage(0.5)} active={isPercentage(0.5)}>50%</BtnPercentage>
          <BtnPercentage type="button" disabled={status.is === 'loading'}
            onClick={setPercentage(0.75)} active={isPercentage(0.75)}>75%</BtnPercentage>
          <BtnPercentage type="button" disabled={status.is === 'loading'}
            onClick={setPercentage(1)} active={isPercentage(1)}>100%</BtnPercentage>
        </InputRadioButtonGroup>
      </ColInput>
    </FormRow>
    <FormRow style={{ marginTop: 10 }}>
      <ColLabel />
      <ColInput style={{ textAlign: 'right' }}><BodyText style={{ opacity: 0.56 }}>
        Of available:{' '}
        {buy ? `${availableTokensPriceDenom || 0} ${priceDenom}` : `${availableTokensAmountDenom || 0} ${amountDenom}`}
      </BodyText></ColInput>
    </FormRow>
    {status.is === 'error' && (
      <Alert>Your order could not be placed:<br /><br />{status.msg}</Alert>
    )}
    {status.is === 'success' && (
      <Alert color="success">Your order has been committed at block height {status.height}</Alert>
    )}
    {buy ? (
      <ButtonBuy type="submit" disabled={status.is === 'loading'}>
        {status.is === 'loading' ? `BUYING ${amountDenom}...` : `BUY ${amountDenom}`}</ButtonBuy>
    ) : (
      <ButtonSell type="submit" disabled={status.is === 'loading'}>
        {status.is === 'loading' ? `SELLING ${amountDenom}...` : `SELL ${amountDenom}`}</ButtonSell>
    )}
  </Form>
))

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
