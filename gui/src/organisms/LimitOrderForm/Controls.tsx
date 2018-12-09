import { FormikProps } from 'formik'
import { observer } from 'mobx-react'
import * as React from 'react'
import { IFormValues, IStatus } from './Container'
import { LimitOrderFormView } from './View'

interface IContainerProps {
  amountDenom: string,
  availableTokensAmountDenom: string | null,
  availableTokensPriceDenom: string | null,
  buy: boolean,
  priceDenom: string,
  status: IStatus,
}

@observer
export class LimitOrderFormControls extends React.Component<FormikProps<IFormValues> & IContainerProps> {
  public setPercentage = (percentage: number) => () => {
    const { availableTokensAmountDenom, availableTokensPriceDenom } = this.props

    if (this.props.buy) {
      if (availableTokensPriceDenom === null) { return }

      let priceFloat = parseFloat(this.props.values.price)

      if (isNaN(priceFloat)) {
        this.props.setFieldValue('price', '1')
        priceFloat = 1
      }

      this.props.setFieldValue('amount', parseFloat(availableTokensPriceDenom) / priceFloat * percentage)
    } else {
      if (availableTokensAmountDenom === null) { return }

      this.props.setFieldValue('amount', parseFloat(availableTokensAmountDenom) * percentage)
    }
  }

  public isPercentage = (percentage: number): boolean => {
    const { availableTokensAmountDenom, availableTokensPriceDenom } = this.props

    if (this.props.buy) {
      if (availableTokensPriceDenom === null) { return false }
      const priceFloat = parseFloat(this.props.values.price)
      if (isNaN(priceFloat)) { return false }
      return parseFloat(availableTokensPriceDenom) / priceFloat * percentage === this.getTotal()
    } else {
      if (availableTokensAmountDenom === null) { return false }
      const amountFloat = parseFloat(this.props.values.amount)
      if (isNaN(amountFloat)) { return false }
      return parseFloat(availableTokensAmountDenom) * percentage === amountFloat
    }
  }

  public getTotal = () => {
    const amountFloat = parseFloat(this.props.values.amount)
    const priceFloat = parseFloat(this.props.values.price)

    if (isNaN(amountFloat) || isNaN(priceFloat)) { return null }

    return amountFloat * priceFloat
  }

  public render() {
    return (
      <LimitOrderFormView
        {...this.props}
        total={this.getTotal()}
        setPercentage={this.setPercentage}
        isPercentage={this.isPercentage}
      />
    )
  }
}
