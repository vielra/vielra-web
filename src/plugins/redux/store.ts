import {
  configureStore,
  ThunkAction,
  Action,
  createListenerMiddleware,
} from '@reduxjs/toolkit'

// Redux Persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Reducers
import { rootReducer } from './reducers'
import { appThemeSlice } from '@/plugins/mui/redux'
import { persistAuthSlice } from '@/features/auth/redux'
import { persistAppSlice } from '@/features/app/redux'

// Config for Redux Persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [persistAuthSlice.name, appThemeSlice.name, persistAppSlice.name],
}

// Listener Middleware
export const listenerMiddleware = createListenerMiddleware()

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(listenerMiddleware.middleware),
  devTools: true,
})

// Interfaces
export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>

const persistor = persistStore(store)

export { store, persistor }
