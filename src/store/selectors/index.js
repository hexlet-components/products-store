export const selectStore = (state) => state.store.products;
export const selectStoreIsLoading = (state) => state.store.isLoading;
export const selectSkip = (state) => state.store.skip;
export const selectTotal = (state) => state.store.total;
export const selectLimit = (state) => state.store.limit;

export const selectProduct = (state) => state.product.product;
export const selectProductIsLoading = (state) => state.product.isLoading;

export const selectCart = (state) => state.cart.products;
