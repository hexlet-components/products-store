import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSagas from './sagas/index';
import store from './reducers/store';

const sagaMiddleWare = createSagaMiddleware();

export default configureStore({
  reducer: {
    store,
  },
  middleware: [sagaMiddleWare],
});

rootSagas.map(sagaMiddleWare.run);
