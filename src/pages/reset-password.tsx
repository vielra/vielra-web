import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'

import { AuthLayout } from '@/components/layouts'
import {
  PasswordResetSuccess,
  PasswordResetForm,
  VerifyTokenPasswordResetFailure,
} from '@/features/auth/components'
import { NextPageWithLayout } from '@/features/common/interfaces'

// guard
// import { GuestGuard } from '@/components/guards'

// Mui icons
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// hooks
import { useAuth } from '@/features/auth/hook'
// import { useAppDispatch } from '@/plugins/redux'

// components
import { Iconify } from '@/components/core'
import { Link } from '@/components/core/link'
import { Loading } from '@/components/shared/loading'
import { UserAvatar } from '@/features/user/components'

// interfaces
import { IUser } from '@/features/user/interfaces'
import { IRequestVerifyTokenPasswordReset } from '@/features/auth/interfaces'

// api
import { authApi } from '@/features/auth/api'

const PasswordResetPage: NextPageWithLayout<unknown> = () => {
  const router = useRouter()

  const { auth_resetPasswordSuccess } = useAuth()
  const [isInvalidToken, setIsInvalidToken] = useState<null | boolean>(null) // default is null;
  const [user, setUser] = useState<IUser | null>(null)

  /**
   * Verify link before display form reset password
   * @param body
   */
  const verifyTokenPasswordReset = async (
    body: IRequestVerifyTokenPasswordReset
  ): Promise<void> => {
    try {
      const response = await authApi.verifyTokenPasswordReset(body)
      if (response) {
        setIsInvalidToken(false)
        setUser(response)
      }
    } catch (_) {
      setIsInvalidToken(true)
      setUser(null)
    }
  }

  useEffect(() => {
    if (router.query?.token && router.query?.email) {
      verifyTokenPasswordReset({
        token: router.query.token as string,
        email: router.query.email as string,
      })
    }
  }, [router.query])

  if (isInvalidToken === true) {
    return (
      <Box>
        <VerifyTokenPasswordResetFailure />
      </Box>
    )
  }

  // WARNING!!
  // DON'T WRAP THIS COMPONENT with GuestGuard
  return (
    <>
      {auth_resetPasswordSuccess ? (
        <PasswordResetSuccess />
      ) : (
        <Box sx={{ width: { xs: '100%', sm: 400 } }}>
          {isInvalidToken === null && !user ? (
            <Loading />
          ) : (
            <>
              <Box
                sx={{
                  mb: 2,
                  textAlign: 'center',
                }}
              >
                {user && (
                  <Stack direction='column' spacing={2} sx={{ mb: 3 }}>
                    <UserAvatar
                      user={user}
                      sx={{ height: 80, width: 80, boxShadow: 2, mx: 'auto' }}
                    />
                    <Box>
                      <Typography variant='h3'>Create New Password</Typography>
                      <Typography
                        sx={{ color: 'text.secondary', fontSize: '1rem' }}
                      >
                        Enter a new password below to change your password
                      </Typography>
                    </Box>
                  </Stack>
                )}

                {/* Form */}
                {user && router.query.token && (
                  <PasswordResetForm
                    token={router.query.token as string}
                    email={user.email}
                  />
                )}
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  <Iconify
                    icon='ion:help-circle-outline'
                    height={18}
                    width={18}
                  />{' '}
                  <Typography component='span'>
                    If you still need help, please contact{' '}
                  </Typography>
                  <Link underline='hover' href='/'>
                    Vielra Support
                  </Link>
                </Typography>
              </Box>
            </>
          )}
        </Box>
      )}
    </>
  )
}

PasswordResetPage.getLayout = page => <AuthLayout>{page}</AuthLayout>

export default PasswordResetPage
