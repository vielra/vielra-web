import { FC } from 'react'

// Mui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const AppFooter: FC = () => {
  return (
    <Box
      sx={{
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography>AppFooter</Typography>
    </Box>
  )
}

export { AppFooter }
