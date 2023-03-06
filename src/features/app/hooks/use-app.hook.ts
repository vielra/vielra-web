/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAppSelector } from '@/plugins/redux'

// auth slice
import { persistApp_actions } from '@/features/app/redux/persist-app.slice'

import { persistApp_selectState } from '@/features/app/redux'

const useApp = () => {
  const states = useAppSelector(persistApp_selectState)

  // aliases
  const { persistApp_locale: locale, persistApp_locales: locales } = states

  return {
    locale,
    locales,
    ...states,

    ...persistApp_actions,
  }
}

export { useApp }
