// Redux toolkit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Constants.
import { API_BASE_URL } from '@/features/app/constants'

// Utils.
import { getAccessToken } from '@/features/auth/utils'

// Interfaces.
import {
  IRequestLogin,
  IRequestRegister,
  IRequestSendLinkResetPassword,
  IResponseLogin,
  IResponseSendLinkResetPassword,
} from '@/features/auth/interfaces'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<IResponseLogin, IRequestLogin>({
      query: (body) => ({
        url: `/auth/login`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    register: builder.mutation<IResponseLogin, IRequestRegister>({
      query: (body) => ({
        url: `/auth/register`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    sendLinkResetPassword: builder.mutation<IResponseSendLinkResetPassword, IRequestSendLinkResetPassword>({
      query: (body) => ({
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
        body: { access_token: getAccessToken() },
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const { useLoginMutation, useRegisterMutation, useSendLinkResetPasswordMutation, useLogoutMutation } = authApi
