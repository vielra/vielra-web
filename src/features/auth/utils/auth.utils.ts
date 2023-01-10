import Cookies from 'js-cookie'

// Constants.
import { ACCESS_TOKEN_KEY } from '@/features/app/constants'

const getAccessToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_KEY)
}

const removeAccessToken = (): void => {
  return Cookies.remove(ACCESS_TOKEN_KEY)
}

export { getAccessToken, removeAccessToken }
