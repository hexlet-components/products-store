# Фронтенд (`src/`)

React 19 + Mantine + TanStack Query + zustand.

Поток данных разделён по природе состояния:

1. **Данные магазина** живут в кеше запросов. Хуки — `src/services/queries.ts`
   (`useProducts(skip)`, `useProduct(id)`), они вызывают сервисы из
   `src/services/*`. Компоненты страниц показывают `FallBack`, пока запрос в
   `isPending`.
2. **Клиентское состояние** живёт в zustand: корзина (`src/store/cart.ts`) и
   смещение страницы (`src/store/pagination.ts`).

Единственный fetch вне этого потока — POST заказа в
`src/containers/Cart/Cart.tsx`.

Корзина живёт в `sessionStorage`: стор инициализируется из
`getCartFromSessionStorage()`, а каждое изменение сначала пишет в storage
(`updateCartSessionStorage`) и только потом обновляет состояние. Форма корзины —
словарь `{ [productId]: { quantity, product } }`. Количество упирается в `stock`.

Пагинация серверная и «слепая»: `nextPage`/`prevPage` меняют только `skip`, а
ключ запроса собран из него, поэтому страница перезапрашивается сама. Границы
проверяются в `Store.tsx` по `limit` и `total` из ответа. Фильтры
(`src/containers/SideBar/SideBar.tsx` плюс `filterProducts` в
`src/utilities/index.ts`) работают **только по текущей странице** — это не
серверная фильтрация.

`SideBar` передаёт результат фильтрации наверх через колбэк
`changeFilteredProducts`, который в `Store.tsx` обёрнут в `useCallback` — это
защита от бесконечного цикла ре-рендеров (был реальный баг, см. коммит
`3149599`). Не убирай мемоизацию.

Выпадающий список (`src/components/Dropdown`) и модальное окно
(`src/components/Modal`) собраны руками, а не взяты из Mantine: у `Menu` и
`Modal` своя логика закрытия по Escape и клику вне, и подмена изменила бы
поведение приложения, по которому написаны тест-кейсы проекта.
