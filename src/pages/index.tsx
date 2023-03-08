import Link from 'next/link'
import { DefaultLayout } from '@/features/app/components/layouts'
import { NextPageWithLayout } from '@/features/common/interfaces'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useAuth } from '@/features/auth/hook'
import { Button } from '@/components/core'
import { Iconify } from '@/components/core/iconify'
import { APP_ROUTE_PATHS } from '@/features/app/routes'
import { useAppDispatch } from '@/plugins/redux'
import { useAppTheme } from '@/plugins/mui/hooks'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps, GetStaticPropsResult } from 'next'

// interface HomePageProps {}

const Home: NextPageWithLayout<unknown> = props => {
  const { isAuthenticated, auth_setOpenDialogAuth, auth_logout } = useAuth()
  const { appTheme_togglePaletteMode } = useAppTheme()
  const dispatch = useAppDispatch()

  const { t, i18n } = useTranslation()

  // console.log("i18n", i18n.changeLanguage('vi'))

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: ' center',
      }}
    >
      <Box>
        <Typography variant='h3'>{t('common:hello')}</Typography>

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

// prettier-ignore
export const getStaticProps: GetStaticProps = async ({locale}): Promise<GetStaticPropsResult<{[key: string]: any}>> => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

Home.getLayout = page => <DefaultLayout>{page}</DefaultLayout>

export default Home
