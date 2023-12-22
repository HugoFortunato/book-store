import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import BookDetails from '../pages/BookDetail'
import Home from '../pages/Home'
import RegisterBook from '../pages/RegisterBook'
import SignIn from '../pages/Signin'
import { isAuthenticated } from '../store/auth/auth.selectors'

export function Router() {
  const isUserAuthenticated = useSelector(isAuthenticated)

  if (!isUserAuthenticated) {
    return <SignIn />
  }

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/book-store" element={<Home />} />
      <Route path="register-book" element={<RegisterBook />} />
      <Route path="book-detail/:bookId" element={<BookDetails />} />
    </Routes>
  )
}
