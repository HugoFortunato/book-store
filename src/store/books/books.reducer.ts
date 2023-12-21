// src/store/bookSlice.ts
import { createReducer } from '@reduxjs/toolkit'
import {
  createBook,
  editBook,
  removeBook,
  rentBook,
  selectedBook,
} from './books.actions'

export type Book = {
  id: number
  title: string
  author: string
  rented: boolean
}

type BookState = {
  books: Book[]
  selectedBook: Book | null
}

const initialState: BookState = {
  books: [
    { id: 1, title: 'Livro 1', author: 'Autor 1', rented: false },
    { id: 2, title: 'Livro 2', author: 'Autor 2', rented: false },
  ],
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
      author: action.payload.author,
      rented: false,
    }
    state.books.push(newBook)
  })

  builder.addCase(editBook, (state, action) => {
    const book = state.books.find((b) => b.id === action.payload.id)

    if (book) {
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
