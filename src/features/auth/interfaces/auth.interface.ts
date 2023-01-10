export interface IRequestLogin {
  email: string
  password: string
  token_name?: string | null
}

export interface IRequestRegister {
  name: string
  username: string
  phone_number?: string
  email: string
  password: string
  password_confirmation: string
}

// Login response
export interface IResponseLogin {
  success: boolean
  token_type?: string
  token: string
  user: any // Change it later
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IResponseRegister extends IResponseLogin {}
