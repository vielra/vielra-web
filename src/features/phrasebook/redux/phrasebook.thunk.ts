import { createAsyncThunk } from '@reduxjs/toolkit'
import { phrasebookApi } from '@/features/phrasebook/api'
import { IBaseApiResponseError } from '@/features/app/interfaces'
import {
  IPhraseModel,
  IRequestGetPhrases,
} from '@/features/phrasebook/intefaces'

const phrasebook_getPhrases = createAsyncThunk(
  '@phrasebook/getPhrases',
  async (params: IRequestGetPhrases, { rejectWithValue }) => {
    try {
      return await phrasebookApi.getPhrases(params)
    } catch (err) {
      return rejectWithValue(err as IBaseApiResponseError)
    }
  }
)

const phrasebook_getCategories = createAsyncThunk(
  '@phrasebook/getCategories',
  async (undefined, { rejectWithValue }) => {
    try {
      return await phrasebookApi.getCategories()
    } catch (err) {
      return rejectWithValue(err as IBaseApiResponseError)
    }
  }
)

const phrasebook_createPhrase = createAsyncThunk(
  '@phrasebook/createPhrase',
  async (body: IPhraseModel, { rejectWithValue }) => {
    try {
      return await phrasebookApi.createPhrase(body)
    } catch (err) {
      return rejectWithValue(err as IBaseApiResponseError)
    }
  }
)

export {
  phrasebook_getPhrases,
  phrasebook_getCategories,
  phrasebook_createPhrase,
}
