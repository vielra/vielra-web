import {
  SocialAuthProvider,
  IRequestLogin,
  IRequestRegister,
  IRequestSendLinkResetPassword,
  IResponseLogin,
  IRequestVerifyTokenPasswordReset,
  IRequestResetPassword,
  IResponseResetPassword,
} from '@/features/auth/interfaces'
import { HttpClient } from '@/features/app/http'
import { authUtils } from '../utils'
import { IUser } from '@/features/user/interfaces'

const authApi = {
  loginWithEmail: async (body: IRequestLogin): Promise<IResponseLogin> => {
    const response = await HttpClient.post('/auth/login', body)
    return response.data
  },

  register: async (body: IRequestRegister): Promise<IResponseLogin> => {
    const response = await HttpClient.post('/auth/register', body)
    return response.data
  },

  sendRecoveryLink: async (
    body: IRequestSendLinkResetPassword
  ): Promise<IResponseLogin> => {
    const response = await HttpClient.post(
      '/auth/send-reset-password-link',
      body
    )
    return response.data
  },

  verifyTokenPasswordReset: async (
    body: IRequestVerifyTokenPasswordReset
  ): Promise<IUser> => {
    const response = await HttpClient.post('auth/password-reset/verify', body)
    return response.data
  },

  resetPassword: async (
    body: IRequestResetPassword
  ): Promise<IResponseResetPassword> => {
    const response = await HttpClient.post('/auth/password-reset', body)
    return response.data
  },

  getSocialAuthUrl: async (
    provider: SocialAuthProvider
  ): Promise<{ url: string }> => {
    const response = await HttpClient.get(`/auth/${provider}/url`)
    return response.data
  },

  loginWithSocialAccount: async (
    provider: SocialAuthProvider,
    params: Record<string, string | number>
  ): Promise<IResponseLogin> => {
    const response = await HttpClient.get(`/auth/${provider}/callback`, {
      params,
    })
    return response.data
  },

  revokeToken: async (body: {
    currentAccessToken: string
  }): Promise<unknown> => {
    const response = await HttpClient.post('/auth/revoke-token', body, {
      headers: {
        Authorization: `Bearer ${authUtils.getAccessToken()}`,
      },
    })
    return response.data
  },
}

export { authApi }
