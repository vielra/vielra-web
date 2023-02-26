import { createSlice } from '@reduxjs/toolkit'

// Interfaces
import { RootState } from '@/plugins/redux'
import { PaletteMode } from '@mui/material'

// Type for our state
interface AppThemeState {
  appTheme_paletteMode: PaletteMode
}

// Initial state
const initialState: AppThemeState = {
  appTheme_paletteMode: 'light',
}

// Actual Slice
export const appThemeSlice = createSlice({
  name: 'appTheme',
  initialState,
  reducers: {
    appTheme_setPaletteMode(state, action) {
      state.appTheme_paletteMode = action.payload
    },
    appTheme_togglePaletteMode(state) {
      state.appTheme_paletteMode =
        state.appTheme_paletteMode === 'dark' ? 'light' : 'dark'
    },
  },
})

export const appTheme_actions = appThemeSlice.actions

export const appTheme_selectState = (state: RootState): AppThemeState =>
  state.appTheme
