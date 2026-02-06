import { createSlice } from '@reduxjs/toolkit'
import { getShops, getShopById } from './api'

export interface ShopsState {
    isLoading: boolean,
    shops: IShop[],
    shopById: null | IShopById,
    isLoadingShopById: boolean
}

export interface IShopById {
  id: number,
  seller_full_name: string,
  title: string,
  bio: string,
  avatar: string,
  review_count: number,
  last_added_product: IProduct,
  most_popular_products: IProduct[],
  created_at: string
}

export interface IProduct {
      id: number,
      title: string,
      price: string,
      discount: number,
      shop: number,
      category: number,
      views_count: number,
      main_image: any
    }

export interface IShop {
    id: number,
    title: string,
    bio: string,
    avatar: string,
    avg_crowns: string,
    review_count: number
}

const initialState: ShopsState = {
    isLoading: true,
    shops: [],
    shopById: null,
    isLoadingShopById: true
}

export const shopsSlice = createSlice({
    name: 'shops',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getShops.pending, (state) => {
            state.isLoading = true,
                state.shops = []
        })
        builder.addCase(getShops.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.shops = payload
        })
        builder.addCase(getShops.rejected, (state) => {
            state.isLoading = false
            state.shops = []
        })
        builder.addCase(getShopById.pending, (state) => {
            state.isLoadingShopById = true,
            state.shopById = null
        })
        builder.addCase(getShopById.fulfilled, (state, { payload }) => {
            state.isLoadingShopById = false
            state.shopById = payload
        })
        builder.addCase(getShopById.rejected, (state) => {
            state.isLoadingShopById = false
            state.shopById = null
        })
    }
})

// Action creators are generated for each case reducer function
export const { } = shopsSlice.actions

export default shopsSlice.reducer