import { createSlice } from '@reduxjs/toolkit'

export interface FilterState {
    isOpen: boolean
    categoryId: number | null,
    price: [number, number],
    query: string
}

const initialState: FilterState = {
    isOpen: false,
    categoryId: null,
    price: [0, 1000000],
    query: ""
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setOpen: (state) => {
            state.isOpen = !state.isOpen
        },
        setCategryId: (state, { payload }) => {
            state.categoryId = payload
        },
        setPrice: (state, { payload }) => {
            state.price = payload
        },
        setQuery: (state, { payload }) => {
            state.query = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setOpen, setCategryId, setPrice, setQuery } = filterSlice.actions

export default filterSlice.reducer