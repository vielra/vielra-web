import React, { FC } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import createCache, { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { NextPageWithLayout } from '@/features/common/interfaces'

// Mui provider.
import { MuiThemeProvider } from '@/plugins/mui/components'

// Redux provider.
import { ReduxProvider } from '@/plugins/redux/components'

// App config
import { AppConfig } from '@/features/app/config'

// Styles
import { appWithTranslation } from 'next-i18next'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { i18n } = require('../../next-i18next.config')

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
function createEmotionCache(): EmotionCache {
  return createCache({ key: 'css', prepend: true })
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

type AppPropsWithLayout = AppProps & {
  emotionCache: EmotionCache
  Component: NextPageWithLayout<unknown>
}

const App: FC<AppPropsWithLayout> = (props: AppPropsWithLayout) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || (page => page)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <link rel='icon' type='image/png' href={AppConfig.AppFavicon} />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta name='description' content={AppConfig.AppDescription} />
        <title>{AppConfig.AppName}</title>
      </Head>
      <ReduxProvider>
        <MuiThemeProvider>
          {getLayout(<Component {...pageProps} />)}
        </MuiThemeProvider>
      </ReduxProvider>
    </CacheProvider>
  )
}

export default appWithTranslation(App)
