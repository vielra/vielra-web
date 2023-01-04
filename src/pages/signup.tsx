import { AuthLayout } from '@/components/layouts'
import { SignUpForm } from '@/features/auth/components'
import { NextPageWithLayout } from '@/features/common/interfaces'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const SignUpPage: NextPageWithLayout<any> = () => {
  return (
    <Box
      sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      <Typography variant="h3">Sign Up</Typography>
      <Typography>Tell us information about you to create your account</Typography>
      <SignUpForm />
    </Box>
  )
}

SignUpPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default SignUpPage
