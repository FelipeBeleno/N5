import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices/counterSlice'
import { notificationSlice } from './slices/notificationSlice'
import { productsSlice } from './slices/productsSlice'
import { themeSlice } from './slices/themeSlice'


export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        theme: themeSlice.reducer,
        products: productsSlice.reducer,
        notification: notificationSlice.reducer
    },
})