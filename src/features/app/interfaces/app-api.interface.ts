export interface IApiPaginationMeta {
  current_page: number
  from: number
  last_page: number
  links: { url: string; label: string; active: boolean }[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface IApiPagination<T> {
  data: T
  meta: IApiPaginationMeta
}

export interface IBaseApiResponseError<T = unknown> {
  message: string | null
  status?: number
  result: T
}

export interface IApiResponseWithPagination<T> {
  message: string
  result: IApiPagination<T>
}

export interface IApiResponseUnprocessableEntity {
  message: string
  errors: {
    [key: string]: string[]
  }
}
