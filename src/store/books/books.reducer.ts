import { createReducer } from '@reduxjs/toolkit'

import {
  createBook,
  editBook,
  removeBook,
  rentBook,
  selectedBook,
} from './books.actions'
import { books } from './books.mock'

export type Book = {
  id: number
  title: string
  author: string
  year: string
  image: string
  rented: boolean
}

type BookState = {
  books: Book[]
  selectedBook: Book | null
}

const initialState: BookState = {
  books,
  selectedBook: null,
}

export const booksReducer = createReducer(initialState, (builder) => {
  builder.addCase(rentBook, (state, action) => {
    const book = state.books.find((b) => b.id === action.payload)

    if (book && !book.rented) {
      book.rented = true
    }
  })

  builder.addCase(createBook, (state, action) => {
    const newBook: Book = {
      id: state.books.length + 1,
      title: action.payload.title,
      year: action.payload.year || '',
      author: action.payload.author,
      image: action.payload.image,
      rented: false,
    }
    state.books.push(newBook)
  })

  builder.addCase(editBook, (state, action) => {
    const book = state.books.find((b) => b.id === action.payload.id)

    if (book) {
      book.image = action.payload.image
      book.title = action.payload.title
      book.author = action.payload.author
    }
  })

  builder.addCase(removeBook, (state, action) => {
    state.books = state.books.filter((book) => book.id !== action.payload)
  })

  builder.addCase(selectedBook, (state, action) => {
    state.selectedBook = action.payload
  })
})
