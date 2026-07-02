import { env, SELF } from 'cloudflare:test';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vite-plus/test';
import { insertMessage, resolveOrCreateDirect } from '../src/data/repo';

// End-to-end coverage of the security seam: the Bearer-auth + membership guard
// on a real route (GET /conversations/:id/messages), exercised through the full
// worker via SELF.fetch with a mocked JWKS and locally signed RS256 tokens. This
// is the chain we most don't want to break silently; the status codes are
// deliberate contracts (404 — not 403 — so non-members can't probe which ids
// exist). The JWKS-mock + signing harness mirrors files-worker.test.ts.

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

function validClaims(sub = 'user-a'): Record<string, unknown> {
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
  const headerB64 = b64urlFromString(
    JSON.stringify({ alg: 'RS256', kid: KID }),
  );
  const payloadB64 = b64urlFromString(JSON.stringify(claims));
  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', privateKey, data);
  return `${headerB64}.${payloadB64}.${b64urlFromBytes(sig)}`;
}

function messagesRequest(conversationId: string, token?: string) {
  const headers: Record<string, string> = { Origin: ORIGIN };
  if (token) headers.Authorization = `Bearer ${token}`;
  return SELF.fetch(
    `https://data/conversations/${encodeURIComponent(conversationId)}/messages`,
    { headers },
  );
}

function jsonPost(path: string, token: string, body: unknown) {
  return SELF.fetch(`https://data${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Origin: ORIGIN,
    },
    body: JSON.stringify(body),
  });
}

function jsonPut(path: string, token: string, body: unknown) {
  return SELF.fetch(`https://data${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Origin: ORIGIN,
    },
    body: JSON.stringify(body),
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
  const waiters: ((message: unknown) => void)[] = [];
  ws.addEventListener('message', (event: MessageEvent) => {
    const parsed = JSON.parse(event.data as string) as unknown;
    const waiter = waiters.shift();
    if (waiter) waiter(parsed);
    else queue.push(parsed);
  });

  return {
    close: () => ws.close(),
    next: () =>
      new Promise<unknown>((resolve) => {
        const queued = queue.shift();
        if (queued) resolve(queued);
        else waiters.push(resolve);
      }),
  };
}

async function connectConversation(conversationId: string, token: string) {
  const res = await SELF.fetch(
    `https://data/conversations/${encodeURIComponent(conversationId)}/ws`,
    {
      headers: {
        Upgrade: 'websocket',
        Origin: ORIGIN,
        'Sec-WebSocket-Protocol': `bearer, ${token}`,
      },
    },
  );
  expect(res.status).toBe(101);
  const ws = res.webSocket as WebSocket;
  ws.accept();
  return {
    close: () => ws.close(),
    next: () =>
      new Promise<unknown>((resolve, reject) => {
        ws.addEventListener(
          'message',
          (event: MessageEvent) => resolve(JSON.parse(event.data as string)),
          { once: true },
        );
        ws.addEventListener(
          'close',
          () => reject(new Error('websocket closed before message')),
          { once: true },
        );
      }),
  };
}

async function nextOrNoMessage(
  mailbox: Awaited<ReturnType<typeof connectMailbox>>,
  timeoutMs = 100,
): Promise<unknown | typeof NO_MESSAGE> {
  return Promise.race([
    mailbox.next(),
    new Promise<typeof NO_MESSAGE>((resolve) => {
      setTimeout(() => resolve(NO_MESSAGE), timeoutMs);
    }),
  ]);
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
    env.DB.prepare('DELETE FROM message_reactions'),
    env.DB.prepare('DELETE FROM message_attachments'),
    env.DB.prepare('DELETE FROM messages'),
    env.DB.prepare('DELETE FROM conversation_members'),
    env.DB.prepare('DELETE FROM conversations'),
    env.DB.prepare('DELETE FROM users'),
  ]);
});

