install:
	pnpm install --frozen-lockfile

start:
	pnpm run dev

build:
	pnpm run build

seed:
	node server/scripts/seed.js

preview:
	pnpm run preview

test:
	pnpm run test

# Ключи переводов вынимаются из кода, объявления ресурсов генерируются из en:
# руками ни src/locales/<lng>/translation.json, ни src/@types не правятся.
i18n-extract:
	npx i18next-cli extract

i18n-types:
	npx i18next-cli types

# Что переведено в ru и es, а что отстало от en.
i18n-status:
	npx i18next-cli status

lint:
	pnpm --silent run lint
	pnpm --silent run format:check

lint-fix:
	pnpm --silent run lint:fix

compose-production:
	docker compose -f docker-compose.production.yml down -v --remove-orphans
	docker compose -f docker-compose.production.yml build
	docker compose -f docker-compose.production.yml up --abort-on-container-exit
