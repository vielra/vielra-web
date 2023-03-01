import { FC } from 'react'

// Mui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Header: FC = () => {
  return (
    <Box
      sx={{
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography>Header</Typography>
    </Box>
  )
}

export { Header }