describe('message reactions', () => {
  it('allows PUT in CORS preflight responses', async () => {
    const res = await SELF.fetch(
      'https://data/conversations/c1/messages/m1/reaction',
      { method: 'OPTIONS', headers: { Origin: ORIGIN } },
    );

    expect(res.status).toBe(204);
    const allowedMethods = res.headers.get('Access-Control-Allow-Methods');
    for (const method of ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']) {
      expect(allowedMethods).toContain(method);
    }
  });

  it('persists, hydrates, and broadcasts authoritative reaction counts', async () => {
    const convoId = await resolveOrCreateDirect(
      env.DB,
      'user-a',
      'user-b',
      1000,
    );
    await insertMessage(
      env.DB,
      convoId,
      'm1',
      'user-a',
      'text',
      'hi',
      null,
      2000,
    );
    const aliceToken = await signToken(validClaims('user-a'));
    const bobToken = await signToken(validClaims('user-b'));
    const bobChannel = await connectConversation(convoId, bobToken);

    try {
      const eventPromise = bobChannel.next();
      const res = await jsonPut(
        `/conversations/${convoId}/messages/m1/reaction`,
        aliceToken,
        { reactionKey: 'heart' },
      );

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({
        messageId: 'm1',
        reactions: [{ key: 'heart', count: 1, reactedByMe: true }],
      });
      expect(await eventPromise).toEqual({
        t: 'reaction',
        messageId: 'm1',
        actorUserId: 'user-a',
        actorReactionKey: 'heart',
        reactions: [{ key: 'heart', count: 1 }],
      });

      const history = await messagesRequest(convoId, bobToken);
      expect((await history.json()).messages[0].reactions).toEqual([
        { key: 'heart', count: 1, reactedByMe: false },
      ]);
    } finally {
      bobChannel.close();
    }
  });

  it('uses null to remove and rejects invalid or inaccessible reactions', async () => {
    const convoId = await resolveOrCreateDirect(
      env.DB,
      'user-a',
      'user-b',
      1000,
    );
    const otherConvoId = await resolveOrCreateDirect(
      env.DB,
      'user-c',
      'user-d',
      1000,
    );
    await insertMessage(
      env.DB,
      convoId,
      'm1',
      'user-a',
      'text',
      'hi',
      null,
      2000,
    );
    const token = await signToken(validClaims('user-a'));

    expect(
      (
        await jsonPut(`/conversations/${convoId}/messages/m1/reaction`, token, {
          reactionKey: 'heart',
        })
      ).status,
    ).toBe(200);
    expect(
      (
        await jsonPut(`/conversations/${convoId}/messages/m1/reaction`, token, {
          reactionKey: null,
        })
      ).status,
    ).toBe(200);
    expect(
      (
        await jsonPut(`/conversations/${convoId}/messages/m1/reaction`, token, {
          reactionKey: 'x'.repeat(65),
        })
      ).status,
    ).toBe(400);
    expect(
      (
        await jsonPut(
          `/conversations/${otherConvoId}/messages/m1/reaction`,
          token,
          { reactionKey: 'heart' },
        )
      ).status,
    ).toBe(404);
  });
});

describe('auth + membership guard on GET /conversations/:id/messages', () => {
  it('401s when no bearer token is provided', async () => {
    const res = await messagesRequest('any-id');
    expect(res.status).toBe(401);
  });

  it('401s an expired token', async () => {
    const now = Math.floor(Date.now() / 1000);
    const token = await signToken({ ...validClaims(), exp: now - 1 });
    const res = await messagesRequest('any-id', token);
    expect(res.status).toBe(401);
  });

  it('401s a token for the wrong Firebase project (aud mismatch)', async () => {
    const token = await signToken({ ...validClaims(), aud: 'someone-else' });
    const res = await messagesRequest('any-id', token);
    expect(res.status).toBe(401);
  });

  it('404s a valid token for a non-member (no id probing)', async () => {
    const convoId = await resolveOrCreateDirect(
      env.DB,
      'user-a',
      'user-b',
      1000,
    );
    const token = await signToken(validClaims('user-c'));
    const res = await messagesRequest(convoId, token);
    expect(res.status).toBe(404);
  });

  it('200s a valid token for a member (positive control)', async () => {
    const convoId = await resolveOrCreateDirect(
      env.DB,
      'user-a',
      'user-b',
      1000,
    );
    const token = await signToken(validClaims('user-a'));
    const res = await messagesRequest(convoId, token);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ messages: [] });
  });
});

