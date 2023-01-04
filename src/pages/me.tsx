import { DefaultLayout } from '@/components/layouts'
import { useAuth } from '@/features/auth/hook'
import { NextPageWithLayout } from '@/features/common/interfaces'

// Mui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const MyAccountPage: NextPageWithLayout<any> = () => {
  const router = useRouter()

  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.replace('/')
    }
  }, [isAuthenticated, router, user])

  return (
    <Box sx={{ width: '100%' }}>
      <Typography>{user.name}</Typography>
      <Typography>{user.email}</Typography>
    </Box>
  )
}

MyAccountPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default MyAccountPage
