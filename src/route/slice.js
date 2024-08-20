import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
const API_URL_CART = 'http://localhost:3000/api/cart';
import axios from "axios";

export const fetchCart = createAsyncThunk(
    'cart/fetchCart', 
    async (token) => {
        const {data} = await axios.get(API_URL_CART, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        return data
    }
)

const counterCartSlice = createSlice({
    name: 'cart',
    initialState: {
        count: 0,
        items: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.count = action.payload.length;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.error = action.error.message;
            })
    }
})
export default counterCartSlice.reducer;    