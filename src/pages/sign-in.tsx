import React from 'react'
import { GuestGuard } from '@/components/guards'
import { AuthLayout } from '@/components/layouts'
import { SignInForm } from '@/features/auth/components'
import { NextPageWithLayout } from '@/features/common/interfaces'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { AppConfig } from '@/features/app/config'
import { DialogLoginFailure } from '@/features/auth/components/dialog-login-failure'

const SignInPage: NextPageWithLayout<unknown> = () => {
  return (
    <GuestGuard>
      <DialogLoginFailure />
      <Box sx={{ width: { xs: '100%', sm: 380 } }}>
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Box
            sx={{ mb: 2 }}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Image src={AppConfig.AppLogo} height={42} width={42} />
          </Box>
          <Typography variant='h3' sx={{ lineHeight: 1.45 }}>
            Welcome back 👋
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
            Learn and contribute Vietnamese with community
          </Typography>
        </Box>
        <SignInForm />
      </Box>
    </GuestGuard>
  )
}

SignInPage.getLayout = page => <AuthLayout>{page}</AuthLayout>

export default SignInPage
