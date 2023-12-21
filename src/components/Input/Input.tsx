import { InputTypes } from '.'
import './Input.styles.css'

export default function Input({
  label,
  placeholder,
  register,
  value,
  type,
  disabled,
  onInputChange,
}: InputTypes) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (onInputChange) {
      onInputChange(e.target.value)
    }
  }
  return (
    <div className="input-wrapper">
      <label htmlFor="input-id">{label}</label>
      <input
        data-testid="input-id"
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...(register && register)}
      />
    </div>
  )
}
