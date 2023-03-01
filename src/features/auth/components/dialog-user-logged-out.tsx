import React, { FC, useEffect, useState } from 'react'

import Image from 'next/image'

// @mui
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// components
import { Dialog } from '@/components/core/dialog'
import { Iconify } from '@/components/core/iconify'
import { AppConfig } from '@/features/app/config'
import { useAuth } from '@/features/auth/hook'
import { useAppDispatch } from '@/plugins/redux'
import { useRouter } from 'next/router'
import { APP_ROUTE_PATHS } from '@/features/app/routes'

import { Button } from '@/components/core/button'

const DialogUserLoggedOut: FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  // hooks
  const {
    isAuthenticated,
    auth_isLoggedOut,
    auth_loggedOutUser,
    auth_resetUserLoggedOut,
  } = useAuth()

  const onClose = (): void => {
    dispatch(auth_resetUserLoggedOut())
  }

  const onClickLogin = (): void => {
    onClose()
    router.push(APP_ROUTE_PATHS.SignInWithParamsAppID)
  }

  // prevent open dialog when user authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(auth_resetUserLoggedOut())
    }
  }, [isAuthenticated])

  return (
    <Dialog
      open={auth_isLoggedOut || Boolean(auth_loggedOutUser)}
      fullScreen
      onClose={onClose}
      paperStyles={{}}
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
          {auth_loggedOutUser && auth_loggedOutUser.photo_url ? (
            <Box
              component='img'
              src={auth_loggedOutUser.photo_url}
              sx={{ height: 50, width: 'auto' }}
            />
          ) : (
            <Image src={'/' + AppConfig.AppLogo} height={50} width={50} />
          )}
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography sx={{ mb: 0, color: 'text.secondary' }}>
            See you
          </Typography>
          <Typography variant='h5' sx={{ fontWeight: 500 }}>
            {auth_loggedOutUser ? auth_loggedOutUser.name : ''}
          </Typography>
        </Box>

        <Box sx={{ mb: 4, width: '100%' }}>
          <Button
            size='medium'
            variant='outlined'
            onClick={onClickLogin}
            endIcon={
              <Iconify icon='ion:arrow-forward-sharp' height={20} width={20} />
            }
            fullWidth
          >
            Login back
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}

export { DialogUserLoggedOut }
