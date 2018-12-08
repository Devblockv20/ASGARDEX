import { FieldProps } from 'formik'
import * as React from 'react'
import { Input } from '../atoms/Input'

export const FieldInput = ({ field, form, ...props }: FieldProps & React.InputHTMLAttributes<HTMLInputElement>) =>
  <Input {...field} {...props} />
