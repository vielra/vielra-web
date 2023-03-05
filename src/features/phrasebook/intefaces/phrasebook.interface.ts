import { IUser } from '@/features/user/interfaces'

export type PhraseTextTranslation = 'vi' | 'en' | 'id'

export interface IPhraseCategory {
  id: string
  name: {
    en: string
    id: string
    vi: string
  }
  slug: string
  color: string
  icon_name: string | null
  icon_type: string | null
  image_url: string | null
  order: number
  is_active: boolean
  phrases_count: number
}

export interface IPhrase {
  id: string
  status_id: number
  order: 0
  text: {
    vi: string
    en: string
    id: string
  }
  audios: unknown[]
  has_reported: null
  user_id: IUser['id'] | null
  confirmed: boolean
  confirmed_by_user_id: IUser['id'] | null
}

export interface IPhrasebook {
  category: IPhraseCategory
  phrases: IPhrase[]
}

export interface IPhraseModel {
  category_id: string
  text_vi: string
  text_en: string
  text_id: string
  confirmed: boolean
  mark_as_created_by_system: boolean
}

// eslint-disable-next-line
export interface IRequestPhrase extends IPhraseModel {}

export interface IRequestGetPhrases {
  category: string
}
