import { useEffect } from 'react'

import { useRouter } from 'next/router'

// @mui
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// components
import { Loading } from '@/components/shared/loading'

// guard
import { GuestGuard } from '@/components/guards'

// interfaces
import { NextPageWithLayout } from '@/features/common/interfaces'

// hooks
import { useAppDispatch } from '@/plugins/redux'
import { useAuth } from '@/features/auth/hook'
import { SocialAuthProvider } from '@/features/auth/interfaces'

const ExternalAuthCallback: NextPageWithLayout<unknown> = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    auth_loginWithSocialAccount,
    auth_socialLoginIsLoading,
    auth_socialLoginIsFailure,
    auth_resetSocialLoginState,
  } = useAuth()

  useEffect(() => {
    if (router.query?.code) {
      dispatch(
        auth_loginWithSocialAccount({
          provider: router.query.provider as SocialAuthProvider,
          params: router.query as Record<string, string | number>,
        })
      )
    }
  }, [router.query.provider])

  useEffect(() => {
    if (auth_socialLoginIsFailure) {
      router.replace('/')
    }
    return () => {
      dispatch(auth_resetSocialLoginState())
    }
  }, [auth_socialLoginIsFailure])

  return (
    <GuestGuard>
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {auth_socialLoginIsFailure && (
          <Typography>Authentication failed!</Typography>
        )}
        {auth_socialLoginIsLoading && <Loading />}
      </Box>
    </GuestGuard>
  )
}

export default ExternalAuthCallback
