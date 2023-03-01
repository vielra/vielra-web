import { FC, useCallback, useEffect, useState } from 'react'

// @mui
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// next
import dynamic from 'next/dynamic'

// interfaces
import { SocialAuthProvider } from '@/features/auth/interfaces'
import { authApi } from '@/features/auth/api'

const IconButtonSocialLogin = dynamic(
  () =>
    import(
      '@/features/auth/components/icon-button-social-login/icon-button-social-login'
    ),
  { ssr: false }
)

const AuthSocialButtonHorizontal: FC = () => {
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

  useEffect(() => {
    getAuthUrl('google').then(url => setGoogleUrl(url))
    getAuthUrl('facebook').then(url => setFacebookUrl(url))
    getAuthUrl('github').then(url => setGithubUrl(url))
  }, [])

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Divider
        sx={{ borderStyle: 'dashed', mx: 'auto', width: '50%', my: 1 }}
      />
      <Typography sx={{ mb: 1.2 }}>Or continue with</Typography>
      <Stack
        direction='row'
        spacing={2}
        alignItems='center'
        justifyContent='center'
      >
        <IconButtonSocialLogin
          provider='google'
          onClick={onClickLoginExternal}
        />
        <IconButtonSocialLogin
          provider='facebook'
          onClick={onClickLoginExternal}
        />
        <IconButtonSocialLogin
          provider='github'
          onClick={onClickLoginExternal}
        />
      </Stack>
    </Box>
  )
}

export default AuthSocialButtonHorizontal
