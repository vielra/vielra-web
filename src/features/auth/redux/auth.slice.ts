import { createSlice } from '@reduxjs/toolkit'

// Interfaces
import { RootState } from '@/plugins/redux'

// thunk actions
import {
  auth_login,
  auth_register,
  auth_sendRecoveryLink,
  auth_logout,
  auth_loginWithSocialAccount,
} from './auth.thunk'

// utils
import { authUtils } from '@/features/auth/utils'

// interfaces
import { IUser } from '@/features/user/interfaces'
import {
  IApiResponseUnprocessableEntity,
  IBaseApiResponseError,
} from '@/features/app/interfaces'

interface StateError {
  status: number | null
  message: string | null
  errors: IApiResponseUnprocessableEntity['errors'] | null
}

// Type for our state
export interface AuthState {
  auth_isOpenDialogAuth: boolean

  auth_loginIsLoading: boolean
  auth_loginIsFailure: boolean
  auth_loginError: StateError

  auth_socialLoginIsLoading: boolean
  auth_socialLoginIsFailure: boolean
  auth_socialLoginError: StateError

  auth_registerIsLoading: boolean
  auth_registerIsFailure: boolean
  auth_registerErrorMessage: null

  auth_recoveryIsLoading: boolean
  auth_recoveryIsFailure: boolean
  auth_recoveryErrorMessage: null
  auth_hasSendRecoveryLink: boolean

  auth_isLoggedOut: boolean
  auth_loggedOutUser: IUser | null
}

// Initial state
const initialState: AuthState = {
  auth_isOpenDialogAuth: false,

  auth_loginIsLoading: false,
  auth_loginIsFailure: false,
  auth_loginError: {
    status: null,
    message: null,
    errors: null,
  },

  auth_socialLoginIsLoading: false,
  auth_socialLoginIsFailure: false,
  auth_socialLoginError: {
    status: null,
    message: null,
    errors: null,
  },

  auth_registerIsLoading: false,
  auth_registerIsFailure: false,
  auth_registerErrorMessage: null,

  auth_recoveryIsLoading: false,
  auth_recoveryIsFailure: false,
  auth_recoveryErrorMessage: null,
  auth_hasSendRecoveryLink: false,

  // This state used tos say goodbye to user
  auth_isLoggedOut: false,
  auth_loggedOutUser: null,
}

// Actual Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth_setOpenDialogAuth(state, action) {
      state.auth_isOpenDialogAuth = action.payload
    },
    auth_resetUserLoggedOut(state) {
      state.auth_isLoggedOut = false
      state.auth_loggedOutUser = null
    },
    auth_resetHasSendRecoveryLink(state) {
      state.auth_hasSendRecoveryLink = false
    },

    auth_resetPasswordRecoveryState(state) {
      state.auth_recoveryIsLoading = false
      state.auth_recoveryIsFailure = false
      state.auth_recoveryErrorMessage = null
      state.auth_hasSendRecoveryLink = false
    },

    auth_resetLoginState(state) {
      state.auth_loginIsLoading = false
      state.auth_loginIsFailure = false
      state.auth_loginError = initialState.auth_loginError
    },

    auth_resetSocialLoginState(state) {
      state.auth_socialLoginIsLoading = false
      state.auth_socialLoginIsFailure = false
      state.auth_socialLoginError = initialState.auth_socialLoginError
    },
  },
  extraReducers: builder => {
    // Login
    builder.addCase(auth_login.pending, state => {
      state.auth_loginIsLoading = true
      state.auth_loginIsFailure = false
    })
    builder.addCase(auth_login.rejected, (state, action) => {
      state.auth_loginIsLoading = false
      state.auth_loginIsFailure = true

      state.auth_loginError = action.payload as StateError
    })
    builder.addCase(auth_login.fulfilled, (state, action) => {
      state.auth_loginIsFailure = false
      state.auth_loginIsLoading = false
    })

    // External login with social account
    builder.addCase(auth_loginWithSocialAccount.pending, state => {
      state.auth_socialLoginIsLoading = true
      state.auth_socialLoginIsFailure = false
    })
    builder.addCase(auth_loginWithSocialAccount.rejected, (state, action) => {
      state.auth_socialLoginIsLoading = false
      state.auth_socialLoginIsFailure = true
      console.log('auth_loginWithSocialAccount.rejected', action)
    })
    builder.addCase(auth_loginWithSocialAccount.fulfilled, (state, action) => {
      state.auth_socialLoginIsFailure = false
      state.auth_socialLoginIsLoading = false
    })

    // Register
    builder.addCase(auth_register.pending, state => {
      state.auth_registerIsLoading = true
      state.auth_registerIsFailure = false
    })
    builder.addCase(auth_register.rejected, (state, action) => {
      state.auth_registerIsLoading = false
      state.auth_registerIsFailure = true
      console.log('auth_register.rejected', action)
    })
    builder.addCase(auth_register.fulfilled, (state, action) => {
      state.auth_registerIsFailure = false
      state.auth_registerIsLoading = false
    })

    // Recovery password
    builder.addCase(auth_sendRecoveryLink.pending, state => {
      state.auth_recoveryIsLoading = true
      state.auth_recoveryIsFailure = false
    })
    builder.addCase(auth_sendRecoveryLink.rejected, (state, action) => {
      state.auth_recoveryIsLoading = false
      state.auth_recoveryIsFailure = true

      state.auth_recoveryIsFailure = true
      console.log('auth_sendRecoveryLink.rejected', action)
    })
    builder.addCase(auth_sendRecoveryLink.fulfilled, (state, action) => {
      state.auth_recoveryIsLoading = false
      state.auth_recoveryIsFailure = false

      state.auth_hasSendRecoveryLink = true
    })

    // Logout
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    builder.addCase(auth_logout.pending, state => {})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(auth_logout.rejected, state => {
      authUtils.removeAccessToken()

      state.auth_isLoggedOut = true
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(auth_logout.fulfilled, (state, action) => {
      authUtils.removeAccessToken()

      state.auth_isLoggedOut = true
      state.auth_loggedOutUser = action.payload as IUser
    })
  },
})

export const authActions = authSlice.actions

export const auth_select = (state: RootState): AuthState => state.auth
