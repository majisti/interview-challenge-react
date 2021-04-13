import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { RouterState } from './slice'

export const routingSelector = (state: RootState): RouterState => state.router

export const selectedSpellSelector = createSelector(
  [routingSelector],
  (routing) => routing.selectedResource,
)
