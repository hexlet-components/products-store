import { put, takeEvery, call } from 'redux-saga/effects';
import fetchProduct from '../../services/fetchProduct';
import { ProductT } from '../../types/product';
import { addProduct, startFetchProduct } from '../reducers/product';

function* getProduct({ payload }: {payload: number}) {
  const product: ProductT = yield call(fetchProduct, payload);

  yield put(addProduct(product));
}

export default function* storeSaga() {
  yield takeEvery(startFetchProduct, getProduct);
}
