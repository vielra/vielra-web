import { AuthLayout } from '@/components/layouts'
import {
  DialogPasswordRecoveryFailure,
  PasswordRecoveryForm,
  PasswordRecoverySuccess,
} from '@/features/auth/components'
import { NextPageWithLayout } from '@/features/common/interfaces'

// guard
import { GuestGuard } from '@/components/guards'

// Mui icons
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// hooks
import { useAuth } from '@/features/auth/hook'

// components
import { Link } from '@/components/core/link'
import { BoxIcon } from '@/components/core/box-icon'

const PasswordRecovery: NextPageWithLayout<unknown> = () => {
  const { auth_hasSendRecoveryLink } = useAuth()

  return (
    <GuestGuard>
      <DialogPasswordRecoveryFailure />
      {auth_hasSendRecoveryLink ? (
        <PasswordRecoverySuccess />
      ) : (
        <Box sx={{ width: { xs: '100%', sm: 380 } }}>
          <Stack direction='column' spacing={2} sx={{ mb: 2 }}>
            <BoxIcon icon='eva:lock-outline' size='extra-large' />
            <Box>
              <Typography variant='h3' gutterBottom>
                Forgot Password ?{' '}
              </Typography>
              <Typography component='span' variant='h3' color='text.disabled'>
                Don’t worry it happens.
              </Typography>
            </Box>
            <Typography sx={{ color: 'text.secondary' }}>
              Enter the email address associated with your account. We’ll send
              you an email with a link to reset your password.
            </Typography>
          </Stack>
          <PasswordRecoveryForm />
          <Box sx={{ mt: 'auto' }}>
            <Typography
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              <Typography component='span'>
                If you still need help, please contact{' '}
              </Typography>

              <Link underline='hover' href='/'>
                Vielra Support
              </Link>
            </Typography>
          </Box>
        </Box>
      )}
    </GuestGuard>
  )
}

PasswordRecovery.getLayout = page => <AuthLayout>{page}</AuthLayout>

export default PasswordRecovery
