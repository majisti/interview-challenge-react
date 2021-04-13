import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FiltersState {
  level: null | number
  school: null | string
}

const initialState: FiltersState = {
  level: null,
  school: null,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLevelFilter: (state, action: PayloadAction<number>) => {
      state.level = action.payload
    },
    setSchoolFilter: (state, action: PayloadAction<string>) => {
      state.school = action.payload
    },
    resetFilters: (state) => {
      state.school = null
      state.level = null
    }
  },
})

export const { setLevelFilter, setSchoolFilter, resetFilters } = filtersSlice.actions
export const reducer = filtersSlice.reducer
export const name = filtersSlice.name
