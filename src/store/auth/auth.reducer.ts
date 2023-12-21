// src/store/bookSlice.ts
import { createReducer } from '@reduxjs/toolkit'
import { setIsAuthenticated } from './auth.actions'

type AuthTypes = {
  isAuthenticated: boolean
}

const initialState: AuthTypes = {
  isAuthenticated: false,
}

export const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(setIsAuthenticated, (state, action) => ({
    ...state,
    isAuthenticated: action.payload,
  }))
})
