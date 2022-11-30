import { put, takeEvery, call, select } from 'redux-saga/effects';
import { updateCartSessionStorage } from '../../services/cart';
import { CartT } from '../../types/cart';
import { ProductT } from '../../types/product';
import { addToCart, removeFromCart, updateCart } from '../reducers/cart';
import { selectCart } from '../selectors';

function* addAndUpdateCartState({ payload }: {payload: ProductT}) {
  const cart: CartT = yield select(selectCart);

  const item = cart[payload.id];

  if (!item) {
    const newCart = {
      ...cart,
      [payload.id]: {
        quantity: 1,
        product: payload,
      },
    };

    yield call(updateCartSessionStorage, newCart);
    yield put(updateCart(newCart));
    return;
  }

  const { quantity } = item;
  if (quantity === payload.stock) return;

  const newCart = {
    ...cart,
    [payload.id]: {
      quantity: quantity + 1,
      product: payload,
    },
  };

  yield call(updateCartSessionStorage, newCart);
  yield put(updateCart(newCart));
}

function* removeAndUpdateCartState({ payload }: {payload: number}) {
  const cart: CartT = yield select(selectCart);
  const { quantity } = cart[payload];

  if (quantity > 1) {
    const newCart = {
      ...cart,
      [payload]: {
        quantity: quantity - 1,
        product: { ...cart[payload].product },
      },
    };

    yield call(updateCartSessionStorage, newCart);
    yield put(updateCart(newCart));
    return;
  }

  const newCart = { ...cart };
  delete newCart[payload];

  yield call(updateCartSessionStorage, newCart);
  yield put(updateCart(newCart));
}

export default function* storeSaga() {
  yield takeEvery(addToCart, addAndUpdateCartState);
  yield takeEvery(removeFromCart, removeAndUpdateCartState);
}
