
import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice';
import cartReducer from './cartSice'

export const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
    },
});
