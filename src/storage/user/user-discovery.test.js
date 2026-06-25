import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createUserDiscovery } from './user-discovery.js';

// The discovery client talks to the Worker over fetch; stub it. Email never
// leaves the client — only its hash is queried — so we assert on the hashed URL.

const BASE = 'https://worker.test';
const getToken = () => Promise.resolve('tok');

function jsonResponse(body, status = 200) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
    text: () => Promise.resolve(''),
  });
}

let discovery;
let fetchMock;

beforeEach(() => {
  fetchMock = vi.fn();
  globalThis.fetch = fetchMock;
  discovery = createUserDiscovery({ baseUrl: BASE, getToken });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('lookupByEmail', () => {
  it('returns found when the directory has a match', async () => {
    fetchMock.mockReturnValue(
      jsonResponse({ users: [{ uid: 'u1', userName: 'Alice' }] }),
    );
    const result = await discovery.lookupByEmail('alice@example.com');
    expect(result).toEqual({
      status: 'found',
      user: { uid: 'u1', userName: 'Alice' },
    });
    // Queried by hash, not raw email.
    const calledUrl = fetchMock.mock.calls[0][0];
    expect(calledUrl).toContain('/users/lookup?emailHash=');
    expect(calledUrl).not.toContain('alice@example.com');
  });

  it('returns not_found on empty result array', async () => {
    fetchMock.mockReturnValue(jsonResponse({ users: [] }));
    const result = await discovery.lookupByEmail('missing@example.com');
    expect(result).toEqual({ status: 'not_found', user: null });
  });

  it('returns not_found for whitespace email without a request', async () => {
    const result = await discovery.lookupByEmail('   ');
    expect(result).toEqual({ status: 'not_found', user: null });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns lookup_error when the request throws', async () => {
    fetchMock.mockReturnValue(jsonResponse({ error: 'boom' }, 500));
    const result = await discovery.lookupByEmail('error@example.com');
    expect(result.status).toBe('lookup_error');
    expect(result.user).toBeNull();
  });
});

describe('searchByHandle', () => {
  it('queries by handle and canonicalizes entries', async () => {
    fetchMock.mockReturnValue(
      jsonResponse({ users: [{ uid: 'u1', userName: '  ' }] }),
    );
    const result = await discovery.searchByHandle('alice99');
    expect(fetchMock.mock.calls[0][0]).toContain('/users/lookup?handle=alice99');
    expect(result).toEqual([{ uid: 'u1', userName: 'Anonymous' }]);
  });

  it('skips the request for an empty handle', async () => {
    expect(await discovery.searchByHandle('')).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
