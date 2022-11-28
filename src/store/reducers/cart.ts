import { createSlice } from '@reduxjs/toolkit';
import { CartT } from '../../types/cart';

const initialState: CartT = {
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => ({
      products: [...state.products, payload],
    }),
    removeFromCart: (state, { payload }) => ({
      products: state.products.filter((p) => p.id !== payload),
    }),
    clearCart: (state) => ({
      products: [],
    }),
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
