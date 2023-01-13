import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { API_BASE_URL } from '@/features/app/constants'

const onRequest = (config: Partial<AxiosRequestConfig>): AxiosRequestConfig => {
  // const accessToken = Cookies.get('AccessToken')
  // if (accessToken) {
  //   /* eslint-disable no-param-reassign */
  //   config.headers.Authorization = `Bearer ${accessToken}`
  // }
  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    // console.error(`❌❌❌ Request error -> ${JSON.stringify(error)}`)
  }
  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    // console.log('💚💚💚 Response success ->', response);
  }
  return response
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  // eslint-disable-next-line no-console
  // console.error(`❌❌❌ Response error -> ${JSON.stringify(error)}`)

  // Check if network disconnected
  if (error.code === 'ECONNABORTED') {
    // eslint-disable-next-line no-console
    // console.error('❌❌❌ Response error ->', 'Something when wrong with your connection', error);
  }
  return Promise.reject(error)
}

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}

const api = setupInterceptorsTo(
  axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
)

export { api }
