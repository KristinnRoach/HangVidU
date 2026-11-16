import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { fetchGoogleContacts } from './google-contacts.js';

afterEach(() => vi.unstubAllGlobals());

describe('Google contacts request lifetime', () => {
  it('starts no requests when the owner has already closed', async () => {
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    await expect(
      fetchGoogleContacts('token', { isCurrent: () => false }),
    ).resolves.toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('starts neither another page nor the other endpoint after closing during a request', async () => {
    let current = true;
    const fetch = vi.fn(async () => {
      current = false;
      return {
        ok: true,
        json: async () => ({ connections: [], nextPageToken: 'next' }),
      };
    });
    vi.stubGlobal('fetch', fetch);
    await fetchGoogleContacts('token', { isCurrent: () => current });
    expect(fetch).toHaveBeenCalledOnce();
  });

  it('continues through pages and both endpoints while current', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ connections: [], nextPageToken: 'next' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          connections: [
            {
              names: [{ displayName: 'Alice' }],
              emailAddresses: [{ value: 'Alice@example.com' }],
            },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ otherContacts: [] }),
      });
    vi.stubGlobal('fetch', fetch);
    await expect(fetchGoogleContacts('token')).resolves.toEqual([
      { name: 'Alice', email: 'alice@example.com' },
    ]);
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch.mock.calls[1][0]).toContain('pageToken=next');
    expect(fetch.mock.calls[2][0]).toContain('/otherContacts');
  });
});
