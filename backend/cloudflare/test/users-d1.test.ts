import { env, SELF } from 'cloudflare:test';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

// Coverage for the Users → D1 slice: profile, soft-handle directory lookup,
// contacts CRUD, and the request/accept handshake (incl. the mailbox nudge).
// Auth harness (mocked JWKS + locally signed RS256 tokens) mirrors
// data-worker.test.ts.

const PROJECT_ID = (env as { FIREBASE_PROJECT_ID: string }).FIREBASE_PROJECT_ID;
const KID = 'test-key-1';
const ORIGIN = 'https://hangvidu.com';
const JWKS_URL =
  'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com';

let privateKey: CryptoKey;
const originalFetch = globalThis.fetch;
const NO_MESSAGE = Symbol('no message');

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
function validClaims(sub: string): Record<string, unknown> {
  const now = Math.floor(Date.now() / 1000);
  return {
    aud: PROJECT_ID,
    iss: `https://securetoken.google.com/${PROJECT_ID}`,
    iat: now - 10,
    exp: now + 3600,
    sub,
  };
}
async function signToken(sub: string): Promise<string> {
  const headerB64 = b64urlFromString(
    JSON.stringify({ alg: 'RS256', kid: KID }),
  );
  const payloadB64 = b64urlFromString(JSON.stringify(validClaims(sub)));
  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', privateKey, data);
  return `${headerB64}.${payloadB64}.${b64urlFromBytes(sig)}`;
}

