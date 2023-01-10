import { FC } from 'react'

// Next
import Image from 'next/image'

// Mui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// Constants
import { APP_NAME } from '@/features/app/constants'

const AuthHeader: FC = () => {
  return (
    <Box sx={{ height: 70, display: 'flex', alignItems: 'center', }}>
      <Box sx={{}}>
        <Box
          component="img"
          src="/images/logo-secondary-vertical-lookup.png"
          alt="logo"
          sx={{
            height: 20,
            width: 'auto',
          }}
        />
      </Box>
    </Box>
  )
}

export { AuthHeader }
