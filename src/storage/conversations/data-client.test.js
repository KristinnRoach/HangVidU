import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { createConversationsClient } from './data-client.js';

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('createConversationsClient GET retry', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('retries an idempotent GET once on a network TypeError while online', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValueOnce(jsonResponse({ messages: [{ id: 'm1' }] }));
    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('navigator', { onLine: true });

    const client = createConversationsClient({
      baseUrl: 'https://api.example.com',
      getToken: async () => 'tok',
    });

    await expect(client.loadMessages('c1')).resolves.toEqual([{ id: 'm1' }]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('does not retry a GET when the browser reports offline', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValue(new TypeError('Failed to fetch'));
    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('navigator', { onLine: false });

    const client = createConversationsClient({
      baseUrl: 'https://api.example.com',
      getToken: async () => 'tok',
    });

    await expect(client.loadMessages('c1')).rejects.toThrow('Failed to fetch');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('does not retry non-GET mutations on a network TypeError', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValue(new TypeError('Failed to fetch'));
    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('navigator', { onLine: true });

    const client = createConversationsClient({
      baseUrl: 'https://api.example.com',
      getToken: async () => 'tok',
    });

    await expect(
      client.sendMessage('c1', { messageId: 'm1', kind: 'text', body: 'hi' }),
    ).rejects.toThrow('Failed to fetch');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
