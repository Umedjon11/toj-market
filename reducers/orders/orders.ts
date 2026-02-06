import { createSlice } from '@reduxjs/toolkit'
import { getOrders } from './api'

export interface OrdersState {
    isLoading: boolean,
    orders: IOrder[]
}

export interface IOrder {
    id: number,
    user: number,
    items: IOrderedProduct[],
    status: string,
    status_display: string,
    created_at: string,
    total_amount: string
}

export interface IOrderedProduct {
    id: number,
    order: number,
    product: number,
    quantity: number,
    product_name: string,
    price_at_purchase: string
}

const initialState: OrdersState = {
    isLoading: true,
    orders: []
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrders.pending, (state) => {
            state.isLoading = true,
                state.orders = []
        })
        builder.addCase(getOrders.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.orders = payload
        })
        builder.addCase(getOrders.rejected, (state) => {
            state.isLoading = false
            state.orders = []
        })
    }
})

// Action creators are generated for each case reducer function
export const { } = ordersSlice.actions

export default ordersSlice.reducer