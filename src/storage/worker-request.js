// Tiny authed JSON client for the hangvidu-data Worker, shared by the user-scoped
// D1 adapters (contacts, profile, discovery). Boundary-clean: storage may not
// import `auth`, so the bearer token arrives via a `getToken` provider injected
// by the wiring layer. Mirrors the request helper in conversations/data-client.ts.

import {
  reportApiAuthFailure,
  reportApiOutage,
} from '../infra/api-auth-failure.js';

const REQUEST_TIMEOUT_MS = 8_000;

/**
 * @param {{ baseUrl: string, getToken: () => Promise<string|null> }} options
 */
export function createWorkerRequest({ baseUrl, getToken }) {
  const base = String(baseUrl).replace(/\/$/, '');

  /**
   * @param {string} method
   * @param {string} path
   * @param {unknown} [body]
   * @returns {Promise<any>}
   */
  return async function request(method, path, body) {
    const token = await getToken();
    if (!token) throw new Error('not authenticated');

    const res = await fetch(`${base}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!res.ok) {
      // Queries include reversible email keys; response bodies may echo them.
      // Diagnostics need only the method, route and status.
      const route = path.split(/[?#]/, 1)[0];
      if (res.status === 401) {
        reportApiAuthFailure(`data:${method} ${route}`, res.status);
      } else if (res.status >= 500) {
        reportApiOutage(`data:${method} ${route}`, res.status);
      }
      const err = new Error(`data worker ${method} ${route} -> ${res.status}`);
      err.status = res.status;
      throw err;
    }
    if (res.status === 204) return null;
    return res.json();
  };
}
