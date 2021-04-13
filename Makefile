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
install:
	bin/yarn

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

## Start the development server
start:
	bin/docker-compose up -d app

## Start the development server with output in the terminal
start-debug:
	bin/docker-compose up app

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

## Run all tests in watch mode
test-watch:
	bin/yarn test:watch

include ./config/make/help-target.mk
