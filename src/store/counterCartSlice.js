import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { apiClient } from "../utils/axios";
import { toast } from "react-toastify";

export const fetchCart = createAsyncThunk(
    'cart/fetchCart', 
    async () => {
        const {data} = await apiClient.get('/api/cart');
        return data;
    }
)
// export const updateCart = createAsyncThunk(
//     'cart/updateCart', 
//     async (newProduct) => {
//         try {
//             await apiClient.put('/api/cart', );
//         } catch (error) {
//             toast.error('Item gagal ditambahkan')
//         }
//     }
// )

const counterCartSlice = createSlice({
    name: 'cart',
    initialState: {
        count: 0,
        items: [],
        error: null
    },
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload) 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload
                state.count = action.payload.length;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.error = action.error.message;
            })
    }
})

export const {addToCart} = counterCartSlice.actions
export default counterCartSlice.reducer;    