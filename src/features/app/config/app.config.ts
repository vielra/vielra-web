import {
  IS_DEVELOPMENT,
  KEY_COOKIE_ACCESS_TOKEN_DEV,
  KEY_COOKIE_ACCESS_TOKEN_PROD,
} from '@/features/app/constants'

// prettier-ignore
export const AppConfig = {
  AppId: 'community-app-v1.0',
  AppName: !IS_DEVELOPMENT ? 'Vielra' : 'Vielra Dev',
  AppDescription: 'Speak Vietnamese with Confidence!',
  AppFavicon: !IS_DEVELOPMENT ? 'images/icons/primary/favicon-32x32.png' : 'images/icons/secondary/favicon-32x32.png',
  AppLogo: !IS_DEVELOPMENT ? 'images/logo-primary.png' : 'images/logo-secondary.png',
  AppLogoFull: !IS_DEVELOPMENT ? 'images/logo-primary-vertical-lookup.png' : 'images/logo-secondary-vertical-lookup.png',
  KeyAccessToken: !IS_DEVELOPMENT ? KEY_COOKIE_ACCESS_TOKEN_PROD: KEY_COOKIE_ACCESS_TOKEN_DEV
}
