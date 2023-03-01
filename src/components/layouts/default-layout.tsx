import { FC, ReactNode } from 'react'

// @mui
import Box from '@mui/material/Box'

// Components
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { DialogUserLoggedOut } from '@/features/auth/components'
import dynamic from 'next/dynamic'

const DialogAuth = dynamic(
  () => import('@/features/auth/components/dialog-auth'),
  { ssr: false }
)

interface Props {
  children: ReactNode
}

const DefaultLayout: FC<Props> = props => {
  return (
    <Box component='main'>
      <Header />
      {props.children}
      <Footer />
      <DialogAuth />
      <DialogUserLoggedOut />
    </Box>
  )
}

export { DefaultLayout }
