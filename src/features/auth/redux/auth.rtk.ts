// Redux toolkit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Utils
import { authUtils } from '../utils'

// Interfaces.
import {
  IRequestRegister,
  IRequestSendLinkResetPassword,
  IResponseLogin,
  IResponseSendLinkResetPassword,
} from '@/features/auth/interfaces'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_VIELRA_API_BASE_URL,
  }),
  endpoints: builder => ({
    register: builder.mutation<IResponseLogin, IRequestRegister>({
      query: body => ({
        url: `/auth/register`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    sendLinkResetPassword: builder.mutation<
      IResponseSendLinkResetPassword,
      IRequestSendLinkResetPassword
    >({
      query: body => ({
        url: `/auth/send-reset-password-link`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    logout: builder.mutation<IResponseLogin, undefined>({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: { access_token: authUtils.getAccessToken() },
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useRegisterMutation,
  useSendLinkResetPasswordMutation,
  useLogoutMutation,
} = authApi
