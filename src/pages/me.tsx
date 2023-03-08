import { DefaultLayout } from '@/features/app/components/layouts'
import { useAuth } from '@/features/auth/hook'
import { NextPageWithLayout } from '@/features/common/interfaces'

// Mui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/plugins/redux'
import { AuthGuard } from '@/components/guards'

const MyAccountPage: NextPageWithLayout<unknown> = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const { isAuthenticated, user, auth_logout } = useAuth()

  const onClickLogout = (): void => {
    dispatch(auth_logout())
  }

  return (
    <AuthGuard>
      {user && (
        <Box sx={{ width: '100%' }}>
          <Typography>{user.name}</Typography>
          <Typography>{user.email}</Typography>
          <Button onClick={onClickLogout}>Logout</Button>
        </Box>
      )}
    </AuthGuard>
  )
}

MyAccountPage.getLayout = page => <DefaultLayout>{page}</DefaultLayout>

export default MyAccountPage
