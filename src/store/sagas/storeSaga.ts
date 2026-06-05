import { call, put, select, takeEvery } from 'redux-saga/effects';
import fetchStore from '../../services/fetchStore';
import type { DummyStoreResponseT } from '../../types/dummyStoreResponse';
import {
  nextPage,
  prevPage,
  startFetchStore,
  updateStoreState,
} from '../reducers/store';
import { selectSkip } from '../selectors';

function* fillProductStore() {
  const skip: number = yield select(selectSkip);
  const storeData: DummyStoreResponseT = yield call(
    { context: null, fn: fetchStore },
    skip,
  );

  yield put(updateStoreState(storeData));
}

export default function* storeSaga() {
  yield takeEvery(startFetchStore, fillProductStore);
  yield takeEvery(nextPage, fillProductStore);
  yield takeEvery(prevPage, fillProductStore);
}
