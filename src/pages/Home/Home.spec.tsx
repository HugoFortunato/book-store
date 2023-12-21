/* eslint-disable @typescript-eslint/ban-types */
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import Home from '.'

const mockStore = configureStore()

describe('<Home />', () => {
  const Test = () => {
    const initialState: { books: { books: [] } } = { books: { books: [] } }
    const store: MockStoreEnhanced<unknown, {}> = mockStore(initialState)

    return (
      <Provider store={store as MockStoreEnhanced}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    )
  }

  it('should render the home page with the correct properties', () => {
    const { getByText, getByPlaceholderText } = render(<Test />)

    expect(getByText('Book List')).toBeInTheDocument()
    expect(getByPlaceholderText('Pesquisar Livros')).toBeInTheDocument()
  })

  it('should call handleRentBook when "Alugar" button is clicked', () => {
    const store: MockStoreEnhanced<unknown, {}> = mockStore({
      books: {
        books: [
          { id: 1, title: 'Book 1', author: 'Author 1', rented: false },
          { id: 2, title: 'Book 2', author: 'Author 2', rented: true },
        ],
      },
    })

    const { getByText } = render(
      <Provider store={store as MockStoreEnhanced}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    )

    const alugarButton = getByText('Alugar')
    fireEvent.click(alugarButton)

    expect(store.getActions()).toContainEqual({
      type: 'books/rentBook',
      payload: 1,
    })
  })
})
