import { FC } from 'react'

// @mui
import Box from '@mui/material/Box'

// components
import { Iconify } from '@/components/core/iconify'
import { IconifyIcon } from '@iconify/types'
import { SxProps } from '@mui/material'

interface BoxIconProps {
  size?: 'small' | 'medium' | 'large' | 'extra-large'
  icon: IconifyIcon | string
  sx?: SxProps
}

const getSize = (size: BoxIconProps['size']): number => {
  switch (size) {
    case 'small':
      return 32
      break
    case 'medium':
      return 42
      break
    case 'large':
      return 52
      break
    case 'extra-large':
      return 62
      break
    default:
      return 54
  }
}

const BoxIcon: FC<BoxIconProps> = props => {
  const { size, icon, sx } = props
  return (
    <Box
      sx={{
        width: getSize(size),
        height: getSize(size),
        color: 'primary.main',
        backgroundColor: 'primary.light',
        borderRadius: `${getSize(size)}px`,
        ...sx,
      }}
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Iconify icon={icon} height={28} width={28} />
    </Box>
  )
}

BoxIcon.defaultProps = {
  size: 'large',
}

export { BoxIcon }
