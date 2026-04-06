import { axiosNav, axiosRequest } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getUser = createAsyncThunk("userInfo/getUser", async (id: void, { rejectWithValue }) => {
    try {
        const { data } = await axiosNav.get("/api/accounts/auth/get_user/")
        return data
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})

export const getUserProfile = createAsyncThunk("userInfo/getUserProfile", async(id: void, { rejectWithValue }) => {
    try {
        const { data } = await axiosRequest.get("/api/toj_market/profile-info/")

        return data
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})

export const editProfilePhoto = createAsyncThunk("userProfile/editProfilePhoto", async (user: FormData, { rejectWithValue, dispatch }) => {
    try {
        await axiosRequest.patch("/api/accounts/auth/user_update/", user)

        dispatch(getUserProfile())
        dispatch(getUser())
    } catch (error: any) {
        return rejectWithValue(error.response.satus)
    }
})

export const getTelegramLink = createAsyncThunk("userProfile/getTelegramLink", async (id: void, { rejectWithValue }) => {
    try {
        const { data } = await axiosRequest.get("/api/accounts/auth/telegram-link/")
        return data.link
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})

export const editProfileName = createAsyncThunk("userProfile/editProfileName", async (user: FormData, { dispatch, rejectWithValue }) => {
    try {
        await axiosRequest.put("/api/accounts/auth/user_update/", user)

        dispatch(getUserProfile())
        dispatch(getUser())
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})

export const getMyComments = createAsyncThunk("userProfile/getMyComments", async (id: void, { rejectWithValue }) => {
    try {
        const { data } = await axiosRequest.get("/api/toj_market/profile-info/my-last-comments/")
        return data
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})

export const deleteComment = createAsyncThunk("userProfile/deleteComment", async (id: number, { dispatch, rejectWithValue }) => {
    try {
        await axiosRequest.delete(`/api/toj_market/comments/${id}/delete/`)

        dispatch(getMyComments())
    } catch (error: any) {
        return rejectWithValue(error.response.status)
    }
})