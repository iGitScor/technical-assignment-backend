.SILENT:
.PHONY: help

include Makefile.test

# Parameters
CUSTOMER_EMAIL ?= "john@doe.eu"
CUSTOMER_NAME ?= "John Doe"

# Dependencies
#SHELL := /bin/zsh
NVM := $(shell command -v nvm current 2> /dev/null)

## Help
help:
	printf "${COLOR_COMMENT}Usage:${COLOR_RESET}\n"
	printf " make [target]\n\n"
	printf "${COLOR_COMMENT}Available targets:${COLOR_RESET}\n"
	awk '/^[a-zA-Z\-\_0-9\.@]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf " ${COLOR_INFO}%-16s${COLOR_RESET} %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

## Install project
install:
	$(call node_exec, npm install)
	docker-compose build

## Start project with Docker
start:
	docker-compose up -d --no-recreate

down:
	docker-compose down

reboot:
	$(MAKE) down
	$(MAKE) start

##########
# Macros #
##########

define node_exec ## Execute command inside docker node container
	docker run --rm -v $(CURDIR):/app -w /app node:20 $(1)
endef