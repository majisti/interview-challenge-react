import { screen, waitFor } from '@testing-library/react'
import { renderWithReduxProvider } from '../../utils/tests'
import { SpellList } from './spell-list'
import { initStore, Store } from '../../modules'
import { SpellList as SpellListInterface } from '../../modules/spells'
import fetchMock from 'fetch-mock'
import user from '@testing-library/user-event'
import { selectedSpellSelector } from '../../modules/routing/selectors'

describe(`<SpellList />`, () => {
  let store: Store
  const spellList: SpellListInterface = {
    count: '2',
    results: [
      { index: 'spell-a', name: 'Spell A', url: 'https://api.whatever.com' },
      { index: 'spell-b', name: 'Spell B', url: 'https://api.whatever.com' },
    ],
  }

  beforeEach(() => {
    store = initStore()
    fetchMock.mock(`begin:${process.env.REACT_APP_SPELL_API_URL!}`, spellList)
  })

  afterEach(() => {
    fetchMock.restore()
  })

  it(`renders a loading state`, async () => {
    renderWithReduxProvider(store, <SpellList />)

    await waitFor(() => expect(screen.getByText(/loading/i)).toBeInTheDocument())
  })

  it(`loads the spell list when mounting`, async () => {
    renderWithReduxProvider(store, <SpellList />)

    await waitFor(() => expect(screen.getByText(/spell a/i)).toBeInTheDocument())
    expect(screen.getByText(/spell b/i)).toBeInTheDocument()
  })

  it(`selects a spell when clicked`, async () => {
    renderWithReduxProvider(store, <SpellList />)

    await waitFor(() => expect(screen.getByText(/spell a/i)).toBeInTheDocument())
    user.click(screen.getByText(/spell a/i))

    expect(selectedSpellSelector(store.getState())).toEqual(spellList.results[0].index)
  })
})
