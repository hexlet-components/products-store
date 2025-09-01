import { createSlice } from '@reduxjs/toolkit'
import { getCartFromSessionStorage } from '../../services/cart'
import { CartT } from '../../types/cart'

const initialState: CartT = getCartFromSessionStorage()

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: state => state,
    removeFromCart: state => state,
    clearCart: () => ({}),
    updateCart: (_, { payload }: { payload: CartT }) => payload,
  },
})

export const { addToCart, removeFromCart, clearCart, updateCart } = cartSlice.actions

export default cartSlice.reducer
