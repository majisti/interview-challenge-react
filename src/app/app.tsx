import React, { FC, StrictMode } from 'react'
import { Spells } from '../screens'
import { Provider, Store } from '../modules'

export const App: FC<{ store: Store }> = ({ store }) => (
  <StrictMode>
    <Provider store={store}>
      <Spells />
    </Provider>
  </StrictMode>
)
