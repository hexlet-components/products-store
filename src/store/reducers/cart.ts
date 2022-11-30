import { createSlice } from '@reduxjs/toolkit';
import { getCartFromSessionStorage } from '../../services/cart';
import { CartT } from '../../types/cart';
import { ProductT } from '../../types/product';

const initialState: CartT = getCartFromSessionStorage();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }: { payload: ProductT }) => state,
    removeFromCart: (state, { payload }: { payload: number }) => state,
    clearCart: (state) => ({}),
    updateCart: (state, { payload }: { payload: CartT }) => payload,
  },
});

export const { addToCart, removeFromCart, clearCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
