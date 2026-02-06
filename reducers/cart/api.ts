import { axiosNav, axiosRequest } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getCartProducts = createAsyncThunk("cart/getCartProducts", async () => {
    try {
        const { data } = await axiosNav.get("/api/toj_market/cart/get-all-items/")
        return data
    } catch (error) {
        return []
    }
})

export const addToCart = createAsyncThunk("cart/addToCart", async (id: number, { dispatch }) => {
    try {
        await axiosRequest.post("/api/toj_market/cart/add-item/", {product: id, quantity: 1})
        dispatch(getCartProducts())
    } catch (error) {
        console.error(error)
    }
})

export const editItem = createAsyncThunk("cart/editItem", async (item: { id: number, quantity: number, product: number }, { rejectWithValue, dispatch }) => {
    try {
        await axiosRequest.put(`/api/toj_market/cart/update-item/${item.id}/`, { product: item.product, quantity: item.quantity })

        dispatch(getCartProducts())
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})

export const deleteItem = createAsyncThunk("cart/deleteItem", async (id: number, { rejectWithValue, dispatch }) => {
    try {
        await axiosRequest.delete(`/api/toj_market/cart/delete-item/${id}/`)

        dispatch(getCartProducts())
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})