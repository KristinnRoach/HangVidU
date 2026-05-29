import type { Env } from './index';

/**
 * Provider-agnostic identity seam. The rest of the worker only ever sees
 * `{ userId }` — it never learns the token came from Firebase. Migrating to a
 * different auth provider later means rewriting only this file.
 *
 * Returns `null` on any failure rather than throwing: auth rejection is an
 * expected, non-exceptional outcome on the request path.
 */
export interface Identity {
  userId: string;
}

/**
 * Authenticate a WebSocket-upgrade request. The client passes its token via the
 * `Sec-WebSocket-Protocol` header (browsers cannot set arbitrary headers on the
 * WebSocket handshake, but subprotocols are allowed): `["bearer", "<token>"]`.
 */
export async function authenticate(
  request: Request,
  env: Env,
): Promise<Identity | null> {
  const protocols = request.headers.get('Sec-WebSocket-Protocol') ?? '';
  const parts = protocols.split(',').map((p) => p.trim());
  const token = parts[0] === 'bearer' ? parts[1] : undefined;
  if (!token) return null;

  return verifyFirebaseIdToken(token, env);
}

/**
 * Firebase ID token verification.
 *
 * SLICE 1 SCOPE: decodes the JWT and validates the unsigned claims
 * (iss / aud / exp) against the configured project. This is intentionally
 * minimal — see TODO below.
 *
 * TODO(before real users): verify the RS256 signature against Google's public
 * certs (https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com),
 * cached by the `Cache-Control` max-age. Without this, claims are unauthenticated.
 * Kept out of slice 1 deliberately; auth provider is also expected to change.
 */
function verifyFirebaseIdToken(token: string, env: Env): Identity | null {
  const claims = decodeJwtClaims(token);
  if (!claims) return null;

  const projectId = env.FIREBASE_PROJECT_ID;
  if (claims.aud !== projectId) return null;
  if (claims.iss !== `https://securetoken.google.com/${projectId}`) return null;
  if (typeof claims.exp !== 'number' || claims.exp * 1000 <= Date.now()) {
    return null;
  }

  const userId = claims.sub;
  return typeof userId === 'string' && userId ? { userId } : null;
}

function decodeJwtClaims(token: string): Record<string, unknown> | null {
  const segments = token.split('.');
  if (segments.length !== 3) return null;
  try {
    const json = atob(segments[1].replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}
