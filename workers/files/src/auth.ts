import type { Env } from './index';

export interface Identity {
  userId: string;
  token: string;
}

const JWKS_URL =
  'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com';
const CLOCK_SKEW_SEC = 300;

interface KeyCache {
  keys: Map<string, CryptoKey>;
  expiresAt: number;
}

let keyCache: KeyCache | null = null;

export async function authenticate(
  request: Request,
  env: Env,
): Promise<Identity | null> {
  const header = request.headers.get('Authorization') ?? '';
  const match = /^Bearer\s+(.+)$/i.exec(header);
  const token = match?.[1]?.trim();
  if (!token) return null;

  const identity = await verifyFirebaseIdToken(token, env);
  return identity ? { ...identity, token } : null;
}

async function verifyFirebaseIdToken(
  token: string,
  env: Env,
): Promise<Omit<Identity, 'token'> | null> {
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
    const refreshed = await fetchSigningKeys();
    if (refreshed.keys.size > 0) {
      keyCache = refreshed;
    }
  }
  return keyCache?.keys.get(kid) ?? null;
}

async function fetchSigningKeys(): Promise<KeyCache> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  let response: Response;
  try {
    response = await fetch(JWKS_URL, { signal: controller.signal });
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('[auth] failed to fetch signing keys', error);
    return { keys: new Map(), expiresAt: 0 };
  }
  clearTimeout(timeoutId);

  if (!response.ok) {
    console.error('[auth] JWKS fetch returned non-OK status', response.status);
    return { keys: new Map(), expiresAt: 0 };
  }

  let body: { keys?: (JsonWebKey & { kid?: string })[] };
  try {
    body = (await response.json()) as {
      keys?: (JsonWebKey & { kid?: string })[];
    };
  } catch (error) {
    console.error('[auth] failed to parse JWKS response', error);
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
      // Skip unusable key.
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

function decodeJson(segment: string): Record<string, unknown> | null {
  try {
    return JSON.parse(
      atob(segment.replace(/-/g, '+').replace(/_/g, '/')),
    ) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function base64UrlToBytes(segment: string): ArrayBuffer | null {
  try {
    const binary = atob(segment.replace(/-/g, '+').replace(/_/g, '/'));
    const buffer = new ArrayBuffer(binary.length);
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return buffer;
  } catch {
    return null;
  }
}
