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

const PasswordResetSuccess: FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { auth_reset } = useAuth()

  const onNavigateToHome = (): void => {
    router.replace('/')
    dispatch(auth_reset())
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
      <BoxIcon
        icon='ion:checkmark-done-outline'
        size='extra-large'
        sx={{ color: 'success.main', backgroundColor: 'success.light' }}
      />
      <Box>
        <Typography variant='h2' gutterBottom>
          Thank you!
        </Typography>
        <Typography variant='h6'>Your password has been changed</Typography>
      </Box>
      <Button
        onClick={onNavigateToHome}
        startIcon={<Iconify icon='ion:arrow-back' height={18} width={18} />}
      >
        Click here
      </Button>
    </Stack>
  )
}

export { PasswordResetSuccess }
