import '@testing-library/jest-dom'

import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'

import SignInForm from '.'

interface ReduxAction {
  type: string
}

describe('<SignInForm />', () => {
  const mockStore = configureStore()
  const store = mockStore({})

  const originalAlert = window.alert
  beforeAll(() => {
    window.alert = jest.fn()
  })

  afterAll(() => {
    window.alert = originalAlert
  })

  const Test: React.FC = () => (
    <Provider store={store as MockStoreEnhanced}>
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    </Provider>
  )

  it('renders the SignInForm without errors', () => {
    render(<Test />)
  })

  it('renders the SignInForm with input fields and submit button', () => {
    const { getByTestId } = render(<Test />)

    const submitButton = getByTestId('button-id')

    expect(submitButton).toBeInTheDocument()
  })

  it('submits the form successfully', async () => {
    const { getByTestId } = render(<Test />)

    const submitButton = getByTestId('button-id') as HTMLButtonElement

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Invalid credentials')

      const expectedActions: ReduxAction[] = []
      const actions = store.getActions()

      expect(actions).toEqual(expectedActions)
    })
  })
})
