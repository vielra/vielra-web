import { AppConfig } from '../config'

export const APP_ROUTE_PATHS = {
  Index: '/',
  MyAccount: '/me',
  SignIn: '/sign-in',
  SignInWithParamsAppID: `/sign-in?app_id=${AppConfig.AppId}`,
  SignUp: '/sign-up',
  SignUpWithParamsAppID: `/sign-up?app_id=${AppConfig.AppId}`,
  PasswordRecovery: '/password-recovery',
  PasswordRecoveryWithParamsAppID: `/password-recovery?app_id=${AppConfig.AppId}`,
  Phrasebook: '/phrasebook',
  PhrasebookPhraseList: '/phrasebook/list',
}
