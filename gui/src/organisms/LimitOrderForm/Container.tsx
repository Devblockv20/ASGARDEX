import { Formik, FormikActions } from 'formik'
import { observable, runInAction } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import * as Yup from 'yup'
import { IStore } from '../../store/Store'
import { LimitOrderFormControls } from './Controls'

export interface IFormValues {
  amount: string
  price: string
  total: string
}

interface IContainerProps {
  store?: IStore,
  amountDenom: string,
  priceDenom: string,
  buy: boolean,
}

export type IStatus =  { is: null } | { is: 'loading' } | { is: 'error', msg: string } |
  { is: 'success', height: number }

@inject('store')
@observer
export class LimitOrderFormContainer extends React.Component<IContainerProps> {
  @observable private status: IStatus = { is: null }

  public handleSubmit: (values: IFormValues, formikActions: FormikActions<IFormValues>) => void =
    async (values, formikActions) => {
      runInAction(() => { this.status = { is: 'loading' } })

      const { store, buy, amountDenom, priceDenom } = this.props

      try {
        const res = await store!.signAndBroadcastExchangeCreateLimitOrderTx(
          buy ? 'buy' : 'sell', `${values.amount}${amountDenom}`, `${values.price}${priceDenom}`)
        formikActions.resetForm()
        runInAction(() => { this.status = { is: 'success', height: res.height } })
      } catch (e) {
        runInAction(() => { this.status = { is: 'error', msg: e.message } })
      }
    }

  public validate = (values: IFormValues) => {
    const { amountDenom, priceDenom, store, buy } = this.props
    const { wallet } = store!

    if (buy) {
      const availableTokensPriceDenom = wallet ? wallet.getCoinAmount(priceDenom) : null
      const total = parseFloat(values.amount) * parseFloat(values.price)

      if (isNaN(total) || availableTokensPriceDenom === null) { return }
      if (total > parseFloat(availableTokensPriceDenom)) {
        return { total: `Cannot buy for more than the available ${availableTokensPriceDenom}${priceDenom}` }
      }
    } else {
      const availableTokensAmountDenom = wallet ? wallet.getCoinAmount(amountDenom) : null
      const amountFloat = parseFloat(values.amount)

      if (isNaN(amountFloat) || availableTokensAmountDenom === null) { return }
      if (amountFloat > parseFloat(availableTokensAmountDenom)) {
        return { amount: `Cannot sell more than the available ${availableTokensAmountDenom}${amountDenom}` }
      }
    }
    return {}
  }

  public render() {
    const { amountDenom, priceDenom, store, ...rest } = this.props
    const { wallet } = store!
    const availableTokensAmountDenom = wallet ? wallet.getCoinAmount(amountDenom) : null
    const availableTokensPriceDenom = wallet ? wallet.getCoinAmount(priceDenom) : null

    if (this.status.is) { /* To make MobX react */ }

    return (
      <Formik
        initialValues={{ amount: '', price: '', total: '' }}
        onSubmit={this.handleSubmit}
        validateOnBlur={true}
        validationSchema={validLimitOrderSchema}
        validate={this.validate}
      >{formikProps => (
        <LimitOrderFormControls
          {...formikProps}
          {...rest}
          amountDenom={amountDenom}
          priceDenom={priceDenom}
          availableTokensAmountDenom={availableTokensAmountDenom}
          availableTokensPriceDenom={availableTokensPriceDenom}
          status={this.status}
        />
      )}</Formik>
    )
  }
}

// from https://stackoverflow.com/a/39399503/6694848
const fractionalPositiveNumRegExp = /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/

const validLimitOrderSchema = Yup.object().shape({
  amount: Yup.string().required('Please enter an amount')
    .matches(fractionalPositiveNumRegExp, 'Please enter a valid number'),
  price: Yup.string().required('Please enter a price')
    .matches(fractionalPositiveNumRegExp, 'Please enter a valid number'),
})
