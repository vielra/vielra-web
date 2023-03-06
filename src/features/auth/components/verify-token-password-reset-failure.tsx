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
import { BoxIcon } from '@/components/core'

const VerifyTokenPasswordResetFailure: FC = () => {
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
          sm: 500,
        },
      }}
    >
      <BoxIcon icon='ion:sad-outline' size='extra-large' />
      <Box>
        <Typography variant='h2' gutterBottom>
          Aww...
        </Typography>
        <Typography variant='h6' gutterBottom>
          Sorry, it appears that the request has expired.
        </Typography>
        <Typography variant='h6' gutterBottom>
          Maybe you already did ? Otherwise please try reset password again.
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

export { VerifyTokenPasswordResetFailure }
