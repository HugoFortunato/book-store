import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Input from '../../components/Input/Input'
import { editBook, removeBook } from '../../store/books/books.actions'
import { getSelectedBook } from '../../store/books/books.selectors'
import './BookDetail.styles.css'

interface BookDetailsProps {
  bookId?: number
}

const BookDetails: React.FC<BookDetailsProps> = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [editedImage, setEditedImage] = useState('')
  const [editedTitle, setEditedTitle] = useState('')
  const [editedAuthor, setEditedAuthor] = useState('')
  const showSelectedBook = useSelector(getSelectedBook)

  const isBookRented = showSelectedBook?.rented
  const handleEditBook = () => {
    if (showSelectedBook) {
      dispatch(
        editBook({
          id: showSelectedBook.id,
          image: editedImage,
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

      <div>
        <p data-testid="book-title">Title: {showSelectedBook?.title}</p>
        <p data-testid="book-author">Author: {showSelectedBook?.author}</p>
        <p data-testid="book-year">Year: {showSelectedBook?.year}</p>
      </div>

      {isBookRented ? (
        <h3 style={{ color: 'red', marginTop: '40px' }}>Book was rented!</h3>
      ) : (
        <>
          <div className="edit-book">
            <h3 className="edit-book-title">Edit book</h3>

            <div className="input-container">
              <Input
                type="text"
                value={editedImage}
                label="Book Image (url)"
                placeholder="Book Image"
                onInputChange={(value) => setEditedImage(value)}
              />
            </div>
            <div className="input-container">
              <Input
                type="text"
                value={editedTitle}
                label="Title"
                placeholder="Title"
                onInputChange={(value) => setEditedTitle(value)}
              />
            </div>
            <div className="input-container">
              <Input
                type="text"
                value={editedAuthor}
                label="Author"
                placeholder="Author"
                onInputChange={(value) => setEditedAuthor(value)}
              />
            </div>
          </div>

          <div className="button-container">
            <button onClick={handleEditBook}>Save</button>
            <button onClick={handleRemoveBook}>Remove</button>
          </div>
        </>
      )}
    </div>
  )
}

export default BookDetails
