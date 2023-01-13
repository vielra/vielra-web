import { AuthLayout } from '@/components/layouts'
import { ResetPasswordForm } from '@/features/auth/components'
import { NextPageWithLayout } from '@/features/common/interfaces'

// Mui icons
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const ResetPassword: NextPageWithLayout<any> = () => {
  return (
    <Box sx={{ width: { xs: '100%', sm: 380 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Forgot password ?
        </Typography>
        <Typography sx={{ fontSize: '1.05rem', color: 'text.secondary' }}>
          Don’t worry it happens. Enter the email address associated with your account
        </Typography>
      </Box>
      {/* Form */}
      <ResetPasswordForm />
    </Box>
  )
}

ResetPassword.getLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default ResetPassword
