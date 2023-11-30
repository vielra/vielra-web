import { IUser } from '@/features/user/interfaces'

export interface IResponseUserWithToken {
  token: string
  user: IUser
}

export interface IRequestLogin {
  email: string
  password: string
  token_name?: string | null
}

export interface IRequestRegister {
  name: string
  username?: string // Optional
  phone_number?: string // Optional
  email: string
  password: string
  password_confirmation: string
}

export interface IRequestSendLinkResetPassword {
  email: string
}

export interface IRequestResetPassword {
  email: string
  token: string
  password: string
  password_confirmation: string
}

// Login response
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IResponseLogin extends IResponseUserWithToken {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IResponseRegister extends IResponseUserWithToken {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IResponseResetPassword extends IResponseUserWithToken {}

export interface IResponseSendLinkResetPassword {
  success: boolean
}

export interface IRequestVerifyTokenPasswordReset {
  token: string | null
  email: string | null
}

export type SocialAuthProvider =
  | 'facebook'
  | 'github'
  | 'google'
  | 'instagram'
  | 'linkedin'
