import { AuthLayout } from '@/components/layouts'
import { SignInForm } from '@/features/auth/components'
import { NextPageWithLayout } from '@/features/common/interfaces'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


const SignInPage: NextPageWithLayout<unknown> = () => {
  return (
    <Box sx={{ width: { xs: '100%', sm: 380 } }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h3' sx={{ lineHeight: 1.45 }}>
          Welcome back 👋
        </Typography>
        <Typography sx={{ fontSize: '1.05rem', color: 'text.secondary' }}>
          Enter your details to access your account
        </Typography>
      </Box>
      <SignInForm />
    </Box>
  )
}

SignInPage.getLayout = page => <AuthLayout>{page}</AuthLayout>

export default SignInPage
