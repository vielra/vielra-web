import { HttpClient } from '@/features/app/http'
import {
  IPhrase,
  IPhrasebook,
  IPhraseModel,
  IPhraseCategory,
  IRequestGetPhrases,
} from '@/features/phrasebook/intefaces'

// utils
import { AppUtils } from '@/features/app/utils'

const phrasebookApi = {
  getPhrases: async (params: IRequestGetPhrases): Promise<IPhrasebook> => {
    const response = await HttpClient.get('/phrasebook/phrase', { params })
    return response.data
  },

  getCategories: async (): Promise<IPhraseCategory[]> => {
    const response = await HttpClient.get('/phrasebook/category')
    return response.data
  },

  createPhrase: async (body: IPhraseModel): Promise<IPhrase> => {
    const response = await HttpClient.post('/phrasebook/phrase', body, {
      headers: AppUtils.authRequestTokenHeader(),
    })
    return response.data
  },
}

export { phrasebookApi }