describe('PUT /conversations/:id/read round-trip', () => {
  it('persists the marker and surfaces it on GET /conversations for the reader only', async () => {
    const convoId = await resolveOrCreateDirect(
      env.DB,
      'user-a',
      'user-b',
      1000,
    );
    await insertMessage(
      env.DB,
      convoId,
      'm1',
      'user-b',
      'text',
      'hi',
      null,
      2000,
    );
    const aToken = await signToken(validClaims('user-a'));
    const bToken = await signToken(validClaims('user-b'));

    const put = await jsonPut(`/conversations/${convoId}/read`, aToken, {});
    expect(put.status).toBe(200);
    const { lastReadAt } = (await put.json()) as { lastReadAt: number };
    expect(lastReadAt).toBeGreaterThan(0);

    const listA = await SELF.fetch('https://data/conversations', {
      headers: { Authorization: `Bearer ${aToken}`, Origin: ORIGIN },
    });
    const aBody = (await listA.json()) as {
      conversations: { id: string; last_read_at: number }[];
    };
    expect(
      aBody.conversations.find((c) => c.id === convoId)?.last_read_at,
    ).toBe(lastReadAt);

    const listB = await SELF.fetch('https://data/conversations', {
      headers: { Authorization: `Bearer ${bToken}`, Origin: ORIGIN },
    });
    const bBody = (await listB.json()) as {
      conversations: { id: string; last_read_at: number }[];
    };
    expect(
      bBody.conversations.find((c) => c.id === convoId)?.last_read_at,
    ).toBe(0);
  });

  it('404s a non-member', async () => {
    const convoId = await resolveOrCreateDirect(
      env.DB,
      'user-a',
      'user-b',
      1000,
    );
    const token = await signToken(validClaims('user-c'));
    const res = await jsonPut(`/conversations/${convoId}/read`, token, {});
    expect(res.status).toBe(404);
  });
});

describe('call cancel mailbox route', () => {
  it('404s when the caller is not a conversation member', async () => {
    const convoId = await resolveOrCreateDirect(
      env.DB,
      'user-a',
      'user-b',
      1000,
    );
    const token = await signToken(validClaims('user-c'));

    const res = await jsonPost('/calls/cancel', token, {
      conversationId: convoId,
      calleeId: 'user-b',
    });

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: 'not_found' });
  });

  it('delivers the cancel envelope with room and caller identity', async () => {
    const convoId = await resolveOrCreateDirect(
      env.DB,
      'user-a',
      'user-b',
      1000,
    );
    const callerToken = await signToken(validClaims('user-a'));
    const calleeToken = await signToken(validClaims('user-b'));
    const mailbox = await connectMailbox(calleeToken);

    try {
      const res = await jsonPost('/calls/cancel', callerToken, {
        conversationId: convoId,
        calleeId: 'user-b',
      });

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ ok: true });
      expect(await mailbox.next()).toEqual({
        t: 'cancel',
        roomId: convoId,
        by: 'user-a',
      });
    } finally {
      mailbox.close();
    }
  });
});

