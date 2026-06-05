import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import cart from './reducers/cart';
import product from './reducers/product';
import store from './reducers/store';
import rootSagas from './sagas/index';

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

rootSagas.forEach((saga) => {
  sagaMiddleware.run(saga);
});

export default appStore;
