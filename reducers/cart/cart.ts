import { createSlice } from '@reduxjs/toolkit'
import { getCartProducts } from './api'

export interface ProductsState {
    isLoading: boolean,
    cartProducts: ICartProduct[]
}

export interface ICartProduct {
    id: number,
    user: number,
    product: number,
    quantity: number,
    created_at: string,
    updated_at: string,
    product_name: string,
    product_price: string
  }

const initialState: ProductsState = {
    isLoading: true,
    cartProducts: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCartProducts.pending, (state) => {
            state.isLoading = true,
            state.cartProducts = []
        })
        builder.addCase(getCartProducts.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.cartProducts = payload
        })
        builder.addCase(getCartProducts.rejected, (state) => {
            state.isLoading = false
            state.cartProducts = []
        })
    }
})

// Action creators are generated for each case reducer function
export const { } = cartSlice.actions

export default cartSlice.reducer