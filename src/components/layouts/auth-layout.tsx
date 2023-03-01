import { FC, ReactNode } from 'react'

// Mui components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// Components
import { AuthHeader } from '@/components/header'
// import { Footer } from '@/components/footer'

// Hooks
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const DialogAuth = dynamic(
  () => import('@/features/auth/components/dialog-auth'),
  { ssr: false }
)

interface Props {
  children: ReactNode
}

const AuthLayout: FC<Props> = props => {
  const router = useRouter()

  return (
    <Box
      component='main'
      sx={{ backgroundColor: 'background.default', height: '100vh' }}
    >
      <Grid container spacing={0} sx={{ height: '100%' }}>
        <Grid item xs={12} lg={6} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Box
            sx={{
              background: '#333',
              backgroundImage: `url('images/macos-colorful-waves-3c.jpeg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%',
              width: '100%',
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              height: '100%',
              px: { xs: 3, sm: 5, lg: 7 },
            }}
          >
            <AuthHeader />
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {props.children}
            </Box>
            {/* Spacing */}
            <Box sx={{ height: 70 }} />
          </Box>
          {/* <Footer /> */}
        </Grid>
      </Grid>
      <DialogAuth />
    </Box>
  )
}

export { AuthLayout }
