import { env, SELF } from 'cloudflare:test';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

const PROJECT_ID = (env as any).FIREBASE_PROJECT_ID as string;
const KID = 'test-key-1';
const ORIGIN = 'https://hangvidu.com';
const JWKS_URL =
  'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com';

let privateKey: CryptoKey;
const originalFetch = globalThis.fetch;
let allowGroupMember = false;

function b64urlFromString(s: string): string {
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlFromBytes(buf: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return b64urlFromString(binary);
}

function validClaims(sub = 'user-a') {
  const now = Math.floor(Date.now() / 1000);
  return {
    aud: PROJECT_ID,
    iss: `https://securetoken.google.com/${PROJECT_ID}`,
    iat: now - 10,
    exp: now + 3600,
    sub,
  };
}

async function signToken(claims: Record<string, unknown>): Promise<string> {
  const headerB64 = b64urlFromString(JSON.stringify({ alg: 'RS256', kid: KID }));
  const payloadB64 = b64urlFromString(JSON.stringify(claims));
  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', privateKey, data);
  return `${headerB64}.${payloadB64}.${b64urlFromBytes(sig)}`;
}

function request(
  path: string,
  {
    method = 'GET',
    token,
    origin = ORIGIN,
    body,
    contentType,
  }: {
    method?: string;
    token?: string;
    origin?: string | null;
    body?: BodyInit;
    contentType?: string;
  } = {},
) {
  const headers: Record<string, string> = {};
  if (origin) headers.Origin = origin;
  if (token) headers.Authorization = `Bearer ${token}`;
  if (contentType) headers['Content-Type'] = contentType;
  return SELF.fetch(`https://files${path}`, { method, headers, body });
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
  const jwks = {
    keys: [{ ...publicJwk, kid: KID, alg: 'RS256', use: 'sig' }],
  };

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof Request
          ? input.url
          : input.toString();
    if (url === JWKS_URL) {
      return new Response(JSON.stringify(jwks), {
        status: 200,
        headers: { 'cache-control': 'max-age=3600' },
      });
    }
    if (
      allowGroupMember &&
      (url.includes('/conversations/group%3Aabc/members/user-a.json') ||
        url.includes('/conversations/group:abc/members/user-a.json'))
    ) {
      return new Response(JSON.stringify({ role: 'member' }), { status: 200 });
    }
    return originalFetch(input, init);
  }) as typeof fetch;
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});

beforeEach(() => {
  allowGroupMember = false;
});

describe('files worker routing + auth', () => {
  it('401s when no bearer token is provided', async () => {
    const res = await request('/conversations/user-a_user-b/files/images', {
      method: 'POST',
      contentType: 'image/png',
      body: 'image',
    });

    expect(res.status).toBe(401);
  });

  it('403s a disallowed origin', async () => {
    const token = await signToken(validClaims());
    const res = await request('/conversations/user-a_user-b/files/images', {
      method: 'POST',
      token,
      origin: 'https://evil.com',
      contentType: 'image/png',
      body: 'image',
    });

    expect(res.status).toBe(403);
  });

  it('sets Vary: Origin on allowed CORS preflight responses', async () => {
    const res = await request('/conversations/user-a_user-b/files/images', {
      method: 'OPTIONS',
    });

    expect(res.status).toBe(204);
    expect(res.headers.get('Vary')).toBe('Origin');
  });

  it('lets direct-message members upload and fetch an image', async () => {
    const uploadToken = await signToken(validClaims('user-a'));
    const getToken = await signToken(validClaims('user-b'));

    const upload = await request('/conversations/user-a_user-b/files/images', {
      method: 'POST',
      token: uploadToken,
      contentType: 'image/png',
      body: new Uint8Array([1, 2, 3]),
    });

    expect(upload.status).toBe(201);
    const metadata = (await upload.json()) as {
      provider: string;
      bucket: string;
      key: string;
      fileId: string;
    };
    expect(metadata).toMatchObject({
      provider: 'r2',
      bucket: 'hangvidu-files',
      key: `user-a_user-b/${metadata.fileId}`,
    });

    const download = await request(
      `/conversations/user-a_user-b/files/${metadata.fileId}`,
      { token: getToken },
    );

    expect(download.status).toBe(200);
    expect(download.headers.get('Content-Type')).toBe('image/png');
    expect(new Uint8Array(await download.arrayBuffer())).toEqual(
      new Uint8Array([1, 2, 3]),
    );
  });

  it('403s direct-message non-members', async () => {
    const token = await signToken(validClaims('user-c'));
    const res = await request('/conversations/user-a_user-b/files/images', {
      method: 'POST',
      token,
      contentType: 'image/png',
      body: 'image',
    });

    expect(res.status).toBe(403);
  });

  it('authorizes group conversations through RTDB membership', async () => {
    const token = await signToken(validClaims('user-a'));
    allowGroupMember = true;

    const upload = await request('/conversations/group%3Aabc/files/images', {
      method: 'POST',
      token,
      contentType: 'image/webp',
      body: 'image',
    });

    expect(upload.status).toBe(201);
  });

  it('rejects oversized uploads before storing', async () => {
    const token = await signToken(validClaims());
    const res = await request('/conversations/user-a_user-b/files/images', {
      method: 'POST',
      token,
      contentType: 'image/png',
      body: new Uint8Array(5 * 1024 * 1024 + 1),
    });

    expect(res.status).toBe(413);
  });

  it('rejects non-image uploads', async () => {
    const token = await signToken(validClaims());
    const res = await request('/conversations/user-a_user-b/files/images', {
      method: 'POST',
      token,
      contentType: 'text/plain',
      body: 'image',
    });

    expect(res.status).toBe(415);
  });
});
