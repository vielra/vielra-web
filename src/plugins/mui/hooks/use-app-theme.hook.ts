import { useAppSelector } from '@/plugins/redux/hook'

import { appTheme_selectState, appTheme_actions } from '@/plugins/mui/redux'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAppTheme = () => {
  const state = useAppSelector(appTheme_selectState)

  return {
    ...state,
    ...appTheme_actions,
  }
}

export { useAppTheme }
