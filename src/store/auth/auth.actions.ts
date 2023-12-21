import { createAction } from '@reduxjs/toolkit'

export const setIsAuthenticated = createAction<boolean>(
  'auth/setIsAuthenticated',
)
