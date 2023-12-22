import { ReactNode } from 'react'

export type ButtonTypes = {
  label: string
  color: string
  children?: ReactNode
  disabled?: boolean
  onClick?: () => void
}
