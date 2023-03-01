import { FC } from 'react'

// @mui
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// components
import { Iconify } from '@/components/core/iconify'
import { Button } from '@/components/core/button'
import { Dialog } from '@/components/core/dialog'

// hooks
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/plugins/redux'
import { useAuth } from '@/features/auth/hook'

const DialogPasswordRecoveryFailure: FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { auth_recoveryIsFailure, auth_resetPasswordRecoveryState } = useAuth()

  const onTryAgain = (): void => {
    dispatch(auth_resetPasswordRecoveryState())
  }

  return (
    <Dialog
      open={auth_recoveryIsFailure}
      maxWidth='sm'
      fullWidth
      onClose={onTryAgain}
    >
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
            backgroundColor: 'error.light',
            color: 'error.main',
            borderRadius: '52px',
          }}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Iconify icon='fluent:emoji-sad-24-regular' height={28} width={28} />
        </Box>
        <Box>
          <Typography variant='h3' gutterBottom>
            Opss..
          </Typography>
          <Typography sx={{ fontSize: '1rem' }}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            We couldn't find the account associated with the email you entered
          </Typography>
        </Box>

        <Button
          onClick={onTryAgain}
          size='large'
          endIcon={
            <Iconify icon='eva:refresh-outline' height={18} width={18} />
          }
        >
          Try again
        </Button>
      </Stack>
    </Dialog>
  )
}

export { DialogPasswordRecoveryFailure }
