# syntax=docker/dockerfile:1
# Combined production image: builds the frontend to static files, builds the
# backend, then runs the backend which also serves the frontend build.

# ---- Stage 1: build the frontend ----------------------------------------
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
# Empty base URL => the frontend calls the API on the same origin it is served from.
ARG VITE_API_BASE_URL=""
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ---- Stage 2: build the backend -----------------------------------------
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci
COPY backend/ ./
RUN npm run build

# ---- Stage 3: production runtime ----------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app/backend
ENV NODE_ENV=production
ENV PORT=4000
# Path the backend serves the SPA from (see backend/src/app.ts).
ENV CLIENT_BUILD_DIR=/app/frontend/build

COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=frontend-builder /app/frontend/build /app/frontend/build

EXPOSE 4000
CMD ["node", "dist/index.js"]
