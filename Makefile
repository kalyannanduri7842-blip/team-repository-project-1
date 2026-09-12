.PHONY: install dev build start frontend backend test docker clean

install:
	cd frontend && npm install
	cd backend && npm install
	cd backend && npx prisma generate || true

dev:
	@echo "Start backend: make backend"
	@echo "Start frontend: make frontend"

frontend:
	cd frontend && npm run dev

backend:
	cd backend && npm run dev

build:
	cd frontend && npm run build
	cd backend && npm run build

start:
	cd backend && npm start

test:
	cd frontend && npm test
	cd backend && npm test

docker:
	docker compose up -d --build

clean:
	rm -rf frontend/node_modules backend/node_modules frontend/dist backend/dist
