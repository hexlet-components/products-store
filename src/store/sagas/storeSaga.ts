import { put, takeEvery, call } from 'redux-saga/effects';
import fetchStore from '../../services/fetchStore';
import { DummyStoreResponseT } from '../../types/dummyStoreResponse';
import { addProducts, startFetchStore } from '../reducers/store';

function* fillProductStore() {
  const storeData: DummyStoreResponseT = yield call(fetchStore);

  yield put(addProducts(storeData.products));
}

export default function* storeSaga() {
  yield takeEvery(startFetchStore, fillProductStore);
}
