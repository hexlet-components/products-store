import { createSlice } from '@reduxjs/toolkit';
import { StoreT } from '../../types/store';

const initialState: StoreT = {
  isLoading: false,
  products: [],
};

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    startFetchStore: (state) => ({
      isLoading: true,
      products: state.products,
    }),
    addProducts: (state, { payload }) => ({
      isLoading: false,
      products: [...payload],
    }),
  },
});

export const { addProducts, startFetchStore } = storeSlice.actions;

export default storeSlice.reducer;
