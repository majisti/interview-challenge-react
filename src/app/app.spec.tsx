import { render, screen } from '@testing-library/react'
import { App } from './app'
import { initStore } from '../modules'

describe(`<App />`, () => {
  it(`renders`, () => {
    const store = initStore()
    render(<App store={store} />)

    expect(screen.getByText('Spells')).toBeInTheDocument()
    expect(screen.getByText('Filters')).toBeInTheDocument()
  })
})
