import { createSlice } from '@reduxjs/toolkit'
import { StoreT } from '../../types/store'

const initialState: StoreT = {
  isLoading: false,
  products: [],
  limit: 0,
  skip: 0,
  total: 0,
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    startFetchStore: state => ({
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
    nextPage: state => ({
      ...state,
      skip: state.skip + state.limit,
    }),
    prevPage: state => ({
      ...state,
      skip: state.skip - state.limit,
    }),
  },
})

export const {
  updateStoreState, startFetchStore, nextPage, prevPage,
} = storeSlice.actions

export default storeSlice.reducer
