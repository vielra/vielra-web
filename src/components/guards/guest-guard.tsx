import { FC, ReactNode, useEffect } from 'react'

// next
import { useRouter } from 'next/router'

// hooks
import { useAuth } from '@/features/auth/hook'

// route paths constants
import { APP_ROUTE_PATHS } from '@/features/app/routes'

interface GuestGuardProps {
  children: ReactNode
}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const { push } = useRouter()

  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      console.log('isAuthenticated', isAuthenticated)
      push(APP_ROUTE_PATHS.Index)
    }
  }, [isAuthenticated, push])

  return <>{children}</>
}

export { GuestGuard }
