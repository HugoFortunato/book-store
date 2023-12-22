import '@testing-library/jest-dom'

import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'

import RegisterBook from '.'

describe('<RegisterBook />', () => {
  const mockStore = configureStore()
  const store = mockStore({})

  const Test = () => (
    <Provider store={store as MockStoreEnhanced}>
      <MemoryRouter>
        <RegisterBook />
      </MemoryRouter>
    </Provider>
  )

  it('renders RegisterBook without errors', () => {
    render(<Test />)
  })

  it('renders RegisterBook with input fields and register button', () => {
    const { getByTestId } = render(<Test />)

    const registerButton = getByTestId('button-id')

    expect(registerButton).toBeInTheDocument()
  })
})
