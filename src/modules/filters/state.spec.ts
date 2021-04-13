import { initStore, Store } from '../store'
import { levelFilterSelector, hasActiveFiltersSelector, schoolFilterSelector } from './selectors'
import { resetFilters, setLevelFilter, setSchoolFilter } from './slice'
import { SpellSchool } from '../spells'

describe(`state`, () => {
  let store: Store

  beforeEach(() => {
    store = initStore()
  })

  it(`has no class filter by default`, () => {
    expect(levelFilterSelector(store.getState())).toBeNull()
  })

  it(`has no school filter by default`, () => {
    expect(schoolFilterSelector(store.getState())).toBeNull()
  })

  it(`has no active filter by default`, () => {
    expect(hasActiveFiltersSelector(store.getState())).toBeFalsy()
  })

  it(`sets a level filter`, () => {
    store.dispatch(setLevelFilter(3))

    expect(levelFilterSelector(store.getState())).toEqual(3)
    expect(hasActiveFiltersSelector(store.getState())).toBeTruthy()
  })

  it(`sets a school filter`, () => {
    store.dispatch(setSchoolFilter(SpellSchool.ABJURATION))

    expect(schoolFilterSelector(store.getState())).toEqual(SpellSchool.ABJURATION)
    expect(hasActiveFiltersSelector(store.getState())).toBeTruthy()
  })

  it(`resets filters`, () => {
    store.dispatch(setSchoolFilter(SpellSchool.ABJURATION))
    store.dispatch(setLevelFilter(3))
    store.dispatch(resetFilters())

    expect(levelFilterSelector(store.getState())).toBeNull()
    expect(schoolFilterSelector(store.getState())).toBeNull()
  })
})
