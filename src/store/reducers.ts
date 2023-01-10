// Redux Toolkit
import { combineReducers } from '@reduxjs/toolkit'

// Slices & Api
import { authApi, authSlice } from '@/features/auth/redux'

const plainReducers = {
  [authSlice.name]: authSlice.reducer,

  // Rtk
  [authApi.reducerPath]: authApi.reducer,
}

const rootReducer = combineReducers(plainReducers)

export { plainReducers, rootReducer }
