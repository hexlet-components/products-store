export const selectStore = (state) => state.store.products;
export const selectStoreIsLoading = (state) => state.store.loadingProcess;
export const selectSkip = (state) => state.store.skip;
export const selectTotal = (state) => state.store.total;
export const selectLimit = (state) => state.store.limit;
export const selectCurrentPage = (state) => state.store.currentPage;

export const selectProduct = (state) => state.product.product;
export const selectProductIsLoading = (state) => state.product.isLoading;

export const selectCart = (state) => state.cart;

// add reselect later
export const selectCategories = (state) => [
  ...new Set(state.store.products.map((p) => p.category)),
];
export const selectBrands = (state) => [
  ...new Set(state.store.products.map((p) => p.brand)),
];
export const selectMaxPrice = (state) => state.store.products.reduce((acc, p) => acc + p.price, 0);

export const selectCartProductsCount = (state) => Object.values(state.cart).reduce((acc, p) => acc + p.quantity, 0);
export const selectCartProducts = (state) => Object.values(state.cart).reduce((acc, p) => [...acc, p.product], []);
