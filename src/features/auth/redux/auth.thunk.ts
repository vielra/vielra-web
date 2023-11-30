import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  SocialAuthProvider,
  IRequestLogin,
  IRequestRegister,
  IRequestSendLinkResetPassword,
  IRequestResetPassword,
} from '@/features/auth/interfaces'
import { authApi } from '@/features/auth/api'
import { RootState } from '@/plugins/redux'
import { IBaseApiResponseError } from '@/features/app/interfaces'

interface ILoginWithSocialAccount {
  params: Record<string, string | number>
  provider: SocialAuthProvider
}

const auth_login = createAsyncThunk(
  '@auth/login',
  async (body: IRequestLogin, { rejectWithValue }) => {
    try {
      return await authApi.loginWithEmail(body)
    } catch (err) {
      return rejectWithValue(err as IBaseApiResponseError)
    }
  }
)

const auth_register = createAsyncThunk(
  '@auth/register',
  async (body: IRequestRegister, { rejectWithValue }) => {
    try {
      return await authApi.register(body)
    } catch (err) {
      return rejectWithValue(err as IBaseApiResponseError)
    }
  }
)

const auth_sendRecoveryLink = createAsyncThunk(
  '@auth/sendRecoveryLink',
  async (body: IRequestSendLinkResetPassword, { rejectWithValue }) => {
    try {
      return await authApi.sendRecoveryLink(body)
    } catch (err) {
      return rejectWithValue(err as IBaseApiResponseError)
    }
  }
)

const auth_resetPassword = createAsyncThunk(
  '@auth/resetPassword',
  async (body: IRequestResetPassword, { rejectWithValue }) => {
    try {
      return await authApi.resetPassword(body)
    } catch (err) {
      return rejectWithValue(err as IBaseApiResponseError)
    }
  }
)

const auth_loginWithSocialAccount = createAsyncThunk(
  '@auth/loginWithSocialAccount',
  async ({ params, provider }: ILoginWithSocialAccount) => {
    const response = await authApi.loginWithSocialAccount(provider, params)
    return response
  }
)

const auth_logout = createAsyncThunk(
  '@auth/logout',
  async (undefined, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const { persistAuth: authState } = getState() as RootState
      const response = await authApi.revokeToken({
        currentAccessToken: authState.token || '',
      })
      if (response) return fulfillWithValue(authState.user)
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export {
  auth_login,
  auth_register,
  auth_sendRecoveryLink,
  auth_resetPassword,
  auth_loginWithSocialAccount,
  auth_logout,
}
