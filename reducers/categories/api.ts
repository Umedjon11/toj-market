import { axiosRequest } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getCategories = createAsyncThunk("categories/getCategories", async () => {
    try {
        const { data } = await axiosRequest.get("/api/toj_market/categories/get-all-categories/")
        return data
    } catch (error) {
        console.error(error)
    }
})

export const deleteCategory = createAsyncThunk("categories/deleteCategory", async (id: number, { rejectWithValue, dispatch }) => {
    try {
        await axiosRequest.delete(`/api/toj_market/categories/${id}/destroy/`)
        dispatch(getCategories())
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})

export const addNewCategory = createAsyncThunk("categories/addNewCategory", async (category: FormData, { rejectWithValue, dispatch }) => {
    try {
        const res = await axiosRequest.post("/api/toj_market/categories/create/", category)
        dispatch(getCategories())
        return res
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})

export const editCategory = createAsyncThunk("categories/editCategory", async (category: { id: number, category: FormData }, { rejectWithValue, dispatch }) => {
    try {
        const res = await axiosRequest.put(`/api/toj_market/categories/${category.id}/update/`, category.category)
        dispatch(getCategories())
        return res
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})