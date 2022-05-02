.PHONY: install test

include ./config/make/variables.mk

default: build-images install

## Open a bash session in the NodeJS container
bash:
	bin/docker-compose run --rm --entrypoint bash node

## Force rebuild Docker images
build-images:
	bin/docker-compose build

## Install the project. Useful after the first clone or to refresh the project.
install: install-app install-server

## Install the frontend's dependencies. Useful after the first clone or to refresh the project.
install-app:
	bin/yarn

## Install the server's dependencies. Useful after the first clone or to refresh the project.
install-server:
	bin/yarn --cwd api

## Run the linter on the src directory.
lint:
	bin/yarn lint

## Run the linter on the src directory and fix any error encountered.
lint-fix:
	bin/yarn lint:fix

## Displays running container logs
logs:
	bin/docker-compose logs --tail 200 -f

## Restart the development server
restart: stop start

## Starts the app and server
start:
	bin/docker-compose up -d app server

## Starts the app and server with output in the terminal
start-debug:
	bin/docker-compose up app server

## Start the app's development server
start-app:
	bin/docker-compose up -d app

## Start the app's development server with output in the terminal
start-app-debug:
	bin/docker-compose up app

## Start the server's development server
start-server:
	bin/docker-compose up -d server

## Start the server's development server with output in the terminal
start-server-debug:
	bin/docker-compose up server

## Display status of running containers
status:
	bin/docker-compose ps

## Stops running app and server
stop:
	bin/docker-compose kill
	bin/docker-compose down --remove-orphans

## Run all tests
test:
	bin/yarn test

## Run the app's tests
test-app:
	bin/yarn test:app

## Run the server's tests
test-server:
	bin/yarn test:server

## Run all tests in watch mode
test-watch:
	bin/yarn test:watch

include ./config/make/help-target.mk
