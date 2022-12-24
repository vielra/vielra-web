/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAppSelector } from '@/store'
import { useMemo } from 'react'
import {
  auth_setToken,
  auth_setUser,
  select_authState,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} from '../redux'

const useAuth = () => {
  const { token, user } = useAppSelector(select_authState)

  const isAuthenticated = useMemo(() => {
    return Boolean(user) && Boolean(token)
  }, [user, token])

  // Login api
  const [auth_login, { isLoading: login_isLoading }] = useLoginMutation()

  // Register api
  const [auth_register, { isLoading: register_isLoading }] = useRegisterMutation()

  // Logout api
  const [auth_logout, { isLoading: logout_isLoading }] = useLogoutMutation()

  return {
    // States.
    token,
    user,
    isAuthenticated,

    // Rtk
    auth_login,
    login_isLoading,
    auth_register,
    register_isLoading,
    auth_logout,
    logout_isLoading,

    // Actions
    auth_setToken,
    auth_setUser,
  }
}

export { useAuth }
