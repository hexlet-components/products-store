import { createSlice } from '@reduxjs/toolkit';
import { StoreT } from '../../types/store';

const initialState: StoreT = {
  isLoading: false,
  products: [],
  limit: 0,
  skip: 0,
  total: 0,
  currentPage: 1,
};

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    startFetchStore: (state) => ({
      ...state,
      isLoading: true,
      products: state.products,
    }),
    updateStoreState: (state, { payload }) => ({
      ...state,
      isLoading: false,
      products: [...payload.products],
      skip: payload.skip,
      limit: payload.limit,
      total: payload.total,
    }),
    nextPage: (state) => {
      const nextPage = state.currentPage + 1;
      const newSkip = (nextPage - 1) * 30;
      return {
        ...state,
        skip: newSkip,
        currentPage: nextPage,
      };
    },
    prevPage: (state) => {
      const nextPage = state.currentPage - 1;
      const newSkip = (nextPage - 1) * 30;
      return {
        ...state,
        skip: newSkip,
        currentPage: nextPage,
      };
    },
  },
});

export const {
  updateStoreState, startFetchStore, nextPage, prevPage,
} = storeSlice.actions;

export default storeSlice.reducer;
