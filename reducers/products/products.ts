import { createSlice } from '@reduxjs/toolkit'
import { getCommentsById, getProductById, getProducts } from './api'

export interface ProductsState {
    isLoading: boolean,
    products: IProduct[],
    productById: null | IProductById,
    isLoadingProduct: boolean,
    commentsById: null | IComment[],
    isLoadingCommentsById: boolean
}

export interface IProductById {
    id: number,
    title: string,
    description: string,
    price: string,
    quantity: number,
    discount: number,
    created_at: string,
    shop: number,
    category: number,
    views_count: number,
    comments: IComment[],
    images: IImage[],
    shop_info: IShop,
    category_info: ICategory
}

export interface IComment {
    id: number,
    text: string,
    product: number,
    user: string
}

export interface IImage {
    id: number,
    product: number,
    image: string,
    is_main_image: boolean
}

export interface IShop {
    id: number,
    title: string,
    bio: string,
    avatar: string,
    review_count: number
}

export interface ICategory {
    id: number,
    title: string,
    avatar: string
}

export interface IProduct {
    id: number,
    title: string,
    price: string,
    discount: number,
    shop: number,
    category: number,
    views_count: number,
    avg_crowns: string,
    main_image: string
}

const initialState: ProductsState = {
    isLoading: true,
    products: [],
    productById: null,
    isLoadingProduct: true,
    commentsById: [],
    isLoadingCommentsById: true
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true,
                state.products = []
        })
        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.products = payload
        })
        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false
            state.products = []
        })
        builder.addCase(getProductById.pending, (state) => {
            state.isLoadingProduct = true,
            state.productById = null
        })
        builder.addCase(getProductById.fulfilled, (state, { payload }) => {
            state.isLoadingProduct = false
            state.productById = payload
        })
        builder.addCase(getProductById.rejected, (state) => {
            state.isLoadingProduct = false
            state.productById = null
        })
        builder.addCase(getCommentsById.pending, (state) => {
            state.isLoadingCommentsById = true,
            state.commentsById = []
        })
        builder.addCase(getCommentsById.fulfilled, (state, { payload }) => {
            state.isLoadingCommentsById = false
            state.commentsById = payload
        })
        builder.addCase(getCommentsById.rejected, (state) => {
            state.isLoadingCommentsById = false
            state.commentsById = null
        })
    }
})

// Action creators are generated for each case reducer function
export const { } = productsSlice.actions

export default productsSlice.reducer