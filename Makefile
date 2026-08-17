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

lint:
	pnpm --silent run lint
	pnpm --silent run format:check

lint-fix:
	pnpm --silent run lint:fix

compose-production:
	docker compose -f docker-compose.production.yml down -v --remove-orphans
	docker compose -f docker-compose.production.yml build
	docker compose -f docker-compose.production.yml up --abort-on-container-exit
