import { FC } from 'react'
// import Box from '@mui/material/Box'
import MuiButton, { ButtonProps } from '@mui/material/Button'
// import { Icon } from '@iconify/react'

type Props = ButtonProps

const Button: FC<Props> = (props) => {
  const { icon, isError, ...rest } = props
  return <MuiButton {...rest} />
}

export { Button }
