import { authUtils } from '@/features/auth/utils'

const authRequestTokenHeader = (): Record<string, string | undefined> => {
  return {
    Authorization: `Bearer ${authUtils.getAccessToken()}`,
  }
}

export const AppUtils = {
  authRequestTokenHeader,
}
