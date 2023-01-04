import { FC, ReactNode } from 'react'
import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'

// Components
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
// import { Dialog } from '@/components/core/dialog'

interface Props {
  children: ReactNode
}

const DefaultLayout: FC<Props> = (props) => {
  return (
    <main>
      <Header />
      {props.children}
      <Footer />
    </main>
  )
}

export { DefaultLayout }
