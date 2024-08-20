import counterCartSlice from './slice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        cart: counterCartSlice
    }
})

export default store;