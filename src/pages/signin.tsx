import { AuthLayout } from '@/components/layouts'
import { SignInForm } from '@/features/auth/components'
import { NextPageWithLayout } from '@/features/common/interfaces'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const SignInPage: NextPageWithLayout<any> = () => {
  return (
    <Box
      sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      <Typography variant="h3">Sign In</Typography>
      {/* <Typography></Typography> */}
      <SignInForm />
    </Box>
  )
}

SignInPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default SignInPage
