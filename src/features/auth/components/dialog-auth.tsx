import React, { FC, useEffect } from 'react'

// next
import dynamic from 'next/dynamic'
import Image from 'next/image'

// @mui
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// components
import { Link } from '@/components/core/link'
import { Dialog } from '@/components/core/dialog'

// App config.
import { AppConfig } from '@/features/app/config'

// hooks
import { useWindowSize } from 'react-use'
import { useAuth } from '@/features/auth/hook'
import { useAppDispatch } from '@/plugins/redux'

const AuthSocialButtonVertical = dynamic(
  () => import('@/features/auth/components/auth-social-button-vertical'),
  { ssr: false }
)

const DialogAuth: FC = () => {
  const dispatch = useAppDispatch()
  const windowSize = useWindowSize()

  // hooks
  const { isAuthenticated, auth_isOpenDialogAuth, auth_setOpenDialogAuth } =
    useAuth()

  const onClose = (): void => {
    dispatch(auth_setOpenDialogAuth(false))
  }

  // prevent open dialog when user authenticated
  useEffect(() => {
    if (isAuthenticated) onClose()
  }, [isAuthenticated, auth_isOpenDialogAuth])

  return (
    <Dialog
      open={auth_isOpenDialogAuth}
      maxWidth='md'
      fullWidth
      onClose={onClose}
      paperStyles={{
        width: {
          xs: '100%',
        },
        height: {
          xs: '100vh',
          md: windowSize ? windowSize.height - 100 : '90vh',
        },
      }}
    >
      <Box
        alignItems='center'
        justifyContent='center'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          width: { xs: '90%', sm: 360 },
          height: '100%',
          margin: '0 auto',
        }}
      >
        <Box
          sx={{ mb: 3 }}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Image src={'/' + AppConfig.AppLogo} height={65} width={65} />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant='h2' gutterBottom>
            Welcome to {AppConfig.AppName}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
            {AppConfig.AppDescription}
          </Typography>
        </Box>

        <Box sx={{ mb: 4, width: '100%' }}>
          <AuthSocialButtonVertical />
        </Box>

        <Box>
          <Typography component='span' sx={{ mb: 0 }}>
            By continuing, you accept our
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'pre-wrap',
            }}
          >
            <Link href='/'>Terms and Conditions</Link>
            <Typography component='span' sx={{ mb: 0 }}>
              {' '}
              and{' '}
            </Typography>
            <Link href='/'>Privacy Policy.</Link>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default DialogAuth
