# Бэкенд (`server/`)

Fastify + `@fastify/autoload`: `server/app.js` автоматически подгружает всё из `plugins/` и `routes/`. Новый эндпоинт — просто новый файл в `server/routes/api/` (префикс `/api/...` берётся из структуры каталогов), новый плагин — файл в `server/plugins/` (оборачивается в `fastify-plugin`, если нужен глобальный scope).

Данных нет — есть статический снапшот. `server/data/products.json` (загружается через `createRequire` в `server/data/products.js`) и картинки в `public/product-images/` генерируются скриптом `server/scripts/seed.mjs` из датасета DummyJSON; скрипт скачивает изображения и переписывает URL на локальные пути, чтобы приложение не зависело от `dummyjson.com` в рантайме. Файл `server/data/products.json` исключён из проверок линтера.

Серверные тесты используют `server/test/helper.js` (`build()` собирает Fastify-инстанс из плагина приложения) и `app.inject()`. В каждом серверном тест-файле обязателен заголовок `// @vitest-environment node`, потому что глобальное окружение vitest — `jsdom` (см. `vite.config.js`).
