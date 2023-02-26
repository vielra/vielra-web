import React, { FC, ReactNode, useMemo } from 'react'

// Mui
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Lodash
import merge from 'lodash/merge'

// Theme mui-config
import { paletteBase } from '@/plugins/mui/config/theme.palette-base'
import { paletteDark } from '@/plugins/mui/config/theme.palette-dark'
import { paletteLight } from '@/plugins/mui/config/theme.palette-light'
import { typography } from '@/plugins/mui/config/theme.typography'
import { components } from '@/plugins/mui/config/theme.components'
import { shadows } from '@/plugins/mui/config/theme.shadows'

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
      appTheme_paletteMode === 'dark'
        ? merge(paletteBase, paletteDark)
        : merge(paletteBase, paletteLight)
    return createTheme({
      palette,
      typography,
      shadows,
      components,
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
