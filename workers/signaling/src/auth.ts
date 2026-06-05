import type { Env } from './index';

/**
 * Provider-agnostic identity seam. The rest of the worker only ever sees
 * `{ userId }` — it never learns the token came from Firebase. Migrating to a
 * different auth provider later means rewriting only this file's internals.
 *
 * Returns `null` on any failure rather than throwing: auth rejection is an
 * expected, non-exceptional outcome on the request path.
 */
export interface Identity {
  userId: string;
}

/** Google's public keys for Firebase ID tokens, in JWK form. */
const JWKS_URL =
  'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com';
const CLOCK_SKEW_SEC = 300;

interface KeyCache {
  keys: Map<string, CryptoKey>;
  expiresAt: number;
}
// Per-isolate cache, refreshed per the JWKS response's Cache-Control max-age.
let keyCache: KeyCache | null = null;

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
 * Verify a Firebase ID token: validates the standard claims (aud / iss / exp /
 * iat / sub) and the RS256 signature against Google's published public keys.
 *
 * This is the minimum required for production. To move off Firebase later,
 * replace the claim expectations + key source below; the `{ userId }` contract
 * and the `authenticate()` seam stay put.
 */
async function verifyFirebaseIdToken(
  token: string,
  env: Env,
): Promise<Identity | null> {
  const segments = token.split('.');
  if (segments.length !== 3) return null;
  const [headerB64, payloadB64, signatureB64] = segments;

  const header = decodeJson(headerB64);
  const claims = decodeJson(payloadB64);
  if (!header || !claims) return null;
  if (header.alg !== 'RS256' || typeof header.kid !== 'string') return null;

  const projectId = env.FIREBASE_PROJECT_ID;
  const now = Math.floor(Date.now() / 1000);
  if (claims.aud !== projectId) return null;
  if (claims.iss !== `https://securetoken.google.com/${projectId}`) return null;
  if (typeof claims.exp !== 'number' || claims.exp <= now) return null;
  if (typeof claims.iat !== 'number' || claims.iat > now + CLOCK_SKEW_SEC) {
    return null;
  }
  if (
    typeof claims.auth_time === 'number' &&
    claims.auth_time > now + CLOCK_SKEW_SEC
  ) {
    return null;
  }
  if (typeof claims.sub !== 'string' || !claims.sub) return null;

  const key = await getSigningKey(header.kid);
  if (!key) return null;

  const signature = base64UrlToBytes(signatureB64);
  if (!signature) return null;
  const signed = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const valid = await crypto.subtle.verify(
    'RSASSA-PKCS1-v1_5',
    key,
    signature,
    signed,
  );
  if (!valid) return null;

  return { userId: claims.sub };
}

async function getSigningKey(kid: string): Promise<CryptoKey | null> {
  if (!keyCache || keyCache.expiresAt <= Date.now()) {
    keyCache = await fetchSigningKeys();
  }
  return keyCache.keys.get(kid) ?? null;
}

async function fetchSigningKeys(): Promise<KeyCache> {
  let response: Response;
  try {
    response = await fetch(JWKS_URL);
  } catch {
    return { keys: new Map(), expiresAt: 0 };
  }
  if (!response.ok) return { keys: new Map(), expiresAt: 0 };

  let body: { keys?: (JsonWebKey & { kid?: string })[] };
  try {
    body = (await response.json()) as {
      keys?: (JsonWebKey & { kid?: string })[];
    };
  } catch {
    return { keys: new Map(), expiresAt: 0 };
  }
  const keys = new Map<string, CryptoKey>();
  for (const jwk of body.keys ?? []) {
    if (typeof jwk.kid !== 'string') continue;
    try {
      keys.set(
        jwk.kid,
        await crypto.subtle.importKey(
          'jwk',
          jwk,
          { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
          false,
          ['verify'],
        ),
      );
    } catch {
      // skip unusable key
    }
  }
  const maxAge = parseMaxAge(response.headers.get('Cache-Control'));
  return { keys, expiresAt: Date.now() + maxAge * 1000 };
}

function parseMaxAge(cacheControl: string | null): number {
  const match = cacheControl?.match(/max-age=(\d+)/);
  const seconds = match ? Number(match[1]) : 3600;
  return Number.isFinite(seconds) && seconds > 0 ? seconds : 3600;
}

function base64UrlToBase64(segment: string): string {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  return base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
}

function decodeJson(segment: string): Record<string, unknown> | null {
  try {
    return JSON.parse(atob(base64UrlToBase64(segment))) as Record<
      string,
      unknown
    >;
  } catch {
    return null;
  }
}

function base64UrlToBytes(segment: string): Uint8Array | null {
  try {
    const binary = atob(base64UrlToBase64(segment));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}
