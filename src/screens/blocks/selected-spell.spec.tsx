import fetchMock from 'fetch-mock'
import { screen, waitFor } from '@testing-library/react'
import { SpellDescription, SpellSchool } from '../../modules/spells'
import { initStore, Store } from '../../modules'
import { renderWithReduxProvider } from '../../utils/tests'
import { SelectedSpell } from './selected-spell'
import { selectResource } from '../../modules/routing'
import { capitalizeFirstLetter } from '../../utils/string'

describe(`<SelectedSpell />`, () => {
  let store: Store
  const spellDescription: Pick<SpellDescription, 'index' | 'name' | 'desc' | 'ritual' | 'concentration' | 'level' | 'school'> = {
    index: 'alter-self',
    name: 'Alter Self',
    desc: ['Very long description.', 'Man is it long.'],
    ritual: false,
    concentration: true,
    level: 2,
    school: {
      index: SpellSchool.ABJURATION,
      name: capitalizeFirstLetter(SpellSchool.ABJURATION),
      url: 'https://api.whatever.com'
    }
  }

  beforeEach(() => {
    store = initStore()
    fetchMock.mock(`begin:${process.env.REACT_APP_SPELL_API_URL!}`, spellDescription)
  })

  afterEach(() => {
    fetchMock.restore()
  })

  it(`displays a placeholder when no spell is selected`, () => {
    renderWithReduxProvider(store, <SelectedSpell />)

    expect(screen.getByText(/select a spell/i)).toBeInTheDocument()
  })

  it(`displays information about the selected spell`, async () => {
    renderWithReduxProvider(store, <SelectedSpell />)

    store.dispatch(selectResource(spellDescription.index))

    await waitFor(() => expect(screen.getByText(spellDescription.name)).toBeInTheDocument())
    expect(screen.getByText(spellDescription.desc[0])).toBeInTheDocument()
    expect(screen.getByText(spellDescription.desc[1])).toBeInTheDocument()
    expect(screen.getByText('concentration')).toBeInTheDocument()
  })
})
