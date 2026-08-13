# Фронтенд (`src/`)

React 19 + Redux Toolkit + **redux-saga** (thunk отключён явно в `src/store/index.ts`).

Поток данных — строго через саги, компоненты не делают fetch напрямую (единственное исключение — POST заказа в `src/containers/Cart/Cart.tsx`):

1. Компонент диспатчит «стартовый» экшен (`startFetchStore`, `startFetchProduct`, `addToCart`, ...).
2. Редьюсер на этом экшене только выставляет `isLoading` / ничего не меняет (`addToCart: (state) => state`).
3. Сага (`src/store/sagas/*`) слушает тот же экшен, вызывает сервис из `src/services/*` и диспатчит экшен-результат (`updateStoreState`, `addProduct`, `updateCart`).

Корзина живёт в `sessionStorage`: `cartSlice` инициализируется из `getCartFromSessionStorage()`, а `cartSaga` при каждом изменении сначала пишет в storage (`updateCartSessionStorage`), затем кладёт новый объект в стор через `updateCart`. Форма корзины — словарь `{ [productId]: { quantity, product } }`.

Пагинация серверная и «слепая»: `nextPage`/`prevPage` меняют только `skip` в сторе, а `storeSaga` слушает эти же экшены и перезапрашивает страницу. Фильтры (`src/containers/SideBar/SideBar.tsx` + `filterProducts` в `src/utilities/index.ts`) работают **только по текущей странице**, уже лежащей в сторе, — это не серверная фильтрация.

Селекторы — в `src/store/selectors/index.js` (без reselect, часть из них вычисляет производные значения на каждый вызов).

`SideBar` передаёт результат фильтрации наверх через колбэк `changeFilteredProducts`, который в `Store.tsx` обёрнут в `useCallback` — это защита от бесконечного цикла ре-рендеров (был реальный баг, см. коммит `3149599`). Не убирай мемоизацию.
