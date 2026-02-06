import { createSlice } from '@reduxjs/toolkit'
import { getCategories } from './api'

export interface CategoriesState {
    isLoading: boolean,
    categories: ICategory[]
}

export interface ICategory {
    id: number,
    title: string,
    avatar: string
}

const initialState: CategoriesState = {
    isLoading: true,
    categories: []
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true,
                state.categories = []
        })
        builder.addCase(getCategories.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.categories = payload
        })
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false
            state.categories = []
        })
    }
})

// Action creators are generated for each case reducer function
export const { } = categoriesSlice.actions

export default categoriesSlice.reducer