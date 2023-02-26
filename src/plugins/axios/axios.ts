import axios, { AxiosError, AxiosResponse } from 'axios'

// Interfaces
import { IBaseApiResponseError } from '@/features/app/interfaces/app-api.interface'

// On request rejected
const onRequestError = (axiosError: AxiosError): AxiosError => {
  /** @note logging for development only */
  if (process.env.NODE_ENV === 'development') {
    console.log('❌ Axios onResponseError ->', axiosError)
  }
  return axiosError
}

// On response fulfilled
const onResponseSuccess = (axiosResponse: AxiosResponse): AxiosResponse => {
  /** @note logging for development only */
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Axios onResponseSuccess ->', axiosResponse)
  }

  return axiosResponse
}

// On response rejected
const onResponseError = (
  axiosError: AxiosError
): Promise<IBaseApiResponseError> => {
  /** @note logging for development only */
  if (process.env.NODE_ENV === 'development') {
    console.log('❌ Axios onResponseError ->', axiosError)
  }

  let mapErrorResponse = {} as IBaseApiResponseError

  if (axiosError.response) {
    /** Unprocessable entity */
    if (axiosError?.response?.status === 422) {
      // Do something with response
    }
    mapErrorResponse = {
      ...mapErrorResponse,
      status: axiosError.response.status,
      result: axiosError.response.data,
    }
  } else {
    mapErrorResponse = {
      ...mapErrorResponse,
      message: String(axiosError.message),
      result: null,
    }
  }

  /** @note logging for development only */
  if (process.env.NODE_ENV === 'development') {
    console.log('❌ Axios mapErrorResponse ->', mapErrorResponse)
  }

  return Promise.reject(mapErrorResponse)
}

/**
 * Axios instance
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VIELRA_API_BASE_URL,
  timeout: 20000,
})

// On request
axiosInstance.interceptors.request.use(
  async config => {
    return config
  },
  error => {
    return Promise.reject(onRequestError(error))
  }
)

// On response
axiosInstance.interceptors.response.use(
  async response => {
    return onResponseSuccess(response)
  },
  async error => {
    return onResponseError(error)
  }
)

export { axiosInstance }
