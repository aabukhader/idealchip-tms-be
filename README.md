# Task Management System

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Prepare Project

- You should have docker installed and Running
- The node version used is 20.10.0
- Run ```npm install```
- Run ```docker compose  -f "docker-compose.yml" up -d --build Postgres```
- Run ```npx prisma migrate dev --name init``` to setup the database
- Create ```.env``` file from ```.env Copy```
- Run ```npm run start:dev```

## Todo

- Add Authentication and authrization
- Allow the user to create more lists per board
- Fully activate the history registry of the ticket updates
