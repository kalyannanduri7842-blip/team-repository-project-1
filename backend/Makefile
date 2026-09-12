.PHONY: install build dev start test seed generate clean docker-build docker-up

install:
	npm install

build:
	npm run build

dev:
	npm run dev

start:
	npm start

test:
	npm test

seed:
	npm run prisma:seed

generate:
	npm run prisma:generate

clean:
	rm -rf dist coverage node_modules

docker-build:
	docker build -t crm-backend:latest .

docker-up:
	docker-compose up -d
