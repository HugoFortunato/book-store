import { ButtonTypes } from '.'
import './Button.styles.css'

export default function Button({
  label,
  disabled,
  onClick,
  color,
}: ButtonTypes) {
  const buttonStyle = {
    backgroundColor: color || '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
  }

  return (
    <button
      type="submit"
      className="custom-button"
      data-testid="button-id"
      disabled={disabled}
      onClick={onClick}
      style={buttonStyle}
    >
      {label}
    </button>
  )
}
