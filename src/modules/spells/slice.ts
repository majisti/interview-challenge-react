import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface SpellsState {
  favorites: Array<{
    id: number
    spellId: string
    spellName: string
    dateAdded: string
  }>
}

const initialState: SpellsState = {
  favorites: [],
}

const spellsSlice = createSlice({
  name: 'spells',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<SpellsState['favorites']>) => {
      state.favorites = action.payload
    },
  },
})

export const favoriteSpellsSelector = (state: RootState): SpellsState['favorites'] => {
  return state.spells.favorites
}

export const isFavoriteSelector = (state: RootState) => {
  return state.spells.favorites.some(favorite => favorite.spellId === state.router.selectedResource)
}

export const { setFavorites } = spellsSlice.actions
export const reducer = spellsSlice.reducer
export const name = spellsSlice.name
