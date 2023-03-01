import { createSlice } from '@reduxjs/toolkit'

// Interfaces
import { IUser } from '@/features/user/interfaces'
import { RootState } from '@/plugins/redux'

import {
  auth_login,
  auth_register,
  auth_logout,
  auth_loginWithSocialAccount,
} from './auth.thunk'
import { authUtils } from '@/features/auth/utils'

// Type for our state
export interface PersistAuthState {
  token: string | null
  user: IUser | null
}

// Initial state
const initialState: PersistAuthState = {
  token: null,
  user: null,
}

// Actual Slice
export const persistAuthSlice = createSlice({
  name: 'persistAuth',
  initialState,
  reducers: {
    // Action to set the authentication status
    auth_setUser(state, action) {
      state.user = action.payload
    },
    auth_setToken(state, action) {
      state.token = action.payload
    },
    auth_reset: () => initialState,
  },

  extraReducers: builder => {
    // Login
    builder.addCase(auth_login.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token

      authUtils.saveAccessToken(action.payload.token)
    })

    // Register
    builder.addCase(auth_register.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token

      authUtils.saveAccessToken(action.payload.token)
    })

    // External login with social account
    builder.addCase(auth_loginWithSocialAccount.fulfilled, (state, action) => {
      if (action.payload?.user && action.payload?.token) {
        state.user = action.payload.user as IUser
        state.token = action.payload.token as string
        authUtils.saveAccessToken(action.payload.token)
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    builder.addCase(auth_logout.pending, state => {})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(auth_logout.rejected, state => {
      // Also reset auth state when revoke token failure
      return { ...initialState }
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(auth_logout.fulfilled, state => {
      return { ...initialState }
    })
  },
})

export const persistAuthActions = persistAuthSlice.actions

export const persistAuth_select = (state: RootState): PersistAuthState =>
  state.persistAuth
