/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useAppSelector } from '@/plugins/redux'

import * as phrasebook_thunkActions from '@/features/phrasebook/redux/phrasebook.thunk'

import {
  phrasebook_select,
  phrasebookReducerActions,
} from '@/features/phrasebook/redux'

const usePhrasebook = () => {
  const states = useAppSelector(phrasebook_select)

  return {
    // States.
    ...states,

    //  Async thunk
    ...phrasebook_thunkActions,

    // reducer actions
    ...phrasebookReducerActions,
  }
}

export { usePhrasebook }
