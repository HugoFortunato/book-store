import { ButtonTypes } from '.'
import './Button.styles.css'

export default function Button({ label, disabled, onClick }: ButtonTypes) {
  return (
    <button
      type="submit"
      className="custom-button"
      data-testid="button-id"
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
