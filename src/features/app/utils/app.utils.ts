import { authUtils } from '@/features/auth/utils'
import { getLanguageName, getFlagIcon } from './app-locale.utils'

const authRequestTokenHeader = (): Record<string, string | undefined> => {
  return {
    Authorization: `Bearer ${authUtils.getAccessToken()}`,
  }
}

export const AppUtils = {
  authRequestTokenHeader,
  getLanguageName,
  getFlagIcon,
}
