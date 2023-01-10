import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { NextPageWithLayout } from '@/features/common/interfaces'

const PageNotFound: NextPageWithLayout<any> = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4">Awww..</Typography>
      <Typography gutterBottom sx={{ fontSize: '1.1rem', color: 'text.secondary' }}>
        {/* eslint-disable-next-line react/no-unescaped-entities  */}
        don't cry! it's a just a 404 error!
      </Typography>
    </Box>
  )
}

PageNotFound.getLayout = (page) => <>{page}</>

export default PageNotFound
