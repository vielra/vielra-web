import React, { FC, ReactNode } from 'react'

// Redux & Redux Persist
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// Store
import { persistor, store } from '@/plugins/redux'

interface ReduxProviderProps {
  children: ReactNode
}

const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={'Redux Loading...'} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export { ReduxProvider }
