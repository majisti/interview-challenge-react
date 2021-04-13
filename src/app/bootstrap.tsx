import { render } from 'react-dom'
import { App } from './app'
import { initStore } from '../modules'

interface BootstrapOptions {
  rootElement: string
}

const defaultOptions: BootstrapOptions = {
  rootElement: 'root',
}

export const bootstrap = (options?: BootstrapOptions) => {
  const { rootElement } = { ...defaultOptions, ...options }
  const store = initStore()

  render(<App store={store} />, document.getElementById(rootElement))
}
