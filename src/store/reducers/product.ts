import { createSlice } from '@reduxjs/toolkit'
import { ProductT } from '../../types/product'

const initialState: { product: ProductT | null, isLoading: boolean } = {
  product: null,
  isLoading: false,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    startFetchProduct: state => ({
      isLoading: true,
      product: state.product,
    }),
    addProduct: (_state, { payload }) => ({
      isLoading: false,
      product: { ...payload },
    }),
  },
})

export const { addProduct, startFetchProduct } = productSlice.actions

export default productSlice.reducer
