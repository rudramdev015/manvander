// Base URL of the Node/Express API. Set VITE_API_URL in .env (and in
// Vercel's project env vars) once the backend is deployed, e.g.
// https://house-of-echoes-api.onrender.com
const API_URL = import.meta.env.VITE_API_URL || '';

const TOKEN_KEY = 'hoe_admin_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  if (!API_URL) {
    throw new Error('VITE_API_URL is not set - the site is running on its built-in static content only.');
  }

  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

// ---- Public content (used by CMSContext) ----
export const fetchAllSections = () => request('/api/sections');
export const fetchItems = (collection) => request(`/api/items/${collection}`);

// ---- Auth ----
export const login = (email, password) =>
  request('/api/auth/login', { method: 'POST', body: { email, password } });
export const fetchMe = () => request('/api/auth/me', { auth: true });

// ---- Dashboard (authenticated) ----
export const saveSection = (key, data) =>
  request(`/api/sections/${key}`, { method: 'PUT', body: data, auth: true });

export const createItem = (collection, data) =>
  request(`/api/items/${collection}`, { method: 'POST', body: data, auth: true });
export const updateItem = (collection, id, data) =>
  request(`/api/items/${collection}/${id}`, { method: 'PUT', body: data, auth: true });
export const deleteItem = (collection, id) =>
  request(`/api/items/${collection}/${id}`, { method: 'DELETE', auth: true });
export const reorderItems = (collection, ids) =>
  request(`/api/items/${collection}/reorder`, { method: 'PUT', body: { ids }, auth: true });

export async function uploadFile(file) {
  if (!API_URL) throw new Error('VITE_API_URL is not set.');
  const formData = new FormData();
  formData.append('file', file);
  const token = getToken();
  const res = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || 'Upload failed');
  return data;
}

export const isApiConfigured = () => Boolean(API_URL);
