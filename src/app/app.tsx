import React, { FC, StrictMode } from 'react'
import { Spells } from '../screens'
import { Provider, Store } from '../modules'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import background from '../assets/img/background.jpeg'

const theme = extendTheme({
  styles: {
    global: {
      html: {
        backgroundImage: background,
      },
      body: {
        backgroundColor: 'transparent',
      }
    },
  },
})

export const App: FC<{ store: Store }> = ({ store }) => (
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Spells />
      </ChakraProvider>
    </Provider>
  </StrictMode>
)
