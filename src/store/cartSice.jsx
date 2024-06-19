import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.cart.push(action.payload);
        },
        removeFromCart(state, action) {
            const productId = action.payload;
            state.cart = state.cart.filter(item => item.id !== productId);
        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectTotalPrice = (state) => {
    return state.cart.cart.reduce((total, item) => total + item.price, 0);
};

export default cartSlice.reducer;