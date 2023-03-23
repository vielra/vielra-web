import React, { FC, ReactNode, useMemo } from 'react'

// Mui
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Lodash
import merge from 'lodash/merge'

// Theme mui-config
import {
  paletteBase,
  paletteDark,
  paletteLight,
  typography,
  components,
  shadows,
  shape,
} from '@/plugins/mui/config'

// Hooks
import { useAppTheme } from '@/plugins/mui/hooks'

interface MuiThemeProviderProps {
  children: ReactNode
}

const MuiThemeProvider: FC<MuiThemeProviderProps> = ({ children }) => {
  const { appTheme_paletteMode } = useAppTheme()

  // Theme config.
  const theme = useMemo<Theme>(() => {
    const palette =
      appTheme_paletteMode === 'light'
        ? merge(paletteBase, paletteLight)
        : merge(paletteBase, paletteDark)
    return createTheme({
      palette,
      typography,
      shadows,
      components,
      shape,
    })
  }, [appTheme_paletteMode])

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export { MuiThemeProvider }
