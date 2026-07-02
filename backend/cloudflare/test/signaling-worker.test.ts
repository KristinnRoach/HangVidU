import { env, SELF } from 'cloudflare:test';
import { afterAll, beforeAll, describe, expect, it } from 'vite-plus/test';

const PROJECT_ID = env.FIREBASE_PROJECT_ID;
const KID = 'test-key-1';
const JWKS_URL =
  'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com';

let privateKey: CryptoKey;
const originalFetch = globalThis.fetch;

function b64urlFromString(s: string): string {
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64urlFromBytes(buf: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++)
    binary += String.fromCharCode(bytes[i]);
  return b64urlFromString(binary);
}

function validClaims() {
  const now = Math.floor(Date.now() / 1000);
  return {
    aud: PROJECT_ID,
    iss: `https://securetoken.google.com/${PROJECT_ID}`,
    iat: now - 10,
    exp: now + 3600,
    sub: 'user-1',
  };
}

async function signToken(claims: Record<string, unknown>): Promise<string> {
  const headerB64 = b64urlFromString(
    JSON.stringify({ alg: 'RS256', kid: KID }),
  );
  const payloadB64 = b64urlFromString(JSON.stringify(claims));
  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', privateKey, data);
  return `${headerB64}.${payloadB64}.${b64urlFromBytes(sig)}`;
}

beforeAll(async () => {
  const pair = await crypto.subtle.generateKey(
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['sign', 'verify'],
  );
  privateKey = pair.privateKey;
  const publicJwk = await crypto.subtle.exportKey('jwk', pair.publicKey);

  // Serve our public key as Google's JWKS. The worker's auth code runs in this
  // same isolate, so stubbing the global fetch intercepts its JWKS lookup.
  const jwks = {
    keys: [{ ...publicJwk, kid: KID, alg: 'RS256', use: 'sig' }],
  };
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString();
    if (url === JWKS_URL) {
      return new Response(JSON.stringify(jwks), {
        status: 200,
        headers: { 'cache-control': 'max-age=3600' },
      });
    }
    return originalFetch(input, init);
  }) as typeof fetch;
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});

function upgrade(
  path: string,
  protocol?: string,
  origin: string | null = 'https://hangvidu.com',
): Promise<Response> {
  const headers: Record<string, string> = { Upgrade: 'websocket' };
  if (protocol) headers['Sec-WebSocket-Protocol'] = protocol;
  if (origin) headers['Origin'] = origin;
  return SELF.fetch(`https://signaling${path}`, { headers });
}

describe('signaling worker routing + auth', () => {
  it('404s unknown paths', async () => {
    expect((await SELF.fetch('https://signaling/nope')).status).toBe(404);
  });

  it('426s the room path without an Upgrade header', async () => {
    expect((await SELF.fetch('https://signaling/rooms/r1/signal')).status).toBe(
      426,
    );
  });

  it('403s a disallowed origin', async () => {
    const res = await upgrade(
      '/rooms/r1/signal',
      undefined,
      'https://evil.com',
    );
    expect(res.status).toBe(403);
  });

  it('403s a missing origin', async () => {
    const res = await upgrade('/rooms/r1/signal', undefined, null);
    expect(res.status).toBe(403);
  });

  it('401s when no token is provided (allowed origin)', async () => {
    expect((await upgrade('/rooms/r1/signal')).status).toBe(401);
  });

  it('401s an expired token', async () => {
    const token = await signToken({ ...validClaims(), exp: 1 });
    expect((await upgrade('/rooms/r1/signal', `bearer, ${token}`)).status).toBe(
      401,
    );
  });

  it('401s a wrong-audience token', async () => {
    const token = await signToken({ ...validClaims(), aud: 'someone-else' });
    expect((await upgrade('/rooms/r1/signal', `bearer, ${token}`)).status).toBe(
      401,
    );
  });

  it('401s a token with a tampered payload (bad signature)', async () => {
    const token = await signToken(validClaims());
    const [h, , s] = token.split('.');
    const forged = b64urlFromString(
      JSON.stringify({ ...validClaims(), sub: 'attacker' }),
    );
    expect(
      (await upgrade('/rooms/r1/signal', `bearer, ${h}.${forged}.${s}`)).status,
    ).toBe(401);
  });

  it('upgrades with a valid signed token', async () => {
    const token = await signToken(validClaims());
    const res = await upgrade('/rooms/r1/signal', `bearer, ${token}`);
    expect(res.status).toBe(101);
    expect(res.webSocket).toBeTruthy();
  });
});
