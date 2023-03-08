import { FC } from 'react'

// Next
import Image from 'next/image'

// Mui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AppConfig } from '@/features/app/config'

const AppAuthHeader: FC = () => {
  return (
    <Box sx={{ height: 70, display: 'flex', alignItems: 'center' }}>
      <Box sx={{}}>
        <Box
          component='img'
          src={AppConfig.AppLogoFull}
          alt='logo'
          sx={{
            height: 20,
            width: 'auto',
          }}
        />
      </Box>
    </Box>
  )
}

export { AppAuthHeader }
