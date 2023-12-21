import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import SignIn from '../pages/Signin'
import BookDetails from '../pages/BookDetails'
import { useSelector } from 'react-redux'
import { isAuthenticated } from '../store/auth/auth.selectors'
import RegisterBook from '../pages/RegisterBook'

export function Router() {
  const isAuthenticatedValue = useSelector(isAuthenticated)

  if (!isAuthenticatedValue) {
    return <SignIn />
  }

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/book-store" element={<Home />} />
      <Route path="book-detail/:bookId" element={<BookDetails />} />
      <Route path="register-book" element={<RegisterBook />} />
    </Routes>
  )
}
