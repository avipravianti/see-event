import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

/**
 * Shared axios instance. Centralises the base URL (from env, no more hardcoded
 * Heroku URLs) and automatically attaches the auth token on every request.
 *
 * No fixed Content-Type: axios sets `application/json` for plain objects and
 * `multipart/form-data` (with boundary) for FormData uploads automatically.
 */
export const apiClient = axios.create({
  baseURL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.set('token', token);
  }
  return config;
});

export const TOKEN_KEY = 'token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('isAuthenticated');
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}
