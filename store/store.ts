import cartSlice from '@/reducers/cart/cart'
import categoriesSlice from '@/reducers/categories/categories'
import filterSlice from '@/reducers/filter/filter'
import ordersSlice from '@/reducers/orders/orders'
import productsSlice from '@/reducers/products/products'
import shopSlice from '@/reducers/shop/shop'
import shopsSlice from '@/reducers/shops/shops'
import userInfoSlice from '@/reducers/user/user'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    categories: categoriesSlice,
    shops: shopsSlice,
    filter: filterSlice,
    userInfo: userInfoSlice,
    orders: ordersSlice,
    shop: shopSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch