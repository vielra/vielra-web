import { createTheme as createMuiTheme, Theme } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'

// Theme config.
import { paletteBase, paletteLight, paletteDark, shadows, typography, breakpoints } from '@/features/theme/config'

/**
 * Create theme
 *
 * @param {PaletteMode} mode - "light" | "dark"
 * @returns {Theme}
 */
export const createTheme = (mode?: PaletteMode): Theme => {
  return createMuiTheme({
    palette: {
      ...paletteBase,
      ...(mode !== 'dark' ? { ...paletteLight } : { ...paletteDark }),
    },
    typography,
    breakpoints,
    shadows,
  })
}