function req(method: string, path: string, token: string, body?: unknown) {
  return SELF.fetch(`https://data${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Origin: ORIGIN,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

async function connectMailbox(token: string) {
  const res = await SELF.fetch('https://data/users/me/mailbox/ws', {
    headers: {
      Upgrade: 'websocket',
      Origin: ORIGIN,
      'Sec-WebSocket-Protocol': `bearer, ${token}`,
    },
  });
  expect(res.status).toBe(101);
  const ws = res.webSocket as WebSocket;
  ws.accept();
  const queue: unknown[] = [];
  const waiters: ((m: unknown) => void)[] = [];
  ws.addEventListener('message', (event: MessageEvent) => {
    const parsed = JSON.parse(event.data as string) as unknown;
    const waiter = waiters.shift();
    if (waiter) waiter(parsed);
    else queue.push(parsed);
  });
  return {
    close: () => ws.close(),
    next: () =>
      Promise.race([
        new Promise<unknown>((resolve) => {
          const queued = queue.shift();
          if (queued) resolve(queued);
          else waiters.push(resolve);
        }),
        new Promise<typeof NO_MESSAGE>((resolve) =>
          setTimeout(() => resolve(NO_MESSAGE), 200),
        ),
      ]),
  };
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
  const jwks = { keys: [{ ...publicJwk, kid: KID, alg: 'RS256', use: 'sig' }] };
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
  await env.DB.batch([
    env.DB.prepare('DELETE FROM contact_requests'),
    env.DB.prepare('DELETE FROM contacts'),
    env.DB.prepare('DELETE FROM conversation_members'),
    env.DB.prepare('DELETE FROM conversations'),
    env.DB.prepare('DELETE FROM users'),
  ]);
});

describe('profile + directory', () => {
  it('saves a profile and looks it up by handle (discoverable only)', async () => {
    const alice = await signToken('alice');
    await req('PUT', '/users/me/profile', alice, {
      displayName: 'Alice',
      username: 'alice99',
      emailHash: 'hash-alice',
    });

    // Bob finds Alice by handle.
    const bob = await signToken('bob');
    const found = await (
      await req('GET', '/users/lookup?handle=alice99', bob)
    ).json();
    expect(found.users).toHaveLength(1);
    expect(found.users[0]).toMatchObject({
      uid: 'alice',
      displayName: 'Alice',
      username: 'alice99',
    });

    // Alice opts out → no longer findable.
    await req('PUT', '/users/me/discoverable', alice, { discoverable: false });
    const gone = await (
      await req('GET', '/users/lookup?handle=alice99', bob)
    ).json();
    expect(gone.users).toHaveLength(0);
  });

  it('rejects a soft-colliding handle with 409', async () => {
    const alice = await signToken('alice');
    const bob = await signToken('bob');
    await req('PUT', '/users/me/profile', alice, { username: 'shared' });
    const res = await req('PUT', '/users/me/profile', bob, {
      username: 'shared',
    });
    expect(res.status).toBe(409);
  });

  it('lookup returns an array and excludes the caller', async () => {
    const alice = await signToken('alice');
    await req('PUT', '/users/me/profile', alice, { username: 'alice99' });
    const self = await (
      await req('GET', '/users/lookup?handle=alice99', alice)
    ).json();
    expect(Array.isArray(self.users)).toBe(true);
    expect(self.users).toHaveLength(0);
  });
});

describe('contacts CRUD', () => {
  it('upserts, lists, patches, and removes a contact', async () => {
    const alice = await signToken('alice');
    await req('POST', '/users/me/contacts', alice, {
      contactId: 'bob',
      nickname: 'Bob',
      conversationId: '11111111-1111-4111-8111-111111111111',
    });

    let list = await (await req('GET', '/users/me/contacts', alice)).json();
    expect(list.contacts).toHaveLength(1);
    expect(list.contacts[0]).toMatchObject({
      contactId: 'bob',
      nickname: 'Bob',
      conversationId: '11111111-1111-4111-8111-111111111111',
    });

    await req('PATCH', '/users/me/contacts/bob', alice, { nickname: 'Bobby' });
    list = await (await req('GET', '/users/me/contacts', alice)).json();
    expect(list.contacts[0].nickname).toBe('Bobby');

    await req('DELETE', '/users/me/contacts/bob', alice);
    list = await (await req('GET', '/users/me/contacts', alice)).json();
    expect(list.contacts).toHaveLength(0);
  });
});

describe('contact request handshake', () => {
  it('delivers a nudge, then accept saves the contact on both sides', async () => {
    const alice = await signToken('alice');
    const bob = await signToken('bob');
    await req('PUT', '/users/me/profile', alice, { displayName: 'Alice' });

    const bobMailbox = await connectMailbox(bob);
    try {
      const res = await req('POST', '/contact-requests', alice, {
        toId: 'bob',
      });
      expect(res.status).toBe(200);

      const nudge = await bobMailbox.next();
      expect(nudge).toMatchObject({
        t: 'contact_request',
        fromId: 'alice',
        fromName: 'Alice',
      });

      const incoming = await (
        await req('GET', '/contact-requests', bob)
      ).json();
      expect(incoming.requests).toHaveLength(1);
      expect(incoming.requests[0]).toMatchObject({
        fromId: 'alice',
        fromName: 'Alice',
      });

      const outgoing = await (
        await req('GET', '/contact-requests?direction=outgoing', alice)
      ).json();
      expect(outgoing.requests).toHaveLength(1);
      expect(outgoing.requests[0]).toMatchObject({
        fromId: 'alice',
        toId: 'bob',
      });

      const accept = await req('POST', '/contact-requests/alice/accept', bob);
      expect(accept.status).toBe(200);
      const accepted = (await accept.json()) as { conversationId: string };
      expect(accepted.conversationId).toBeTruthy();

      const bobContacts = await (
        await req('GET', '/users/me/contacts', bob)
      ).json();
      const aliceContacts = await (
        await req('GET', '/users/me/contacts', alice)
      ).json();
      expect(bobContacts.contacts).toContainEqual(
        expect.objectContaining({
          contactId: 'alice',
          displayName: 'Alice',
          conversationId: accepted.conversationId,
        }),
      );
      expect(aliceContacts.contacts).toContainEqual(
        expect.objectContaining({
          contactId: 'bob',
          conversationId: accepted.conversationId,
        }),
      );

      // Request no longer pending for Bob.
      const after = await (await req('GET', '/contact-requests', bob)).json();
      expect(after.requests).toHaveLength(0);
    } finally {
      bobMailbox.close();
    }
  });

  it('declines a request without creating contacts', async () => {
    const alice = await signToken('alice');
    const bob = await signToken('bob');
    await req('PUT', '/users/me/profile', alice, { displayName: 'Alice' });
    await req('POST', '/contact-requests', alice, { toId: 'bob' });

    const declined = await req('POST', '/contact-requests/alice/decline', bob);
    expect(declined.status).toBe(200);

    const incoming = await (await req('GET', '/contact-requests', bob)).json();
    expect(incoming.requests).toHaveLength(0);
    const bobContacts = await (
      await req('GET', '/users/me/contacts', bob)
    ).json();
    expect(bobContacts.contacts).toHaveLength(0);
  });

  it('connects referral users without a pending request', async () => {
    const alice = await signToken('alice');
    const bob = await signToken('bob');

    const connected = await req('POST', '/referrals/connect', bob, {
      referrerId: 'alice',
    });
    expect(connected.status).toBe(200);
    const body = (await connected.json()) as { conversationId: string };
    expect(body.conversationId).toBeTruthy();

    const bobContacts = await (
      await req('GET', '/users/me/contacts', bob)
    ).json();
    const aliceContacts = await (
      await req('GET', '/users/me/contacts', alice)
    ).json();
    expect(bobContacts.contacts).toContainEqual(
      expect.objectContaining({
        contactId: 'alice',
        conversationId: body.conversationId,
      }),
    );
    expect(aliceContacts.contacts).toContainEqual(
      expect.objectContaining({
        contactId: 'bob',
        conversationId: body.conversationId,
      }),
    );
  });
});
