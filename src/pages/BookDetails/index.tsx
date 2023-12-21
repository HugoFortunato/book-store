import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editBook, removeBook } from '../../store/books/books.actions'
import { getSelectedBook } from '../../store/books/books.selectors'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'

interface BookDetailsProps {
  bookId?: number
}

const BookDetails: React.FC<BookDetailsProps> = () => {
  const showSelectedBook = useSelector(getSelectedBook)
  const isBookRented = showSelectedBook?.rented

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [editedTitle, setEditedTitle] = useState('')
  const [editedAuthor, setEditedAuthor] = useState('')

  const handleEditBook = () => {
    if (showSelectedBook) {
      dispatch(
        editBook({
          id: showSelectedBook.id,
          title: editedTitle,
          author: editedAuthor,
        }),
      )

      navigate('/book-store')
    }
  }

  const handleRemoveBook = () => {
    if (showSelectedBook) {
      dispatch(removeBook(showSelectedBook.id))
      navigate('/book-store')
    }
  }

  if (!showSelectedBook) {
    return <div>Livro não encontrado.</div>
  }

  return (
    <div>
      <h1>Book detail</h1>

      <p data-testid="book-title">Title: {showSelectedBook?.title}</p>
      <p data-testid="book-author">Author: {showSelectedBook?.author}</p>

      {isBookRented ? (
        <p>Book was rented</p>
      ) : (
        <>
          <div>
            <Input
              type="text"
              value={editedTitle}
              label="Title"
              placeholder="Title"
              onInputChange={(value) => setEditedTitle(value)}
            />
          </div>
          <div>
            <Input
              type="text"
              value={editedAuthor}
              label="Author"
              placeholder="Author"
              onInputChange={(value) => setEditedAuthor(value)}
            />
          </div>

          <button onClick={handleEditBook}>Save</button>
          <button onClick={handleRemoveBook}>Remove</button>
        </>
      )}
    </div>
  )
}

export default BookDetails
