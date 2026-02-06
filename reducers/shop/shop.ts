import { createSlice } from '@reduxjs/toolkit'
import { createShop, getMyShop } from './api'
import toast from 'react-hot-toast'

export interface ShopState {
    isLoading: boolean,
    isLoadingCreateShop: boolean,
    shop: IMyShop | null
}

export interface IMyShop {
    id: number,
    seller_full_name: string,
    title: string,
    bio: string,
    avatar: string,
    review_count: number,
    last_added_product: IMyProduct | null,
    most_popular_products: IMyProduct[],
    created_at: string
}

export interface IMyProduct {
    id: number,
    title: string,
    price: string,
    discount: number,
    shop: number,
    category: number,
    views_count: number,
    main_image: string
}

const initialState: ShopState = {
    isLoading: true,
    isLoadingCreateShop: false,
    shop: null
}

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        falseLoading: (state) => {
            state.isLoadingCreateShop = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMyShop.pending, (state) => {
            state.isLoading = true,
                state.shop = null
        })
        builder.addCase(getMyShop.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.shop = payload
        })
        builder.addCase(getMyShop.rejected, (state) => {
            state.isLoading = false
            state.shop = null
        })
        builder.addCase(createShop.pending, (state) => {
            state.isLoadingCreateShop = true
        })
        builder.addCase(createShop.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(createShop.rejected, (state, { payload }) => {
            state.isLoadingCreateShop = false
        })
    }
})

// Action creators are generated for each case reducer function
export const { falseLoading } = shopSlice.actions

export default shopSlice.reducer