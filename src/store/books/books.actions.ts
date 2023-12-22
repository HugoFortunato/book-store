import { createAction } from '@reduxjs/toolkit'

import { Book } from './books.reducer'

export const rentBook = createAction<number>('books/rentBook')

export const createBook = createAction<{
  title: string
  year?: string
  author: string
  image: string
}>('books/createBook')

export const editBook = createAction<{
  id: number
  image: string
  title: string
  author: string
}>('books/editBook')

export const removeBook = createAction<number>('books/removeBook')

export const selectedBook = createAction<Book | null>('books/selectedBook')
