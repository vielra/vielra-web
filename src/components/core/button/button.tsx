import { FC } from 'react'
import MuiButton, { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles'

type Props = ButtonProps

export const StyledButton = styled(MuiButton)({
  textTransform: 'unset',
  fontWeight: 500,
  whiteSpace: 'pre-wrap',

  '&.MuiButton-sizeLarge': {
    fontSize: '1rem',
    padding: '8px 26px',
  },

  // another styles
})

const Button: FC<Props> = props => {
  return <StyledButton {...props} />
}

export { Button }
