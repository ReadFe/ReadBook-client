import counterCartSlice from './counterCartSlice'
import useProductStore from './productStore'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        cart: counterCartSlice,
        product: useProductStore
    }
})

export default store;