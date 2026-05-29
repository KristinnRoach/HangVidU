import { env, SELF } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';

const PROJECT_ID = (env as any).FIREBASE_PROJECT_ID as string;

function b64url(obj: unknown): string {
  return btoa(JSON.stringify(obj))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/** Build an unsigned-but-well-formed Firebase-style ID token (claims only). */
function fakeToken(claims: Record<string, unknown>): string {
  return `${b64url({ alg: 'RS256' })}.${b64url(claims)}.sig`;
}

function validClaims() {
  return {
    aud: PROJECT_ID,
    iss: `https://securetoken.google.com/${PROJECT_ID}`,
    exp: Math.floor(Date.now() / 1000) + 3600,
    sub: 'user-1',
  };
}

function upgrade(path: string, protocol?: string): Promise<Response> {
  const headers: Record<string, string> = { Upgrade: 'websocket' };
  if (protocol) headers['Sec-WebSocket-Protocol'] = protocol;
  return SELF.fetch(`https://signaling${path}`, { headers });
}

describe('signaling worker routing + auth', () => {
  it('404s unknown paths', async () => {
    const res = await SELF.fetch('https://signaling/nope');
    expect(res.status).toBe(404);
  });

  it('426s the room path without an Upgrade header', async () => {
    const res = await SELF.fetch('https://signaling/rooms/r1/signal');
    expect(res.status).toBe(426);
  });

  it('401s when no token is provided', async () => {
    const res = await upgrade('/rooms/r1/signal');
    expect(res.status).toBe(401);
  });

  it('401s an expired token', async () => {
    const token = fakeToken({ ...validClaims(), exp: 1 });
    const res = await upgrade('/rooms/r1/signal', `bearer, ${token}`);
    expect(res.status).toBe(401);
  });

  it('401s a wrong-audience token', async () => {
    const token = fakeToken({ ...validClaims(), aud: 'someone-else' });
    const res = await upgrade('/rooms/r1/signal', `bearer, ${token}`);
    expect(res.status).toBe(401);
  });

  it('upgrades with a valid token', async () => {
    const token = fakeToken(validClaims());
    const res = await upgrade('/rooms/r1/signal', `bearer, ${token}`);
    expect(res.status).toBe(101);
    expect(res.webSocket).toBeTruthy();
  });
});
