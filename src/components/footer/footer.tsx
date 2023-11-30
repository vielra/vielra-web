import { FC } from 'react'

// Mui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Footer: FC = () => {
  return (
    <Box
      sx={{
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography>Footer</Typography>
    </Box>
  )
}

export { Footer }
