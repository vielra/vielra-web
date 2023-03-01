import { DefaultLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/features/common/interfaces'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useAuth } from '@/features/auth/hook'
import { Button } from '@/components/core'
import { Iconify } from '@/components/core/iconify'
import Link from 'next/link'
import { APP_ROUTE_PATHS } from '@/features/app/routes'
import { useAppDispatch } from '@/plugins/redux'
import { useAppTheme } from '@/plugins/mui/hooks'

const Home: NextPageWithLayout<unknown> = () => {
  const { isAuthenticated, auth_setOpenDialogAuth, auth_logout } = useAuth()
  const { appTheme_togglePaletteMode } = useAppTheme()
  const dispatch = useAppDispatch()

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box>
        <Typography variant='h3'>Hello 🙂</Typography>

        <Button onClick={() => dispatch(auth_setOpenDialogAuth(true))}>
          Open dialog auth
        </Button>

        <Button onClick={() => dispatch(appTheme_togglePaletteMode())}>
          Toggle palette mode
        </Button>

        {!isAuthenticated ? (
          <Link href={APP_ROUTE_PATHS.SignInWithParamsAppID} passHref>
            <Button
              endIcon={
                <Iconify icon='ion:enter-outline' height={18} width={18} />
              }
              size='large'
              type='submit'
              variant='contained'
              disableElevation
            >
              Sign In
            </Button>
          </Link>
        ) : (
          <Button
            onClick={() => dispatch(auth_logout())}
            endIcon={
              <Iconify icon='ion:enter-outline' height={18} width={18} />
            }
            size='large'
            type='submit'
            variant='contained'
            disableElevation
          >
            Revoke auth token
          </Button>
        )}
      </Box>
    </Box>
  )
}

Home.getLayout = page => <DefaultLayout>{page}</DefaultLayout>

export default Home
