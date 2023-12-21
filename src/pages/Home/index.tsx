import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks } from '../../store/books/books.selectors'
import { rentBook, selectedBook } from '../../store/books/books.actions'
import { useNavigate } from 'react-router-dom'
import { Book } from '../../store/books/books.reducer'
import Input from '../../components/Input/Input'

export default function Home() {
  const { books } = useSelector(getBooks)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')

  const handleRentBook = (bookId: number) => {
    dispatch(rentBook(bookId))
  }

  const handleBookDetail = (bookId: number, book: Book) => {
    navigate(`/book-detail/${bookId}`)
    dispatch(selectedBook(book))
  }

  const handleRegisterBook = () => {
    navigate('/register-book')
  }

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <h1>Book List</h1>
      <div>
        <label>Pesquisar Livros:</label>
        <Input
          type="text"
          value={searchTerm}
          onInputChange={(value) => setSearchTerm(value)}
          placeholder="Pesquisar Livros"
        />
      </div>
      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author} -{' '}
            {book.rented ? 'Rented' : 'Available'}
            {!book.rented && (
              <button onClick={() => handleRentBook(book.id)}>Rent</button>
            )}
            <button onClick={() => handleBookDetail(book.id, book)}>
              Book Detail
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleRegisterBook}>Register Book</button>
    </div>
  )
}
