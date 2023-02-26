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
  social_account: unknown
}
