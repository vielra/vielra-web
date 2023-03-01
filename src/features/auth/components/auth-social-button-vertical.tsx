import React, { FC, useCallback, useEffect, useState } from 'react'

// next
import dynamic from 'next/dynamic'

// @mui
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import MuiButton from '@mui/material/Button'

// components
import { Iconify } from '@/components/core/iconify'

// hooks
import { useRouter } from 'next/router'
import { useAuth } from '@/features/auth/hook'
import { useAppDispatch } from '@/plugins/redux'

// constants
import { APP_ROUTE_PATHS } from '@/features/app/routes'

// interfaces
import { SocialAuthProvider } from '@/features/auth/interfaces'

// api
import { authApi } from '@/features/auth/api'

const ButtonSocialLogin = dynamic(
  () =>
    import(
      '@/features/auth/components/button-social-login/button-social-login'
    ),
  { ssr: false }
)

const AuthSocialButtonVertical: FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  // hooks
  const { auth_isOpenDialogAuth, auth_setOpenDialogAuth } = useAuth()

  // states external auth url
  const [googleUrl, setGoogleUrl] = useState<string | undefined>(undefined)
  const [facebookUrl, setFacebookUrl] = useState<string | undefined>(undefined)
  const [githubUrl, setGithubUrl] = useState<string | undefined>(undefined)

  const getAuthUrl = async (
    provider: SocialAuthProvider
  ): Promise<string | undefined> => {
    try {
      const response = await authApi.getSocialAuthUrl(provider)
      if (response?.url) {
        return response.url
      } else return undefined
    } catch (_) {}
  }

  const onClickLoginExternal = useCallback(
    (provider: SocialAuthProvider) => {
      if (provider === 'google' && googleUrl) {
        window.location.href = googleUrl
      } else if (provider === 'facebook' && facebookUrl) {
        window.location.href = facebookUrl
      } else if (provider === 'github' && githubUrl) {
        window.location.href = githubUrl
      }
    },
    [googleUrl, facebookUrl, githubUrl]
  )

  const onContinueWithEmail = useCallback(() => {
    if (auth_isOpenDialogAuth) {
      dispatch(auth_setOpenDialogAuth(false))
    }
    // Navigate to signin page
    router.push(APP_ROUTE_PATHS.SignInWithParamsAppID)
  }, [auth_isOpenDialogAuth])

  useEffect(() => {
    getAuthUrl('google').then(url => setGoogleUrl(url))
    getAuthUrl('facebook').then(url => setFacebookUrl(url))
    getAuthUrl('github').then(url => setGithubUrl(url))
  }, [auth_isOpenDialogAuth])

  return (
    <Stack direction='column' spacing={2}>
      {googleUrl && (
        <ButtonSocialLogin provider='google' onClick={onClickLoginExternal}>
          Continue with Google
        </ButtonSocialLogin>
      )}
      {facebookUrl && (
        <ButtonSocialLogin provider='facebook' onClick={onClickLoginExternal}>
          Continue with Facebook
        </ButtonSocialLogin>
      )}
      {githubUrl && (
        <ButtonSocialLogin provider='github' onClick={onClickLoginExternal}>
          Continue with Github
        </ButtonSocialLogin>
      )}
      <StyledButtonEmail
        onClick={onContinueWithEmail}
        startIcon={<Iconify icon='eva:email-outline' height={20} width={20} />}
        fullWidth
      >
        Continue with Email
      </StyledButtonEmail>
    </Stack>
  )
}

const StyledButtonEmail = styled(MuiButton)(({ theme }) => ({
  fontWeight: 500,
  textTransform: 'unset',
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  fontSize: '1rem',
  borderRadius: Number(theme.shape.borderRadius) * 8,
}))

export default AuthSocialButtonVertical
