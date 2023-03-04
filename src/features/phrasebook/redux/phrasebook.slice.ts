import { createSlice } from '@reduxjs/toolkit'

// Interfaces
import { RootState } from '@/plugins/redux'

// thunk actions
import {
  phrasebook_getCategories,
  phrasebook_getPhrases,
} from './phrasebook.thunk'

// utils
import { authUtils } from '@/features/auth/utils'

// interfaces
import { IUser } from '@/features/user/interfaces'
import { IApiResponseUnprocessableEntity } from '@/features/app/interfaces'
import {
  IPhrase,
  IPhrasebook,
  IPhraseCategory,
} from '@/features/phrasebook/intefaces'

interface StateError {
  status: number | null
  message: string | null
  errors: IApiResponseUnprocessableEntity['errors'] | null
}

// Type for our state
export interface PhrasebookState {
  phrasebook_isOpenDialogFormPhrase: boolean

  phrasebook_categoriesIsLoading: boolean
  phrasebook_categoriesIsError: boolean
  phrasebook_categoriesData: IPhraseCategory[]

  phrasebook_phrasesIsLoading: boolean
  phrasebook_phrasesIsError: boolean
  phrasebook_phrasesData: {
    [key: string]: IPhrasebook
  }
}

// Initial state
const initialState: PhrasebookState = {
  phrasebook_isOpenDialogFormPhrase: false,

  phrasebook_categoriesIsLoading: false,
  phrasebook_categoriesIsError: false,
  phrasebook_categoriesData: [],

  phrasebook_phrasesIsLoading: false,
  phrasebook_phrasesIsError: false,
  phrasebook_phrasesData: {},
}

// Actual Slice
export const phrasebookSlice = createSlice({
  name: 'phrasebook',
  initialState,
  reducers: {
    auth_setOpenDialogAuth(state, action) {
      state.phrasebook_isOpenDialogFormPhrase = action.payload
    },
  },
  extraReducers: builder => {
    // Get phrase categories
    builder.addCase(phrasebook_getCategories.pending, state => {
      state.phrasebook_categoriesIsLoading = true
      state.phrasebook_categoriesIsError = false
    })
    builder.addCase(phrasebook_getCategories.rejected, state => {
      state.phrasebook_categoriesIsLoading = false
      state.phrasebook_categoriesIsError = true
    })
    builder.addCase(phrasebook_getCategories.fulfilled, (state, action) => {
      state.phrasebook_categoriesIsError = false
      state.phrasebook_categoriesIsLoading = false
      state.phrasebook_categoriesData = action.payload
    })

    // Get phrases
    builder.addCase(phrasebook_getPhrases.pending, state => {
      state.phrasebook_phrasesIsLoading = true
      state.phrasebook_phrasesIsError = false
    })
    builder.addCase(phrasebook_getPhrases.rejected, state => {
      state.phrasebook_phrasesIsLoading = false
      state.phrasebook_phrasesIsError = true
    })
    builder.addCase(phrasebook_getPhrases.fulfilled, (state, action) => {
      state.phrasebook_phrasesIsError = false
      state.phrasebook_phrasesIsLoading = false

      if (action.payload?.category && action.payload?.phrases) {
        console.log('---action phrasebook_getPhrases.fulfilled', action)
        state.phrasebook_phrasesData = {
          ...state.phrasebook_phrasesData,
          [action.payload.category.slug]: action.payload,
        }
      }
    })
  },
})

export const phrasebookReducerActions = phrasebookSlice.actions

export const phrasebook_select = (state: RootState): PhrasebookState =>
  state.phrasebook
