import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks } from '../../store/books/books.selectors'
import { rentBook, selectedBook } from '../../store/books/books.actions'
import { useNavigate } from 'react-router-dom'
import { Book } from '../../store/books/books.reducer'
import Input from '../../components/Input/Input'
import './Home.styles.css'
import Button from '../../components/Button/Button'

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
    <div className="container">
      <h1>Book Store</h1>

      <div className="search-bar">
        <Input
          type="text"
          value={searchTerm}
          onInputChange={(value) => setSearchTerm(value)}
          placeholder="Search Books"
        />
        <Button
          color="#4caf50"
          label="Register Book"
          onClick={handleRegisterBook}
        />
      </div>

      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author} -{' '}
            <div>
              <img src={book.image} alt={book.title} width={150} />
            </div>
            {book.rented ? <strong>Rented</strong> : <strong>Available</strong>}
            <div>
              {!book.rented && (
                <button onClick={() => handleRentBook(book.id)}>Rent</button>
              )}

              <button onClick={() => handleBookDetail(book.id, book)}>
                Book Detail
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
