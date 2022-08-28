import { Box, Button, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Link from 'next/Link'

const Home: NextPage = () => {
  return (
    <Box sx={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box>
        <Typography>Hello World</Typography>
      </Box>
    </Box>
  )
}

export default Home
