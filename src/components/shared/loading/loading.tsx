import React, { FC } from 'react'
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'

interface LoadingProps extends CircularProgressProps {
  fullscreen?: boolean
}

const Loading: FC<LoadingProps> = props => {
  const { fullscreen, ...rest } = props
  const theme = useTheme()
  return (
    <Box
      sx={{
        width: fullscreen ? '100%' : 60,
        height: fullscreen ? '100vh' : 60,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
        ...(fullscreen && {
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'background.paper',
          zIndex: theme.zIndex.modal + 1,
        }),
      }}
    >
      <Box
        component='img'
        sx={{
          width: 26,
          height: 'auto',
          position: 'absolute',
          transform: 'translateY(1px)',
        }}
        src='/images/logo-secondary.png'
        alt='logo'
      />
      <CircularProgress size={60} {...rest} />
    </Box>
  )
}

Loading.defaultProps = {
  fullscreen: false,
}
export { Loading }
