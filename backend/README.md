# SeeEvent — Backend API

REST API for the [SeeEvent frontend](../README.md): events, authentication, and
comments. Built with **Express + TypeScript**. Data is held in an in-memory store
so the API runs without a database; swap the store in `src/data/store.ts` for a
real persistence layer without changing the route contracts.

## Getting started

```bash
npm install
cp .env.example .env
npm run dev            # http://localhost:4000 (tsx watch)
```

## Scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Dev server with hot reload (tsx)     |
| `npm run build`     | Compile TypeScript to `dist/`        |
| `npm run start`     | Run the compiled server              |
| `npm run typecheck` | TypeScript, no emit                  |
| `npm run lint`      | ESLint (zero warnings allowed)       |
| `npm run test`      | Vitest + Supertest API tests         |

## Environment

| Variable      | Description                                       | Default                 |
| ------------- | ------------------------------------------------- | ----------------------- |
| `PORT`        | Port the server listens on                        | `4000`                  |
| `CORS_ORIGIN` | Comma-separated allowed origins (frontend)        | `http://localhost:3000` |
| `JWT_SECRET`  | Secret used to sign JWT auth tokens               | `dev-secret-change-me`  |

## API

| Method | Path             | Auth | Description                         | Response                      |
| ------ | ---------------- | ---- | ----------------------------------- | ----------------------------- |
| GET    | `/health`        | —    | Health check                        | `{ status }`                  |
| GET    | `/events/home`   | —    | Events starting soon (home feed)    | `{ dataStarted: Event[] }`    |
| GET    | `/events`        | —    | All events                          | `{ events: Event[] }`         |
| GET    | `/events/:id`    | —    | Single event                        | `{ data: Event }`             |
| POST   | `/users/signup`  | —    | Register a user                     | `{ message, data }`           |
| POST   | `/users/signin`  | —    | Sign in, returns JWT                | `{ token, data }`             |
| GET    | `/users`         | ✔    | Current authenticated user          | `{ data: UserDetail }`        |
| GET    | `/comments`      | —    | List comments                       | `{ data: Comment[] }`         |
| POST   | `/comments`      | —    | Add a comment                       | `{ data: Comment }`           |

Authenticated requests send the JWT via a `token` header (the convention the
frontend uses) or `Authorization: Bearer <token>`.

Seeded demo login: `pratur345@gmail.com` / `secret123`.

## Project structure

```
src/
  config/      env loading
  data/        in-memory store + seed data
  middleware/  auth (JWT), error handling
  routes/      events, users, comments
  types/       shared types
  app.ts       Express app factory
  index.ts     server bootstrap
```

## CI/CD

The backend lives in the [`see-event` monorepo](../README.md); its CI is defined
at the repo root (install → lint → typecheck → test → build):

- GitHub Actions: [`../.github/workflows/backend-ci.yml`](../.github/workflows/backend-ci.yml) (path-scoped to `backend/**`)
- GitLab CI: [`../.gitlab-ci.yml`](../.gitlab-ci.yml) — `be:*` jobs, plus the built-in SAST scan
