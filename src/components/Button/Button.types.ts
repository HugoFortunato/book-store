import { ReactNode } from 'react'

export type ButtonTypes = {
  label: string
  children?: ReactNode
  disabled?: boolean
  onClick?: () => void
}
