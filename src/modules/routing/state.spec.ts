import { initStore, Store } from '../store'
import { selectedSpellSelector } from './selectors'
import { selectResource } from './slice'

describe(`state`, () => {
  let store: Store

  beforeEach(() => {
    store = initStore()
  })

  it(`has no selected resource by default`, () => {
    expect(selectedSpellSelector(store.getState())).toBeNull()
  })

  it(`sets a selected resource`, () => {
    const resource = 'magic-missile'
    store.dispatch(selectResource(resource))
    expect(selectedSpellSelector(store.getState())).toEqual(resource)
  })
})
