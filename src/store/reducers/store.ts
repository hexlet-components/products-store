import { createSlice } from '@reduxjs/toolkit';
import { StoreT, FetchingProcess } from '../../types/store';

const initialState: StoreT = {
  loadingProcess: FetchingProcess.initial,
  products: [],
  limit: 0,
  skip: 0,
  total: 0,
  currentPage: 1,
  error: null,
};

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    startFetchStore: (state) => ({
      ...state,
      loadingProcess: FetchingProcess.loading,
      products: state.products,
    }),
    updateStoreState: (state, { payload }) => ({
      ...state,
      loadingProcess: FetchingProcess.loaded,
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
    fetchError: (state, { payload }) => ({
      ...state,
      loadingProcess: FetchingProcess.failed,
    }),
  },
});

export const {
  updateStoreState, startFetchStore, nextPage, prevPage, fetchError,
} = storeSlice.actions;

export default storeSlice.reducer;
