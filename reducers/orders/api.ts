import { axiosRequest } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getOrders = createAsyncThunk("orders/getOrders", async (id: void, { rejectWithValue }) => {
    try {
        const { data } = await axiosRequest.get("/api/toj_market/order/get-all-orders/")
        return data
    } catch (error: any) {
        return rejectWithValue(error.response)
    }
})