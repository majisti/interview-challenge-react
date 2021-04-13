import { FC } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import * as routing from './routing'
import * as filters from './filters'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger({
  collapsed: (getState, action, logEntry) => !!(logEntry && !logEntry.error),
})

export const initStore = () => {
  const middleware = [...getDefaultMiddleware()]

  if (process.env.NODE_ENV !== 'test') {
    middleware.push(loggerMiddleware)
  }

  return configureStore({
    reducer: {
      [routing.name]: routing.reducer,
      [filters.name]: filters.reducer,
    },
    middleware,
    devTools: true,
  })
}

export type Store = ReturnType<typeof initStore>
export type AppDispatch = ReturnType<typeof initStore>['dispatch']
export type RootState = ReturnType<ReturnType<typeof initStore>['getState']>

export const Provider: FC<{ store: Store }> = ({ children, store }) => (
  <ReduxProvider store={store}>
    {children}
  </ReduxProvider>
)
