import { Components } from '@mui/material/styles'

export const components: Components = {
  MuiCircularProgress: {
    styleOverrides: {
      circle: 'stroke-width: 0.1rem',
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {},
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        '& img': {
          width: 16,
          height: 'auto',
        },
      },
    },
  },
}
