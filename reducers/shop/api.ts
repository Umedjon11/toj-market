import { axiosRequest } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getMyShop = createAsyncThunk("shop/getMyShop", async (id: void, { rejectWithValue }) => {
    try {
        const { data } = await axiosRequest.get("/api/toj_market/shops/get-my-shop/")
        return data
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})

export const createShop = createAsyncThunk("shop/createShop", async (shop: FormData, { rejectWithValue }) => {
    try {
        const { data } = await axiosRequest.post("/api/toj_market/shops/create/", shop)
        return data
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})

export const editAvatar = createAsyncThunk("shop/editAvatar", async (shop: { id: number, image: FormData }, { rejectWithValue, dispatch }) => {
    try {
        await axiosRequest.put(`/api/toj_market/shops/${shop.id}/update/`, shop.image)

        dispatch(getMyShop())
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})

export const deleteShop = createAsyncThunk("shop/deleteShop", async (id: number, { rejectWithValue, dispatch }) => {
    try {
        await axiosRequest.delete(`/api/toj_market/shops/${id}/destroy/`)
        dispatch(getMyShop())
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})

export const makeDiscountProduct = createAsyncThunk("shop/makeDiscountProduct", async (product: { id: number, discount: FormData }, { rejectWithValue, dispatch }) => {
    try {
        const { data } = await axiosRequest.put(`/api/toj_market/products/${product.id}/update/`, product.discount)
        dispatch(getMyShop())
        return data
    } catch (error: any) {
        return rejectWithValue((error.response.status))
    }
})

export const addNewProduct = createAsyncThunk("shop/addNewProduct", async (product: FormData, { rejectWithValue, dispatch }) => {
    try {
        const { data } = await axiosRequest.post(`/api/toj_market/products/create/`, product)
        return data
    } catch (error: any) {
        return rejectWithValue((error.response.status))
    }
})

export const addNewImage = createAsyncThunk("shop/addNewImage", async (image: {id: number, image: FormData}, { rejectWithValue, dispatch }) => {
    try {
        const { data } = await axiosRequest.post(`/api/toj_market/products/${image.id}/add-image/`, image.image)
        return data
    } catch (error: any) {
        return rejectWithValue((error.response.status))
    }
})

export const editProduct = createAsyncThunk("shop/addNewImage", async (product: {id: number, product: FormData}, { rejectWithValue, dispatch }) => {
    try {
        const { data } = await axiosRequest.put(`/api/toj_market/products/${product.id}/update/`, product.product)
        return data
    } catch (error: any) {
        return rejectWithValue((error.response.status))
    }
})

export const deleteProduct = createAsyncThunk("shop/deleteProduct", async (id: number, { rejectWithValue, dispatch }) => {
    try {
        await axiosRequest.delete(`/api/toj_market/products/${id}/destroy/`)
        dispatch(getMyShop())
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})
