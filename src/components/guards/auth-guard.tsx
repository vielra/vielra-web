import { useState, useEffect, ReactNode, FC } from 'react'

// next
import { useRouter } from 'next/router'

// hooks
import { useAuth } from '@/features/auth/hook'

// route paths constants
import { APP_ROUTE_PATHS } from '@/features/app/routes'

interface AuthGuardProps {
  children: ReactNode
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()

  const { pathname, push } = useRouter()

  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  )

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null)
      push(requestedLocation)
    }
  }, [pathname, push, requestedLocation])

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname)
    }
    push(APP_ROUTE_PATHS.SignIn)
  }

  return <>{children}</>
}

export { AuthGuard }
