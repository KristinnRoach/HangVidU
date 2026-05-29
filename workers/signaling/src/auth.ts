import type { Env } from './index';

/**
 * Provider-agnostic identity seam. The rest of the worker only ever sees
 * `{ userId }` — it never learns the token came from Firebase. Migrating to a
 * different auth provider later means rewriting only this file.
 */
export interface Identity {
  userId: string;
}

export class AuthError extends Error {}

/**
 * Authenticate a WebSocket-upgrade request. The client passes its token via the
 * `Sec-WebSocket-Protocol` header (browsers cannot set arbitrary headers on the
 * WebSocket handshake, but subprotocols are allowed): `["bearer", "<token>"]`.
 */
export async function authenticate(
  request: Request,
  env: Env,
): Promise<Identity> {
  const protocols = request.headers.get('Sec-WebSocket-Protocol') ?? '';
  const parts = protocols.split(',').map((p) => p.trim());
  const token = parts[0] === 'bearer' ? parts[1] : undefined;
  if (!token) throw new AuthError('missing token');

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
async function verifyFirebaseIdToken(
  token: string,
  env: Env,
): Promise<Identity> {
  const claims = decodeJwtClaims(token);
  const projectId = env.FIREBASE_PROJECT_ID;

  if (claims.aud !== projectId) throw new AuthError('bad audience');
  if (claims.iss !== `https://securetoken.google.com/${projectId}`) {
    throw new AuthError('bad issuer');
  }
  if (typeof claims.exp !== 'number' || claims.exp * 1000 <= Date.now()) {
    throw new AuthError('token expired');
  }
  const userId = claims.sub;
  if (typeof userId !== 'string' || !userId) throw new AuthError('no subject');

  return { userId };
}

function decodeJwtClaims(token: string): Record<string, unknown> {
  const segments = token.split('.');
  if (segments.length !== 3) throw new AuthError('malformed token');
  try {
    const json = atob(segments[1].replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    throw new AuthError('undecodable claims');
  }
}
