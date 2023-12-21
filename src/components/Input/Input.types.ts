import { UseFormRegisterReturn } from 'react-hook-form'

export type InputTypes = {
  label?: string
  placeholder: string
  value?: string
  register?: UseFormRegisterReturn
  onInputChange?: (value: string) => void
  type: string
  disabled?: boolean
}
