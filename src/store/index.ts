import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSagas from './sagas/index';
import store from './reducers/store';
import product from './reducers/product';
import cart from './reducers/cart';

const sagaMiddleware = createSagaMiddleware();

const appStore = configureStore({
  reducer: {
    store,
    product,
    cart,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

rootSagas.forEach((saga) => sagaMiddleware.run(saga));

export default appStore;
