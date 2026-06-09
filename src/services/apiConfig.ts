// Base URL of the internal products API.
// Defaults to the same-origin `/api` (Fastify in prod, Vite proxy in dev);
// override with VITE_API_URL when the API is hosted elsewhere.
export const API_BASE = import.meta.env.VITE_API_URL ?? '/api';
