import { axiosRequest } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCartProducts } from "../cart/api";


export const getOrders = createAsyncThunk("orders/getOrders", async (id: void, { rejectWithValue }) => {
    try {
        const { data } = await axiosRequest.get("/api/toj_market/order/get-all-orders/")
        return data
    } catch (error: any) {
        return rejectWithValue(error.response)
    }
})

export const createOrder = createAsyncThunk("orders/createOrder", async (id: void, { rejectWithValue, dispatch }) => {
    try {
        await axiosRequest.post("/api/toj_market/order/create/", { cart_ids: [] })
        dispatch(getCartProducts())
        window.location.pathname = "/"
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})