import { createSlice } from '@reduxjs/toolkit'

// Interfaces
import { RootState } from '@/plugins/redux'
import { AppLocale } from '@/features/app/interfaces'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('../../../../next-i18next.config')

// Type for our state
interface PersistAppState {
  persistApp_locale: string
  persistApp_locales: string[]
  persistApp_displayTypePhraseList: 'grid' | 'list' | string
}

// Initial state
const initialState: PersistAppState = {
  persistApp_locale: i18n.defaultLocale,
  persistApp_locales: i18n.locales,
  persistApp_displayTypePhraseList: 'grid', // default 'grid'
}

// Actual Slice
export const persistAppSlice = createSlice({
  name: 'persistApp',
  initialState,
  reducers: {
    persistApp_setLocale(state, action) {
      state.persistApp_locale = action.payload
    },
    persistApp_setDisplayTypePhraseList(state, action) {
      state.persistApp_displayTypePhraseList = action.payload
    },
  },
})

export const persistApp_actions = persistAppSlice.actions

export const persistApp_selectState = (state: RootState): PersistAppState =>
  state.persistApp
