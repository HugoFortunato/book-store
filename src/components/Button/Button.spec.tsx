import { render, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import Button from './Button'

describe('<Button />', () => {
  const Test = () => {
    return (
      <Button
        color="#3498db"
        label="Click me"
        disabled
        data-testid="button-id"
      />
    )
  }

  it('should render a snapshot', () => {
    const { container } = render(<Test />)

    expect(container).toMatchSnapshot()
  })

  it('should test the clicked', () => {
    const { getByRole } = render(<Test />)
    const button = getByRole('button')

    fireEvent.click(button)

    expect(button).toHaveTextContent('Click me')
  })

  it('should have disabled property', () => {
    const { getByRole } = render(<Test />)

    const button = getByRole('button')

    expect(button).toHaveProperty('disabled', true)
  })

  it('should be disabled if specified', () => {
    const { getByRole } = render(
      <Button color="#3498db" label="Click me" disabled />,
    )
    const buttonElement = getByRole('button')

    expect(buttonElement).toBeDisabled()
  })

  it('should call the onClick callback when clicked', () => {
    const mockClickHandler = jest.fn()

    const { getByRole } = render(
      <Button color="#3498db" label="Click me" onClick={mockClickHandler} />,
    )
    const buttonElement = getByRole('button')

    fireEvent.click(buttonElement)

    expect(mockClickHandler).toHaveBeenCalledTimes(1)
  })
})
