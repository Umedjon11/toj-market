import { createSlice } from '@reduxjs/toolkit'
import { getMyComments, getTelegramLink, getUser, getUserProfile } from './api'

export interface ShopsState {
    user: IUser | null,
    isLoadingUser: boolean,
    userProfile: IUserProfile | null
    isLoadingUserProfile: boolean,
    telegramLink: string,
    isLoadingTegramLink: boolean,
    myComments: IMyComment[],
    isLoadingMyComments: boolean
}

export interface IMyComment {
    id: number,
    text: string,
    product: number,
    user: number,
    user_name: string,
    user_id: number,
    created_at: string
}

export interface IUserProfile {
    user_info: {
        id: number,
        email: string,
        avatar: string,
        first_name: string,
        last_name: string,
        telegram_id: number | null,
        role: string
    },
    total_orders: number,
    last_added_cart_items: ICartItem[]
}

export interface ICartItem {
    id: number,
    user: number,
    product: number,
    quantity: number,
    created_at: string,
    updated_at: string,
    product_name: string,
    product_price: string
}

export interface IUser {
    id: number,
    email: string,
    avatar: string,
    first_name: string,
    last_name: string,
    telegram_id: number | null,
    role: string
}

const initialState: ShopsState = {
    user: null,
    isLoadingUser: true,
    userProfile: null,
    isLoadingUserProfile: true,
    telegramLink: "",
    isLoadingTegramLink: true,
    myComments: [],
    isLoadingMyComments: true
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.user = null
            state.isLoadingUser = true
        })
        builder.addCase(getUser.fulfilled, (state, { payload }) => {
            state.user = payload
            state.isLoadingUser = false
        })
        builder.addCase(getUser.rejected, (state) => {
            state.user = null
            state.isLoadingUser = false
        })
        builder.addCase(getUserProfile.pending, (state) => {
            state.userProfile = null
            state.isLoadingUserProfile = true
        })
        builder.addCase(getUserProfile.fulfilled, (state, { payload }) => {
            state.userProfile = payload
            state.isLoadingUserProfile = false
        })
        builder.addCase(getUserProfile.rejected, (state) => {
            state.userProfile = null
            state.isLoadingUserProfile = false
        })
        builder.addCase(getTelegramLink.pending, (state) => {
            state.telegramLink = ""
            state.isLoadingTegramLink = true
        })
        builder.addCase(getTelegramLink.fulfilled, (state, { payload }) => {
            state.telegramLink = payload
            state.isLoadingTegramLink = false
        })
        builder.addCase(getTelegramLink.rejected, (state) => {
            state.telegramLink = ""
            state.isLoadingTegramLink = false
        })
        builder.addCase(getMyComments.pending, (state) => {
            state.myComments = []
            state.isLoadingMyComments = true
        })
        builder.addCase(getMyComments.fulfilled, (state, { payload }) => {
            state.myComments = payload
            state.isLoadingMyComments = false
        })
        builder.addCase(getMyComments.rejected, (state) => {
            state.myComments = []
            state.isLoadingMyComments = false
        })
    }
})

// Action creators are generated for each case reducer function
export const { } = userInfoSlice.actions

export default userInfoSlice.reducer