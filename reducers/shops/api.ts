import { axiosNav } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getShops = createAsyncThunk("shops/getShops", async () => {
    try {
        const { data } = await axiosNav.get("/api/toj_market/shops/get-all-shops/")
        return data
    } catch (error) {
        console.error(error)
    }
})

export const getShopById = createAsyncThunk("shops/getShopById", async (id: any, { rejectWithValue }) => {
    try {
        const { data } = await axiosNav.get(`/api/toj_market/shops/get-by-id/${id}/`)
        return data
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})