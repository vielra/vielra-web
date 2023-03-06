import { SocialAuthProvider } from '@/features/auth/interfaces'

export interface IUser {
  id: string
  name: string
  email: string
  username: string
  photo_url: string | null
  gender: string | null
  mobile_phone: string | null
  birthday: string | null
  about: string | null
  created_at: string | null
  updated_at: string | null
  status: string
  social_account: ISocialAccount
  avatar_text_color: string
}

export interface ISocialAccount {
  id: number
  social_id: string
  social_name: string
  social_photo_url: string
  social_provider: SocialAuthProvider
}
