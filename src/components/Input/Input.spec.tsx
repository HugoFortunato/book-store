import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'

import Input from './Input'

describe('<Input />', () => {
  const Test = () => {
    return <Input placeholder="test" value="test" type="text" />
  }

  it('should render a snapshot', () => {
    const { container } = render(<Test />)

    expect(container).toMatchSnapshot()
  })

  it('should render the input with the correct properties', () => {
    const { getByPlaceholderText } = render(<Test />)
    const inputElement = getByPlaceholderText('test')

    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', 'text')
    expect(inputElement).toHaveValue('test')
  })

  it('should call the onInputChange callback when input changes', () => {
    const mockInputChangeHandler = jest.fn()
    const { getByPlaceholderText } = render(
      <Input
        placeholder="test"
        value="test"
        type="text"
        onInputChange={mockInputChangeHandler}
      />,
    )
    const inputElement = getByPlaceholderText('test')

    fireEvent.change(inputElement, { target: { value: 'new value' } })

    expect(mockInputChangeHandler).toHaveBeenCalledTimes(1)
    expect(mockInputChangeHandler).toHaveBeenCalledWith('new value')
  })

  it('should be disabled when specified', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="test" value="test" type="text" disabled />,
    )
    const inputElement = getByPlaceholderText('test')

    expect(inputElement).toBeDisabled()
  })
})
