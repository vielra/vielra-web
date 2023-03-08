import React, { FC, useMemo } from 'react'
import { useRouter } from 'next/router'

// @mui
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { SxProps } from '@mui/material/styles'

// config
import { AppConfig } from '@/features/app/config'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'

interface DynamicLogoProps {
  onClick?: () => void
  logoSize?: number
  sx?: SxProps
}

const DynamicLogo: FC<DynamicLogoProps> = ({ onClick, logoSize, sx }) => {
  const { pathname, push, ...test } = useRouter()

  const theme = useTheme()

  const title = useMemo(() => {
    if (pathname.startsWith('/phrasebook')) {
      return 'Phrasebook'
    }
    // Add another condition
    else {
      return AppConfig.AppName
    }
  }, [pathname])

  const onClickLogo = (): void => {
    if (onClick) {
      onClick()
    } else {
      push('/')
    }
  }

  return (
    <Stack
      onClick={onClickLogo}
      direction='row'
      spacing={2}
      alignItems='center'
      sx={{
        px: 1.2,
        py: 0.8,
        lineHeight: 0,
        borderRadius: 1,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        ...sx,
      }}
    >
      <Box
        component='img'
        src={AppConfig.AppLogo}
        alt={'logo ' + AppConfig.AppName}
        sx={{ width: logoSize, height: 'auto' }}
      />
      <Typography variant='h5' component='h2'>
        {title}
      </Typography>
    </Stack>
  )
}

DynamicLogo.defaultProps = {
  sx: {},
  logoSize: 26,
}

export { DynamicLogo }
