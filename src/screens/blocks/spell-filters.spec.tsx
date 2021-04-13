import { screen } from '@testing-library/react'
import { renderWithReduxProvider } from '../../utils/tests'
import { SpellFilters } from './spell-filters'
import { initStore, Store } from '../../modules'
import user from '@testing-library/user-event'
import { SpellSchool } from '../../modules/spells'
import { hasActiveFiltersSelector, levelFilterSelector, schoolFilterSelector } from '../../modules/filters'
import { capitalizeFirstLetter } from '../../utils/string'

describe(`<SpellFilter />`, () => {
  let store: Store

  beforeEach(() => {
    store = initStore()
  })

  const levelDropdown = () => screen.getByRole('combobox', { name: /level/i })
  const schoolDropdown = () => screen.getByRole('combobox', { name: /school/i })
  const resetButton = () => screen.queryByRole('button', { name: /reset/i })

  it(`renders with dropdown placeholders and no reset button`, () => {
    renderWithReduxProvider(store, <SpellFilters />)

    expect(levelDropdown()).toHaveDisplayValue(/level/i)
    expect(schoolDropdown()).toHaveDisplayValue(/school/i)
    expect(resetButton()).not.toBeInTheDocument()
  })

  it(`sets a level filter`, () => {
    renderWithReduxProvider(store, <SpellFilters />)

    user.selectOptions(levelDropdown(), screen.getByText('3'))

    expect(levelDropdown()).toHaveDisplayValue('3')
    expect(resetButton()).toBeInTheDocument()
    expect(levelFilterSelector(store.getState())).toEqual(3)
    expect(hasActiveFiltersSelector(store.getState())).toBeTruthy()
  })

  it(`sets a school filter`, () => {
    const abjurationSchool = capitalizeFirstLetter(SpellSchool.ABJURATION)

    renderWithReduxProvider(store, <SpellFilters />)

    user.selectOptions(schoolDropdown(), screen.getByText(abjurationSchool))

    expect(schoolDropdown()).toHaveDisplayValue(abjurationSchool)
    expect(resetButton()).toBeInTheDocument()
    expect(schoolFilterSelector(store.getState())).toEqual(SpellSchool.ABJURATION)
    expect(hasActiveFiltersSelector(store.getState())).toBeTruthy()
  })

  it(`resets filters`, () => {
    renderWithReduxProvider(store, <SpellFilters />)

    user.selectOptions(schoolDropdown(), screen.getByText(capitalizeFirstLetter(SpellSchool.ABJURATION)))
    user.click(screen.getByRole('button', { name: /reset/i }))

    expect(resetButton()).not.toBeInTheDocument()
    expect(levelDropdown()).toHaveDisplayValue(/level/i)
    expect(schoolDropdown()).toHaveDisplayValue(/school/i)
  })
})
