# Smart Scheduler

Mini-system for managing service appointments, built as a technical challenge.

## Features

- Create service appointments
- List appointments
- Delete appointments
- Validate required fields
- Prevent appointments in past dates

## Stack

- Node.js
- Express
- React
- Vite
- PostgreSQL
- Docker Compose
- node-pg-migrate
- Jest
- Supertest
- ESLint
- Prettier
- GitHub Actions

## Requirements

- Node.js 22
- npm
- Docker
- Docker Compose

## Environment Files

The project uses two local environment files:

- `.env.development`
- `.env.test`

Both files are committed with local Docker credentials for easier setup.

## Install Dependencies

```bash
npm install
```

## Start The Database

```bash
npm run services:up
```

## Run Migrations

Development database:

```bash
npm run migrations:up
```

Test database:

```bash
npm run migrations:up:test
```

## Start The Backend

```bash
npm run dev:backend
```

Backend runs on:

```txt
http://localhost:3000
```

Health check routes:

```txt
GET /health
GET /health/database
```

## Start The Frontend

In another terminal:

```bash
npm run dev:frontend
```

Frontend runs on:

```txt
http://localhost:5173
```

## Run Tests

```bash
npm test
```

## Run Lint And Format Checks

```bash
npm run lint
npm run format:check
```

Auto-format files:

```bash
npm run format:write
```

## Build Frontend

```bash
npm run build
```

## API Routes

### List Appointments

```txt
GET /appointments
```

### Create Appointment

```txt
POST /appointments
```

Body:

```json
{
  "clientName": "Maria Silva",
  "appointmentDate": "2026-07-10",
  "appointmentTime": "14:30",
  "serviceDescription": "Haircut"
}
```

### Delete Appointment

```txt
DELETE /appointments/:id
```

## Database

The project uses PostgreSQL with SQL migrations managed by `node-pg-migrate`.

Migration files are stored in:

```txt
backend/migrations
```

## Commit Convention

This project uses Commitizen and Conventional Commits.

```bash
npm run commit
```

## CI

GitHub Actions runs on pull requests and pushes to `main`.

The workflow checks:

- lint
- formatting
- database migrations
- backend tests
- frontend build
