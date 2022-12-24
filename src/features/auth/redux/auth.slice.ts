import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store'

// Type for our state
export interface AuthState {
  token: boolean
  user: any | null
}

// Initial state
const initialState: AuthState = {
  token: false,
  user: null,
}

// Actual Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the authentication status
    auth_setUser(state, action) {
      state.user = action.payload
    },
    auth_setToken(state, action) {
      state.token = action.payload
    },
  },
})

export const { auth_setUser, auth_setToken } = authSlice.actions

export const select_authState = (state: RootState): AuthState => state.auth
