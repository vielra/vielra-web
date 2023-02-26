import Cookies from 'js-cookie'
import { AppConfig } from '@/features/app/config'

const saveAccessToken = (token: string): void => {
  Cookies.set(AppConfig.KeyAccessToken, token)
}

const getAccessToken = (): string | undefined => {
  return Cookies.get(AppConfig.KeyAccessToken)
}

const removeAccessToken = (): void => {
  Cookies.remove(AppConfig.KeyAccessToken)
}

export const authUtils = { getAccessToken, removeAccessToken, saveAccessToken }
