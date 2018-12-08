import { FormikProps, withFormik } from 'formik'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import * as Yup from 'yup'
import { IStore } from '../../store/Store'
import { LimitOrderFormView } from './View'

export interface IFormValues {
  amount: string
  price: string
}

interface IContainerProps {
  store?: IStore,
  amountDenom: string,
  priceDenom: string,
  buy: boolean,
  // createLimitOrder: (values: IFormValues) => void
}

@inject('store')
@observer
class LimitOrderFormContainerInner extends React.Component<FormikProps<IFormValues> & IContainerProps> {
  public setPercentage = (percentage: number) => () => {
    const { wallet } = this.props.store!
    if (!wallet) { return }

    if (this.props.buy) {
      const availableTotal = wallet.getCoinAmount(this.props.priceDenom)
      if (availableTotal === null) { return }

      let priceFloat = parseFloat(this.props.values.price)

      if (isNaN(priceFloat)) {
        this.props.setFieldValue('price', '1')
        priceFloat = 1
      }

      this.props.setFieldValue('amount', parseFloat(availableTotal) / priceFloat * percentage)
    } else {
      const availableAmount = wallet.getCoinAmount(this.props.amountDenom)
      if (availableAmount === null) { return }

      this.props.setFieldValue('amount', parseFloat(availableAmount) * percentage)
    }
  }

  public isPercentage = (percentage: number): boolean => {
    const { wallet } = this.props.store!
    if (!wallet) { return false }

    if (this.props.buy) {
      const availableTotal = wallet.getCoinAmount(this.props.priceDenom)
      if (availableTotal === null) { return false }
      const priceFloat = parseFloat(this.props.values.price)
      if (isNaN(priceFloat)) { return false }
       return parseFloat(availableTotal) / priceFloat * percentage === this.getTotal()
    } else {
      const availableAmount = wallet.getCoinAmount(this.props.amountDenom)
      if (availableAmount === null) { return false }
      const amountFloat = parseFloat(this.props.values.amount)
      if (isNaN(amountFloat)) { return false }
      return parseFloat(availableAmount) * percentage === amountFloat
    }
  }

  public getTotal = () => {
    const amountFloat = parseFloat(this.props.values.amount)
    const priceFloat = parseFloat(this.props.values.price)

    if (isNaN(amountFloat) || isNaN(priceFloat)) { return null }

    return amountFloat * priceFloat
  }

  public render() {
    const { buy, ...rest } = this.props

    const { wallet } = this.props.store!
    const availablePriceDenom = wallet ? wallet.getCoinAmount(this.props.priceDenom) : null
    const availableAmountDenom = wallet ? wallet.getCoinAmount(this.props.amountDenom) : null

    return (
      <LimitOrderFormView
        availableAmountDenom={availableAmountDenom}
        availablePriceDenom={availablePriceDenom}
        buy={buy}
        {...rest}
        total={this.getTotal()}
        setPercentage={this.setPercentage}
        isPercentage={this.isPercentage}
      />
    )
  }
}

// from https://stackoverflow.com/a/39399503/6694848
const fractionalPositiveNumRegExp = /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/

const validLimitOrderSchema = Yup.object().shape({
  amount: Yup.string().required('Please enter an amount')
    .matches(fractionalPositiveNumRegExp, 'Please enter a valid number'), // TODO add max
  price: Yup.string().required('Please enter a price')
    .matches(fractionalPositiveNumRegExp, 'Please enter a valid number'), // TODO add max
})

export const LimitOrderFormContainer = withFormik<IContainerProps, IFormValues>({
  handleSubmit: async (values, { props }) => {
    // tslint:disable-next-line:no-console
    console.log('submitting with values:', values, 'buy?', props.buy)
    // await props.createLimitOrder(values)
  },
  mapPropsToValues: () => ({ amount: '', price: '' }),
  validateOnBlur: true,
  validationSchema: validLimitOrderSchema,
})(LimitOrderFormContainerInner)
