# SeeEvent — Frontend

The SeeEvent SPA. Part of the [see-event monorepo](../README.md); the API lives in
[`../backend`](../backend).

## Tech stack

| Concern       | Choice                                           |
| ------------- | ------------------------------------------------ |
| Build tool    | [Vite 5](https://vitejs.dev)                     |
| UI            | React 18 + TypeScript                            |
| Components    | MUI v5 (`@mui/material`)                          |
| Server state  | [TanStack Query v5](https://tanstack.com/query)  |
| Routing       | React Router v6                                  |
| HTTP          | Axios (single configured client)                 |
| Lint / format | ESLint + Prettier                                |
| Tests         | Vitest + Testing Library                         |

## Getting started

```bash
npm install
cp .env.example .env   # adjust VITE_API_BASE_URL if needed
npm run dev            # http://localhost:3000
```

Start the [backend](../backend) first (defaults to `http://localhost:4000`).

## Scripts

| Script              | Description                                |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Start the Vite dev server                  |
| `npm run build`     | Typecheck (`tsc -b`) and build to `build/` |
| `npm run preview`   | Preview the production build               |
| `npm run lint`      | ESLint (zero warnings allowed)             |
| `npm run typecheck` | TypeScript, no emit                        |
| `npm run test`      | Run the Vitest suite once                  |
| `npm run format`    | Prettier write                             |

## Environment

| Variable            | Description                           | Default                 |
| ------------------- | ------------------------------------- | ----------------------- |
| `VITE_API_BASE_URL` | Base URL of the SeeEvent backend API  | `http://localhost:4000` |

All API access goes through [`src/lib/apiClient.ts`](./src/lib/apiClient.ts), which
reads the base URL from this variable and attaches the auth token automatically —
no hardcoded API URLs. An empty value makes requests same-origin (used by the
combined Docker image).

## Project structure

```
src/
  api/         TanStack Query hooks (events, comments, auth)
  assets/      Images and SVGs
  components/  layout/ · cards/ · common/ · event-detail/ · search-filter/
  lib/         apiClient, queryClient
  pages/       Home, Search, Detail, SignIn, SignUp, MyAccount, NotFound
  types/       Shared TypeScript types
  utils/       validate
  test/        Vitest setup + render helper
```

## CI/CD

Defined at the repo root and path-scoped to `frontend/**`:
[`../.github/workflows/ci.yml`](../.github/workflows/ci.yml) (GitHub, deploys to
Netlify) and the `fe:*` jobs in [`../.gitlab-ci.yml`](../.gitlab-ci.yml). Netlify
build settings live in [`../netlify.toml`](../netlify.toml).
