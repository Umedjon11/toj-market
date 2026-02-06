import { axiosRequest } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getProducts = createAsyncThunk("products/getProducts", async () => {
    try {
        const { data } = await axiosRequest.get("/api/toj_market/products/get-all-products/")
        return data
    } catch (error) {
        console.error(error)
    }
})

export const getProductById = createAsyncThunk("products/getProductByID", async (id: any) => {
    try {
        const { data } = await axiosRequest.get(`/api/toj_market/products/get-by-id/${id}/`)
        return data
    } catch (error) {
        console.error(error)
    }
})

export const getCommentsById = createAsyncThunk("produccts/getCommentById", async (id: any) => {
    try {
        const { data } = await axiosRequest.get(`/api/toj_market/comments/products/${id}/`)
        return data
    } catch (error) {
        console.error(error)
    }
})

export const addCommentToProudct = createAsyncThunk("products/addCommentToProduct", async (comment: { id: number, comment: FormData }, { rejectWithValue, dispatch }) => {
    try {
        const { data } = await axiosRequest.post(`/api/toj_market/comments/products/${comment.id}/add/`, comment.comment)
        dispatch(getCommentsById(comment.id))
        return data
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})

export const addRaitingToProudct = createAsyncThunk("products/AddRaitingToProduct", async (raiting: { id: number, raiting: FormData }, { rejectWithValue, dispatch }) => {
    try {
        const { data } = await axiosRequest.post(`/api/toj_market/crowns/add/${raiting.id}/`, raiting.raiting)
        return data
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})