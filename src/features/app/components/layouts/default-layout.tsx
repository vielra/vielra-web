import { FC, ReactNode, useEffect } from 'react'

// @mui
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

// Components
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { DialogUserLoggedOut } from '@/features/auth/components'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useApp } from '@/features/app/hooks'
import { useAppDispatch } from '@/plugins/redux'

import { AppHeader, AppFooter } from '@/features/app/components'
import { AppUIConfig } from '@/features/app/config'

const DialogAuth = dynamic(
  () => import('@/features/auth/components/dialog-auth'),
  { ssr: false }
)

interface Props {
  children: ReactNode
}

const DefaultLayout: FC<Props> = props => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { persistApp_setLocale, locale } = useApp()

  // Set locale to persistApp state
  useEffect(() => {
    if (router.locale !== locale) {
      dispatch(persistApp_setLocale(router.locale))
    }
  }, [router.locale])

  return (
    <Box component='main'>
      <AppHeader />
      <Box sx={{ paddingTop: `${AppUIConfig.HeaderHeight}px` }}>
        {/* Its a just spacer */}
        <Box sx={{ height: 20, backgroundColor: 'background.paper' }} />
        {props.children}
      </Box>
      <AppFooter />
      <DialogAuth />
      <DialogUserLoggedOut />
    </Box>
  )
}

export { DefaultLayout }
