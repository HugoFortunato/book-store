import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'

import '@testing-library/jest-dom'
import BookDetails from '.'

describe('<BookDetails />', () => {
  const mockStore = configureStore()
  const store = mockStore({
    books: {
      selectedBook: {
        id: 1,
        title: 'Test Book',
        author: 'Test Author',
      },
    },
  })

  const Test = () => {
    return (
      <Provider store={store as MockStoreEnhanced}>
        <MemoryRouter>
          <BookDetails />
        </MemoryRouter>
      </Provider>
    )
  }

  it('renders book details correctly', () => {
    const { getByText } = render(<Test />)

    expect(getByText('Book detail')).toBeInTheDocument()
    expect(getByText('Title: Test Book')).toBeInTheDocument()
    expect(getByText('Author: Test Author')).toBeInTheDocument()
  })

  it('handles edit and remove book correctly', () => {
    const { getByText } = render(<Test />)

    const editButton = getByText('Save')
    const removeButton = getByText('Remove')

    fireEvent.click(editButton)
    fireEvent.click(removeButton)
  })
})
