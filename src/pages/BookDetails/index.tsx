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
      <h1>Detalhes do Livro</h1>

      <p data-testid="book-title">Título: {showSelectedBook?.title}</p>
      <p data-testid="book-author">Autor: {showSelectedBook?.author}</p>
      <button onClick={handleEditBook}>Salvar Edições</button>
      <button onClick={handleRemoveBook}>Remover Livro</button>

      <div>
        <Input
          type="text"
          value={editedTitle}
          label="Título"
          placeholder="Título"
          onInputChange={(value) => setEditedTitle(value)}
        />
      </div>
      <div>
        <Input
          type="text"
          value={editedAuthor}
          label="Autor"
          placeholder="Autor"
          onInputChange={(value) => setEditedAuthor(value)}
        />
      </div>
    </div>
  )
}

export default BookDetails
