import { AuthLayout } from '@/components/layouts'
import { SignUpForm } from '@/features/auth/components'
import { NextPageWithLayout } from '@/features/common/interfaces'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const SignUpPage: NextPageWithLayout<any> = () => {
  return (
    <Box sx={{ width: { xs: '100%', sm: 380 } }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3" sx={{ lineHeight: 1.45 }}>
          Create Account
        </Typography>
        <Typography sx={{ fontSize: '1.05rem', color: 'text.secondary' }}>
          Create your Vielra account and join with other people
        </Typography>
        <Typography sx={{ fontSize: '1.05rem', color: 'text.secondary' }}></Typography>
      </Box>
      <SignUpForm />
    </Box>
  )
}

SignUpPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default SignUpPage
