import { RootState } from '../../store/index'

export const getBooks = (state: RootState) => state.books

export const getSelectedBook = (state: RootState) => state.books.selectedBook
