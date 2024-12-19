import { createSlice } from "@reduxjs/toolkit";


const useProductStore = createSlice({
    name: 'product',
    initialState: {
        products: [],
    },
    reducers: {
        addProducts: (state, action) => {
            state.products = action.payload 
        },
        filteredTags : (state, action) => {
            const tag = action.payload;
            state.products.filter(val => val.tags.name.includes(tag))
        }
    }
});

export const {addProducts, filteredTags} = useProductStore.actions;
export default useProductStore.reducer;