describe('call invite retention', () => {
  it('replays a fresh pending invite when the callee connects late', async () => {
    const callerId = `caller-${crypto.randomUUID()}`;
    const calleeId = `callee-${crypto.randomUUID()}`;
    const convoId = await resolveOrCreateDirect(
      env.DB,
      callerId,
      calleeId,
      1000,
    );
    const callerToken = await signToken(validClaims(callerId));
    const calleeToken = await signToken(validClaims(calleeId));

    const res = await jsonPost('/calls/invite', callerToken, {
      conversationId: convoId,
      calleeId,
      callerName: 'Caller',
      audioOnly: true,
      expiresAt: Date.now() + 30_000,
    });
    expect(res.status).toBe(200);

    const mailbox = await connectMailbox(calleeToken);
    try {
      expect(await mailbox.next()).toEqual({
        t: 'invite',
        invite: {
          roomId: convoId,
          callerId,
          calleeId,
          callerName: 'Caller',
          audioOnly: true,
          startedAt: expect.any(Number),
          expiresAt: expect.any(Number),
        },
      });
    } finally {
      mailbox.close();
    }
  });

  it('does not replay a pending invite after caller cancel', async () => {
    const callerId = `caller-${crypto.randomUUID()}`;
    const calleeId = `callee-${crypto.randomUUID()}`;
    const convoId = await resolveOrCreateDirect(
      env.DB,
      callerId,
      calleeId,
      1000,
    );
    const callerToken = await signToken(validClaims(callerId));
    const calleeToken = await signToken(validClaims(calleeId));

    expect(
      (
        await jsonPost('/calls/invite', callerToken, {
          conversationId: convoId,
          calleeId,
          expiresAt: Date.now() + 30_000,
        })
      ).status,
    ).toBe(200);
    expect(
      (
        await jsonPost('/calls/cancel', callerToken, {
          conversationId: convoId,
          calleeId,
        })
      ).status,
    ).toBe(200);

    const mailbox = await connectMailbox(calleeToken);
    try {
      expect(await nextOrNoMessage(mailbox)).toBe(NO_MESSAGE);
    } finally {
      mailbox.close();
    }
  });

  it('does not replay a pending invite after callee response', async () => {
    const callerId = `caller-${crypto.randomUUID()}`;
    const calleeId = `callee-${crypto.randomUUID()}`;
    const convoId = await resolveOrCreateDirect(
      env.DB,
      callerId,
      calleeId,
      1000,
    );
    const callerToken = await signToken(validClaims(callerId));
    const calleeToken = await signToken(validClaims(calleeId));

    expect(
      (
        await jsonPost('/calls/invite', callerToken, {
          conversationId: convoId,
          calleeId,
          expiresAt: Date.now() + 30_000,
        })
      ).status,
    ).toBe(200);
    expect(
      (
        await jsonPost('/calls/response', calleeToken, {
          conversationId: convoId,
          callerId,
          responseType: 'accepted',
        })
      ).status,
    ).toBe(200);

    const mailbox = await connectMailbox(calleeToken);
    try {
      expect(await nextOrNoMessage(mailbox)).toBe(NO_MESSAGE);
    } finally {
      mailbox.close();
    }
  });

  it('rejects a forged response that targets the responder instead of the caller', async () => {
    const callerId = `caller-${crypto.randomUUID()}`;
    const calleeId = `callee-${crypto.randomUUID()}`;
    const convoId = await resolveOrCreateDirect(
      env.DB,
      callerId,
      calleeId,
      1000,
    );
    const calleeToken = await signToken(validClaims(calleeId));

    const res = await jsonPost('/calls/response', calleeToken, {
      conversationId: convoId,
      callerId: calleeId,
      responseType: 'accepted',
    });

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: 'not_found' });
  });

  it("fans 'handled' to the responder's other sockets on response", async () => {
    // A second tab/device of the callee is still ringing; answering on one
    // device must dismiss the incoming dialog everywhere, not just clear storage.
    const callerId = `caller-${crypto.randomUUID()}`;
    const calleeId = `callee-${crypto.randomUUID()}`;
    const convoId = await resolveOrCreateDirect(
      env.DB,
      callerId,
      calleeId,
      1000,
    );
    const callerToken = await signToken(validClaims(callerId));
    const calleeToken = await signToken(validClaims(calleeId));

    const otherTab = await connectMailbox(calleeToken);
    try {
      expect(
        (
          await jsonPost('/calls/invite', callerToken, {
            conversationId: convoId,
            calleeId,
            expiresAt: Date.now() + 30_000,
          })
        ).status,
      ).toBe(200);
      // The live invite reaches the other tab.
      expect(((await otherTab.next()) as { t: string }).t).toBe('invite');

      expect(
        (
          await jsonPost('/calls/response', calleeToken, {
            conversationId: convoId,
            callerId,
            responseType: 'accepted',
          })
        ).status,
      ).toBe(200);

      expect(await otherTab.next()).toEqual({
        t: 'handled',
        roomId: convoId,
        by: calleeId,
      });
    } finally {
      otherTab.close();
    }
  });

  it('replays pending invites from multiple callers', async () => {
    const calleeId = `callee-${crypto.randomUUID()}`;
    const callerAId = `caller-${crypto.randomUUID()}`;
    const callerBId = `caller-${crypto.randomUUID()}`;
    const convoA = await resolveOrCreateDirect(
      env.DB,
      callerAId,
      calleeId,
      1000,
    );
    const convoB = await resolveOrCreateDirect(
      env.DB,
      callerBId,
      calleeId,
      1000,
    );
    const calleeToken = await signToken(validClaims(calleeId));
    const callerAToken = await signToken(validClaims(callerAId));
    const callerBToken = await signToken(validClaims(callerBId));

    for (const [token, convoId] of [
      [callerAToken, convoA],
      [callerBToken, convoB],
    ] as const) {
      expect(
        (
          await jsonPost('/calls/invite', token, {
            conversationId: convoId,
            calleeId,
            expiresAt: Date.now() + 30_000,
          })
        ).status,
      ).toBe(200);
    }

    const mailbox = await connectMailbox(calleeToken);
    try {
      const a = (await mailbox.next()) as {
        t: string;
        invite: { roomId: string };
      };
      const b = (await mailbox.next()) as {
        t: string;
        invite: { roomId: string };
      };
      expect([a.t, b.t]).toEqual(['invite', 'invite']);
      expect(new Set([a.invite.roomId, b.invite.roomId])).toEqual(
        new Set([convoA, convoB]),
      );
    } finally {
      mailbox.close();
    }
  });
});

describe('call response retention', () => {
  it('replays an accepted response until the caller acknowledges it', async () => {
    const callerId = `caller-${crypto.randomUUID()}`;
    const calleeId = `callee-${crypto.randomUUID()}`;
    const convoId = await resolveOrCreateDirect(
      env.DB,
      callerId,
      calleeId,
      1000,
    );
    const callerToken = await signToken(validClaims(callerId));
    const calleeToken = await signToken(validClaims(calleeId));

    expect(
      (
        await jsonPost('/calls/response', calleeToken, {
          conversationId: convoId,
          callerId,
          responseType: 'accepted',
          expiresAt: Date.now() + 30_000,
        })
      ).status,
    ).toBe(200);

    const mailbox = await connectMailbox(callerToken);
    try {
      expect(await mailbox.next()).toEqual({
        t: 'response',
        response: {
          roomId: convoId,
          responseType: 'accepted',
          by: calleeId,
          respondedAt: expect.any(Number),
          expiresAt: expect.any(Number),
        },
      });
    } finally {
      mailbox.close();
    }

    expect(
      (
        await jsonPost('/calls/response/ack', callerToken, {
          conversationId: convoId,
        })
      ).status,
    ).toBe(200);

    const reconnected = await connectMailbox(callerToken);
    try {
      expect(await nextOrNoMessage(reconnected)).toBe(NO_MESSAGE);
    } finally {
      reconnected.close();
    }
  });
});
