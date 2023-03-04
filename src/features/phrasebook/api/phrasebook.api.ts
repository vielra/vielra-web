import { HttpClient } from '@/features/app/http'
import { authUtils } from '@/features/auth/utils'
import {
  IPhrase,
  IPhrasebook,
  IPhraseCategory,
  IRequestCreatePhrase,
  IRequestGetPhrases,
} from '@/features/phrasebook/intefaces'

const phrasebookApi = {
  getPhrases: async (params: IRequestGetPhrases): Promise<IPhrasebook> => {
    const response = await HttpClient.get('/phrasebook/phrase', { params })
    return response.data
  },

  getCategories: async (): Promise<IPhraseCategory[]> => {
    const response = await HttpClient.get('/phrasebook/category')
    return response.data
  },

  createPhrase: async (body: IRequestCreatePhrase): Promise<IPhrase> => {
    const response = await HttpClient.post('/phrasebook/phrase', body, {
      headers: {
        Authorization: `Bearer ${authUtils.getAccessToken()}`,
      },
    })
    return response.data
  },
}

export { phrasebookApi }
