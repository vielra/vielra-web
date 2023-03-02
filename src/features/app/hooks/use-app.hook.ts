/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAppSelector } from '@/plugins/redux'

// auth slice
import { persistApp_actions } from '@/features/app/redux/persist-app.slice'

import { persistApp_selectState } from '@/features/app/redux'

const useApp = () => {
  const states = useAppSelector(persistApp_selectState)

  return {
    ...states,
    ...persistApp_actions,
  }
}

export { useApp }
