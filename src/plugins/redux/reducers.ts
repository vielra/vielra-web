// Redux Toolkit
import { combineReducers } from '@reduxjs/toolkit'

// Slices & Api
import { authApi, authSlice } from '@/features/auth/redux'
import { appThemeSlice } from '@/plugins/mui/redux'

const plainReducers = {
  [authSlice.name]: authSlice.reducer,
  [appThemeSlice.name]: appThemeSlice.reducer,

  // Rtk
  [authApi.reducerPath]: authApi.reducer,
}

const rootReducer = combineReducers(plainReducers)

export { plainReducers, rootReducer }
