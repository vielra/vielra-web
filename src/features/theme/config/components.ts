import { blueGrey, indigo } from '@mui/material/colors'
import { alpha, Components } from '@mui/material/styles'

export const components: Components = {
  MuiCircularProgress: {
    styleOverrides: {
      circle: 'stroke-width: 0.1rem',
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        // '& .MuiInputBase-input': {
        //   padding: '12px 18px',
        // },
        '& label.MuiInputLabel-outlined': {
          transform: 'translate(14px, 11px)',
        },
      },
      input: {
        padding: '12px 18px',
      },
    },
  },
}
