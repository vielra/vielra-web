import React, { FC } from 'react'
import Image from 'next/image'

// @mui
import Box from '@mui/material/Box'
import { SxProps } from '@mui/material/styles'

// config
import { AppConfig } from '@/features/app/config'

interface LogoProps {
  onClick?: () => void
  sx?: SxProps
}

const Logo: FC<LogoProps> = ({ onClick, sx }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 100,
        height: 'auto',
        lineHeight: 0,
        ...sx,
      }}
    >
      <Box
        component='img'
        src={AppConfig.AppLogoFull}
        alt={'Logo ' + AppConfig.AppName}
        sx={{ width: '100%', height: 'auto' }}
      />
    </Box>
  )
}

Logo.defaultProps = {
  sx: {},
}

export { Logo }
