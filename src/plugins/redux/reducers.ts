// Redux Toolkit
import { combineReducers } from '@reduxjs/toolkit'

// Slices & Api
import { authApi, authSlice, persistAuthSlice } from '@/features/auth/redux'
import { persistAppSlice } from '@/features/app/redux'
import { appThemeSlice } from '@/plugins/mui/redux'
import { phrasebookSlice } from '@/features/phrasebook/redux'

const plainReducers = {
  [persistAppSlice.name]: persistAppSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [persistAuthSlice.name]: persistAuthSlice.reducer,
  [appThemeSlice.name]: appThemeSlice.reducer,
  [phrasebookSlice.name]: phrasebookSlice.reducer,

  // Rtk
  [authApi.reducerPath]: authApi.reducer,
}

const rootReducer = combineReducers(plainReducers)

export { plainReducers, rootReducer }
