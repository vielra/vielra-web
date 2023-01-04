import { alpha, PaletteOptions } from '@mui/material'
import { grey, common } from '@mui/material/colors'

export const paletteBase: Partial<PaletteOptions> = {
  secondary: {
    main: '#FF4564',
    dark: '#F10930',
    light: '#FEF2EF',
    contrastText: '#fbfbfb',
  },
  primary: {
    main: '#3393FF',
    dark: '#1955B7',
    light: '#EEF9FE',
    contrastText: '#fbfbfb',
  },
  success: {
    main: '#0CB954',
    dark: '#089F56',
    light: '#e2ffe2',
    contrastText: '#fbfbfb',
  },
  info: {
    main: '#069efe',
    dark: '#047ADA',
    light: '#EEFCFE',
    contrastText: '#fbfbfb',
  },
  warning: {
    main: '#ffa50b',
    dark: '#DB8508',
    light: '#FFF9E6',
    contrastText: '#fff',
  },
  error: {
    main: '#ff3517',
    dark: '#B70B10',
    light: '#FFEFE3',
    contrastText: '#fff',
  },
  common: {
    white: '#fff',
    black: '#000000',
  },
}

/** Palette light */
export const paletteLight: Pick<PaletteOptions, 'text' | 'background' | 'mode' | 'divider'> = {
  mode: 'light',
  background: {
    default: '#f7f7f7',
    paper: common.white,
  },
  text: {
    primary: '#202020',
    secondary: '#5c5c5c',
    disabled: grey[400],
  },
  divider: alpha('#000', 0.07),
}

/** Palette dark */
export const paletteDark: Pick<PaletteOptions, 'text' | 'background' | 'mode' | 'divider'> = {
  mode: 'dark',
  background: {
    default: '#38383d',
    paper: '#26262a',
  },
  text: {
    primary: grey[100],
    secondary: grey[300],
    disabled: grey[400],
  },
  divider: 'rgba(255, 255, 255, 0.18)',
}
