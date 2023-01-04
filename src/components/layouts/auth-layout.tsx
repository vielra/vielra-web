import { FC, ReactNode, useEffect } from 'react'

// Mui components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// Components
import { AuthHeader } from '@/components/header'
import { Footer } from '@/components/footer'

// Hooks
import { useAuth } from '@/features/auth/hook'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// import BgImage from '@/assets/images/ling-tang-rsD_jv_A8Yo-unsplash.jpg'

interface Props {
  children: ReactNode
}

const AuthLayout: FC<Props> = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace('/')
    }
  }, [isAuthenticated, router, user])

  return (
    <Box component="main" sx={{ backgroundColor: 'background.default', height: '100vh' }}>
      <Grid container spacing={0} sx={{ height: '100%' }}>
        <Grid item xs={12} lg={6} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Box
            sx={{
              backgroundImage: `url('/images/ling-tang-rsD_jv_A8Yo-unsplash.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%',
              width: '100%',
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', px: { xs: 3, sm: 5, lg: 7 } }}>
            <AuthHeader />
            {props.children}
          </Box>
          {/* <Footer /> */}
        </Grid>
      </Grid>
    </Box>
  )
}

export { AuthLayout }
