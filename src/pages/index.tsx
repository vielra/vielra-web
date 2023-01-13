import { DefaultLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/features/common/interfaces'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Home: NextPageWithLayout<unknown> = () => {
  return (
    <Box sx={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box>
        <Typography variant="h3">Hello 🙂</Typography>
      </Box>
    </Box>
  )
}

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default Home
