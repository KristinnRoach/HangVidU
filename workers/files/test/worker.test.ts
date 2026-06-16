import { env, SELF } from 'cloudflare:test';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

const PROJECT_ID = (env as any).FIREBASE_PROJECT_ID as string;
const KID = 'test-key-1';
const ORIGIN = 'https://hangvidu.com';
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
    appCheckToken,
    origin = ORIGIN,
    body,
    contentType,
  }: {
    method?: string;
    token?: string;
    appCheckToken?: string;
    origin?: string | null;
    body?: BodyInit;
    contentType?: string;
  } = {},
) {
  const headers: Record<string, string> = {};
  if (origin) headers.Origin = origin;
  if (token) headers.Authorization = `Bearer ${token}`;
  if (appCheckToken) headers['X-Firebase-AppCheck'] = appCheckToken;
  if (contentType) headers['Content-Type'] = contentType;
  return SELF.fetch(`https://files${path}`, { method, headers, body });
}

async function allowMember(conversationId: string, userId: string) {
  await env.DB.prepare(
    `INSERT INTO conversation_members (conversation_id, user_id, joined_at)
     VALUES (?, ?, ?)
     ON CONFLICT(conversation_id, user_id) DO NOTHING`,
  )
    .bind(conversationId, userId, Date.now())
    .run();
}

async function removeMember(conversationId: string, userId: string) {
  await env.DB.prepare(
    `DELETE FROM conversation_members
     WHERE conversation_id = ? AND user_id = ?`,
  )
    .bind(conversationId, userId)
    .run();
}

beforeAll(async () => {
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS conversation_members (
      conversation_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      joined_at INTEGER NOT NULL,
      PRIMARY KEY (conversation_id, user_id)
    )`,
  ).run();

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
    return originalFetch(input, init);
  }) as typeof fetch;
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});

beforeEach(async () => {
  await env.DB.prepare('DELETE FROM conversation_members').run();
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
    await allowMember('user-a_user-b', 'user-a');
    await allowMember('user-a_user-b', 'user-b');

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
    };
    expect(metadata).toMatchObject({
      provider: 'r2',
      bucket: 'hangvidu-files',
    });
    expect(metadata.key).toMatch(/^conversation-files\/user-a_user-b\/.+/);
    expect(metadata).not.toHaveProperty('fileId');

    const download = await request(
      `/conversations/user-a_user-b/files/object?key=${encodeURIComponent(
        metadata.key,
      )}`,
      { token: getToken },
    );

    expect(download.status).toBe(200);
    expect(download.headers.get('Content-Type')).toBe('image/png');
    expect(new Uint8Array(await download.arrayBuffer())).toEqual(
      new Uint8Array([1, 2, 3]),
    );
  });

  it('accepts app check tokens while authorizing through D1 membership', async () => {
    const token = await signToken(validClaims('user-a'));
    await allowMember('user-a_user-b', 'user-a');

    const upload = await request('/conversations/user-a_user-b/files/images', {
      method: 'POST',
      token,
      appCheckToken: 'app-check-token',
      contentType: 'image/png',
      body: new Uint8Array([1, 2, 3]),
    });

    expect(upload.status).toBe(201);
  });

  it('reuses successful download membership checks briefly', async () => {
    const uploadToken = await signToken(validClaims('user-a'));
    const downloadToken = await signToken(validClaims('user-b'));
    await allowMember('group:cache-test', 'user-a');
    await allowMember('group:cache-test', 'user-b');

    const upload = await request(
      '/conversations/group%3Acache-test/files/images',
      {
        method: 'POST',
        token: uploadToken,
        contentType: 'image/png',
        body: new Uint8Array([1, 2, 3]),
      },
    );
    const metadata = (await upload.json()) as { key: string };

    const path = `/conversations/group%3Acache-test/files/object?key=${encodeURIComponent(
      metadata.key,
    )}`;

    const firstDownload = await request(path, { token: downloadToken });
    await removeMember('group:cache-test', 'user-b');
    const secondDownload = await request(path, { token: downloadToken });

    expect(firstDownload.status).toBe(200);
    expect(secondDownload.status).toBe(200);
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

  it('403s removed conversation members', async () => {
    const token = await signToken(validClaims('user-a'));
    await allowMember('user-a_user-b', 'user-a');
    await removeMember('user-a_user-b', 'user-a');
    const res = await request('/conversations/user-a_user-b/files/images', {
      method: 'POST',
      token,
      contentType: 'image/png',
      body: 'image',
    });

    expect(res.status).toBe(403);
  });

  it('authorizes group conversations through D1 membership', async () => {
    const token = await signToken(validClaims('user-a'));
    await allowMember('group:abc', 'user-a');

    const upload = await request('/conversations/group%3Aabc/files/images', {
      method: 'POST',
      token,
      contentType: 'image/webp',
      body: 'image',
    });

    expect(upload.status).toBe(201);
  });

  it('accepts svg image uploads', async () => {
    const token = await signToken(validClaims());
    await allowMember('user-a_user-b', 'user-a');
    const res = await request('/conversations/user-a_user-b/files/images', {
      method: 'POST',
      token,
      contentType: 'image/svg+xml',
      body: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" />',
    });

    expect(res.status).toBe(201);
  });

  it('accepts small non-image file uploads', async () => {
    const token = await signToken(validClaims());
    await allowMember('user-a_user-b', 'user-a');
    const res = await request('/conversations/user-a_user-b/files/images', {
      method: 'POST',
      token,
      contentType: 'application/pdf',
      body: '%PDF-1.7',
    });

    expect(res.status).toBe(201);
  });

  it('rejects oversized uploads before storing', async () => {
    const token = await signToken(validClaims());
    await allowMember('user-a_user-b', 'user-a');
    const res = await request('/conversations/user-a_user-b/files/images', {
      method: 'POST',
      token,
      contentType: 'image/png',
      body: new Uint8Array(5 * 1024 * 1024 + 1),
    });

    expect(res.status).toBe(413);
  });

  it('rejects uploads without a supported MIME type', async () => {
    const token = await signToken(validClaims());
    await allowMember('user-a_user-b', 'user-a');
    const res = await request('/conversations/user-a_user-b/files/images', {
      method: 'POST',
      token,
      contentType: 'not-a-mime',
      body: 'image',
    });

    expect(res.status).toBe(415);
  });
});
