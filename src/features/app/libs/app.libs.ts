import { AppLocale } from '@/features/app/interfaces'
import { IDropdown } from '@/features/common/interfaces'

// utils
import { AppUtils } from '@/features/app/utils'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('../../../../next-i18next.config')



const dropdownAppLocales: IDropdown<string>[] = i18n.locales.map(
  (l: string) => ({
    label: AppUtils.getLanguageName(l),
    value: l,
  })
)

export const AppLibs = {
  dropdownAppLocales,
}
