import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSagas from './sagas/index';
import store from './reducers/store';
import product from './reducers/product';
import cart from './reducers/cart';

const sagaMiddleWare = createSagaMiddleware();

export default configureStore({
  reducer: {
    store,
    product,
    cart,
  },
  middleware: [sagaMiddleWare],
});

rootSagas.map(sagaMiddleWare.run);
