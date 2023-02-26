/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMemo } from 'react'
import {
  auth_setToken,
  auth_setUser,
  select_authState,
} from '@/features/auth/redux/auth.slice'
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useSendLinkResetPasswordMutation,
} from '@/features/auth/redux/auth.rtk'
import { useAppSelector } from '@/plugins/redux'

import * as auth_thunkActions from '@/features/auth/redux/auth.thunk'
import { authUtils } from '@/features/auth/utils'

const useAuth = () => {
  const { token, user } = useAppSelector(select_authState)

  const isAuthenticated = useMemo<boolean>(() => {
    return (
      Boolean(user) && Boolean(token) && Boolean(authUtils.getAccessToken())
    )
  }, [user, token])

  // Register api
  const [auth_register, { isLoading: register_isLoading }] =
    useRegisterMutation()

  // Register api
  const [
    auth_sendLinkResetPassword,
    { isLoading: auth_sendLinkResetPasswordLoading },
  ] = useSendLinkResetPasswordMutation()

  // Logout api
  const [auth_logout, { isLoading: logout_isLoading }] = useLogoutMutation()

  return {
    // States.
    token,
    user,
    isAuthenticated,

    // Rtk
    // auth_login,
    // login_isLoading,

    auth_register,
    register_isLoading,
    auth_logout,
    logout_isLoading,
    auth_sendLinkResetPassword,
    auth_sendLinkResetPasswordLoading,

    // Actions
    auth_setToken,
    auth_setUser,

    //  Async thunk
    ...auth_thunkActions,
  }
}

export { useAuth }
