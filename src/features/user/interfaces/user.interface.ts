export interface IUser {
  id: string
  name: string
  email: string
  photo_url?: string
  role_id: number
  role?: null
  birthday?: string
  gender?: string
  phone_number?: string
  about?: string
  status: string
  default_avatar_id: string | null
  avatar_text_color: string
  store: null
  availability_status: string
  created_at: string
}
