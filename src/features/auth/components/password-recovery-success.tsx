import { FC } from 'react'

// @mui
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// components
import { Iconify } from '@/components/core/iconify'
import { Button } from '@/components/core/button'

// hooks
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/plugins/redux'
import { useAuth } from '@/features/auth/hook'

const PasswordRecoverySuccess: FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { auth_resetPasswordRecoveryState } = useAuth()

  const onNavigateToHome = (): void => {
    dispatch(auth_resetPasswordRecoveryState())
    router.replace('/')
  }

  return (
    <Stack
      spacing={3}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        textAlign: 'center',
        mx: 'auto',
        width: {
          xs: '90%',
          sm: 372,
        },
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          backgroundColor: 'primary.light',
          color: 'primary.main',
          borderRadius: '52px',
        }}
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Iconify icon='ion:mail-unread-outline' height={28} width={28} />
      </Box>
      <Box>
        <Typography variant='h3' gutterBottom>
          Check your email
        </Typography>
        <Typography>
          We’ve sent you a password recover link to your email. Just follow the
          instructions to reset your password.
        </Typography>
      </Box>

      <Button
        onClick={onNavigateToHome}
        startIcon={<Iconify icon='ion:arrow-back' height={18} width={18} />}
      >
        Back to homepage
      </Button>
    </Stack>
  )
}

export { PasswordRecoverySuccess }
