import { createSlice } from '@reduxjs/toolkit'

// Interfaces
import { IUser } from '@/features/user/interfaces'
import { RootState } from '@/plugins/redux'

import { auth_login } from './auth.thunk'
import { authUtils } from '@/features/auth/utils'

// Type for our state
export interface AuthState {
  token: string | null
  user: IUser | null

  login_isLoading: boolean
  login_isError: boolean
  login_errorMessage: string | null
}

// Initial state
const initialState: AuthState = {
  token: null,
  user: null,

  login_isLoading: false,
  login_isError: false,
  login_errorMessage: null,
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

  extraReducers: builder => {
    builder.addCase(auth_login.pending, (state, action) => {
      state.login_isLoading = true
    })
    builder.addCase(auth_login.rejected, (state, action) => {
      state.login_isError = true
      console.log('auth_login.rejected', action)
    })
    builder.addCase(auth_login.fulfilled, (state, action) => {
      state.login_isError = false
      state.login_isLoading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.login_errorMessage = null

      authUtils.saveAccessToken(action.payload.token)
    })
  },
})

export const { auth_setUser, auth_setToken } = authSlice.actions

export const select_authState = (state: RootState): AuthState => state.auth
