# SeeEvent

Create or find interesting events

This is a **monorepo**:

```
see-event/
├── frontend/        React 18 + Vite + TypeScript + TanStack Query (see frontend/README.md)
├── backend/         Express + TypeScript REST API           (see backend/README.md)
├── Dockerfile       Combined production image (backend serves the frontend build)
├── .dockerignore
├── netlify.toml     Frontend deploy config (base = frontend)
└── .github/, .gitlab-ci.yml   CI/CD for both apps
```

## Quick start (local dev)

Run the two apps in separate terminals:

```bash
# 1) Backend  →  http://localhost:4000
cd backend
npm install
cp .env.example .env
npm run dev

# 2) Frontend →  http://localhost:3000
cd frontend
npm install
cp .env.example .env      # VITE_API_BASE_URL defaults to http://localhost:4000
npm run dev
```

See [frontend/README.md](./frontend/README.md) and [backend/README.md](./backend/README.md)
for per-app scripts, env vars, and the API reference.

## Run as a single container (Docker)

The root [`Dockerfile`](./Dockerfile) builds the frontend to static files, builds
the backend, and runs the backend — which serves both the API and the frontend
build on one port:

```bash
docker build -t see-event .
docker run -p 4000:4000 see-event
# open http://localhost:4000
```

When `CLIENT_BUILD_DIR` is set (the image sets it automatically), the backend
serves the SPA; otherwise it runs as a JSON-only API. The build arg
`VITE_API_BASE_URL` defaults to empty so the frontend calls the API on the same
origin.

## CI/CD

Pipelines run on **both GitHub and GitLab** off the `main` branch, each scoped by
path so frontend-only changes don't trigger the backend pipeline and vice versa:

- GitHub Actions: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) (frontend → Netlify) and [`.github/workflows/backend-ci.yml`](./.github/workflows/backend-ci.yml)
- GitLab CI: [`.gitlab-ci.yml`](./.gitlab-ci.yml) — `fe:*` and `be:*` jobs, plus SAST

### Required secrets / variables (for the frontend Netlify deploy)

| Name                 | GitHub                  | GitLab         | Purpose                      |
| -------------------- | ----------------------- | -------------- | ---------------------------- |
| `VITE_API_BASE_URL`  | Repository **variable** | CI/CD variable | Backend URL baked into build |
| `NETLIFY_AUTH_TOKEN` | Repository **secret**   | CI/CD variable | Netlify auth (deploy)        |
| `NETLIFY_SITE_ID`    | Repository **secret**   | CI/CD variable | Target Netlify site          |
