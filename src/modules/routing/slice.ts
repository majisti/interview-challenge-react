import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Routes } from './constants'

export interface RouterState {
  route: Routes
  selectedResource: string | null
}

const initialState: RouterState = {
  route: Routes.SPELLS,
  selectedResource: null,
}

const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    navigate: (state, action: PayloadAction<Routes>) => {
      state.route = action.payload
    },
    selectResource: (state, action: PayloadAction<string>) => {
      state.selectedResource = action.payload
    },
  },
})

export const { navigate, selectResource } = routerSlice.actions
export const reducer = routerSlice.reducer
export const name = routerSlice.name
