import { IUser } from '@/features/user/interfaces'

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

// Login response
export interface IResponseLogin {
  token: string
  user: IUser
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IResponseRegister extends IResponseLogin {}

export interface IResponseSendLinkResetPassword {
  success: boolean
}

export type SocialAuthProvider =
  | 'facebook'
  | 'github'
  | 'google'
  | 'instagram'
  | 'linkedin'
