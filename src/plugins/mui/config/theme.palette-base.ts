import { PaletteOptions } from '@mui/material'

const paletteBase: Partial<PaletteOptions> = {
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

export { paletteBase }
