/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMemo } from 'react'

import { useAppSelector } from '@/plugins/redux'

import * as auth_thunkActions from '@/features/auth/redux/auth.thunk'

// persistAuth slice
import {
  persistAuthActions,
  persistAuth_select,
} from '@/features/auth/redux/persist-auth.slice'

// auth slice
import { authActions, auth_select } from '@/features/auth/redux/auth.slice'

import { authUtils } from '@/features/auth/utils'

const useAuth = () => {
  const { token, user } = useAppSelector(persistAuth_select)
  const authState = useAppSelector(auth_select)

  const isAuthenticated = useMemo<boolean>(() => {
    return (
      Boolean(user) && Boolean(token) && Boolean(authUtils.getAccessToken())
    )
  }, [user, token])

  // Register api
  // const [auth_register, { isLoading: register_isLoading }] =
  //   useRegisterMutation()

  return {
    // States.
    ...authState,

    token,
    user,
    isAuthenticated,

    // auth_sendLinkResetPassword,
    // auth_sendLinkResetPasswordLoading,

    // Actions
    ...persistAuthActions,
    ...authActions,

    //  Async thunk
    ...auth_thunkActions,
  }
}

export { useAuth }
