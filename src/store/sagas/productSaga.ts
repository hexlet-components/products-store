import { put, takeEvery, call } from 'redux-saga/effects';
import fetchProduct from '../../services/fetchProduct';
import { ProductT } from '../../types/product';
import { startFetchProduct } from '../reducers/product';
import { addProducts } from '../reducers/store';

function* getProduct({ payload }: {payload: number}) {
  const product: ProductT = yield call(fetchProduct, payload);

  yield put(addProducts(product));
}

export default function* storeSaga() {
  yield takeEvery(startFetchProduct, getProduct);
}
