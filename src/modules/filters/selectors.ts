import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { FiltersState } from './slice'

export const filtersSelector = (state: RootState): FiltersState => state.filters

export const levelFilterSelector = createSelector(
  [filtersSelector],
  (filters) => filters.level,
)

export const schoolFilterSelector = createSelector(
  [filtersSelector],
  (filters) => filters.school,
)

export const hasActiveFiltersSelector = createSelector(
  [schoolFilterSelector, levelFilterSelector],
  (schoolFilter, levelFilter) => schoolFilter && levelFilter,
)
