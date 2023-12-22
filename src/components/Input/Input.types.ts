import { UseFormRegisterReturn } from 'react-hook-form'

export type InputTypes = {
  type: string
  label?: string
  value?: string
  disabled?: boolean
  placeholder: string
  register?: UseFormRegisterReturn
  onInputChange?: (value: string) => void
}
