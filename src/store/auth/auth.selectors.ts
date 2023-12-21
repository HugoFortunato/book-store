import { RootState } from '../../store/index'

export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated
