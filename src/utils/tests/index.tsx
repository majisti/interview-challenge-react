import { Store } from '../../modules'
import { render, RenderOptions } from '@testing-library/react'
import { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'

export const renderWithReduxProvider = (store: Store, component: ReactElement, options?: RenderOptions) => {
  const Wrapper: FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  )

  return render(component, { wrapper: Wrapper, ...options })
}
