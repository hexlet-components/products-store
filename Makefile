install:
	npm ci

start:
	npm run dev

build:
	npm run build

preview:
	npm run preview

test:
	npm run test

lint:
	npx biome check .

lint-fix:
	npx biome check --write .

compose-production:
	docker compose -f docker-compose.production.yml down -v --remove-orphans
	docker compose -f docker-compose.production.yml build
	docker compose -f docker-compose.production.yml up --abort-on-container-exit
