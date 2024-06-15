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
- The node verison used is 20.10.0
- Run ```npm install```
- Run ```docker compose  -f "docker-compose.yml" up -d --build postgres```
- Run ```npx prisma migrate dev --name init``` to setup the database
- Run ```npm run start:dev```

## Todo

- Add Authintaction and authrization
- Allow the user to create more lists per board
- Fully activate the history rehistry of the tickets updates
