// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('../../../../next-i18next.config')

export const getLanguageName = (locale: string): string => {
  switch (locale) {
    case 'en':
      return 'English'
    case 'vi':
      return 'Tiếng Việt'
    case 'id':
      return 'Bahasa'
    default:
      return i18n.defaultLocale
  }
}

export const getFlagIcon = (lang: string): string => {
  if (lang === 'vi') {
    return 'emojione:flag-for-vietnam'
  } else if (lang === 'id') {
    return 'emojione:flag-for-indonesia'
  } else {
    return 'emojione:flag-for-united-kingdom'
  }
}
