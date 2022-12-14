import { put, takeEvery, call, select } from 'redux-saga/effects';
import fetchStore from '../../services/fetchStore';
import { DummyStoreResponseT } from '../../types/dummyStoreResponse';
import { updateStoreState, nextPage, prevPage, startFetchStore, fetchError } from '../reducers/store';
import { selectSkip } from '../selectors';

function* fillProductStore() {
  const skip: number = yield select(selectSkip);
  try {
    const storeData: DummyStoreResponseT = yield call({ context: null, fn: fetchStore }, skip);

    yield put(updateStoreState(storeData));
  } catch (e) {
    yield put(fetchError(e));
  }
}

export default function* storeSaga() {
  yield takeEvery(startFetchStore, fillProductStore);
  yield takeEvery(nextPage, fillProductStore);
  yield takeEvery(prevPage, fillProductStore);
}
