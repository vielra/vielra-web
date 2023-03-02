import { AppLocale } from '@/features/app/interfaces'
import { IDropdown } from '@/features/common/interfaces'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('../../../../next-i18next.config')

const getLanguageName = (locale: string): string => {
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

const dropdownAppLocales: IDropdown<string>[] = i18n.locales.map((l: string) => ({
  label: getLanguageName(l),
  value: l,
}))

export const AppLibs = {
  dropdownAppLocales,
}
