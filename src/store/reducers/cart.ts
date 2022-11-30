import { createSlice } from '@reduxjs/toolkit';
import { CartT } from '../../types/cart';
import { ProductT } from '../../types/product';

const initialState: CartT = {};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }: { payload: ProductT }) => {
      const item = state[payload.id];
      if (item) {
        if (item.quantity === payload.stock) return { ...state };

        const { quantity } = item;
        return {
          ...state,
          [payload.id]: {
            quantity: quantity + 1,
            product: payload,
          },
        };
      }
      return {
        ...state,
        [payload.id]: {
          quantity: 1,
          product: payload,
        },
      };
    },
    removeFromCart: (state, { payload }: { payload: number }) => {
      const { quantity } = state[payload];

      if (quantity > 1) {
        return {
          ...state,
          [payload]: {
            quantity: quantity - 1,
            product: { ...state[payload].product },
          },
        };
      }

      const newCart = { ...state };
      delete newCart[payload];

      return newCart;
    },
    clearCart: (state) => ({}),
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
