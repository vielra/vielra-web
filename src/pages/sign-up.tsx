import { AuthLayout } from '@/components/layouts'
import { SignUpForm } from '@/features/auth/components'
import { NextPageWithLayout } from '@/features/common/interfaces'
import { GuestGuard } from '@/components/guards'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { AppConfig } from '@/features/app/config'
import React from 'react'

const SignUpPage: NextPageWithLayout<unknown> = () => {
  return (
    <GuestGuard>
      <Box sx={{ width: { xs: '100%', sm: 380 } }}>
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Box
            sx={{ mb: 2 }}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Image src={'/' + AppConfig.AppLogo} height={42} width={42} />
          </Box>
          <Typography variant='h3' sx={{ lineHeight: 1.45 }}>
            Create Account
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Create your Vielra account and join with other people
          </Typography>
        </Box>
        <SignUpForm />
      </Box>
    </GuestGuard>
  )
}

SignUpPage.getLayout = page => <AuthLayout>{page}</AuthLayout>

export default SignUpPage
