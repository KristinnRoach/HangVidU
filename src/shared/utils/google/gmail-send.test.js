import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { sendBulkEmailsViaGmail } from './gmail-send.js';

const recipients = [
  { email: 'alice@example.com', name: 'Alice' },
  { email: 'bob@example.com', name: 'Bob' },
];
afterEach(() => vi.unstubAllGlobals());

describe('bulk Gmail sends', () => {
  it('reports only successful recipients so failed recipients remain retryable', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'sent' }) })
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ error: { message: 'offline' } }),
        }),
    );
    const onSent = vi.fn();
    const result = await sendBulkEmailsViaGmail(
      'token',
      recipients,
      'subject',
      'body',
      { onSent },
    );
    expect(result).toMatchObject({ sent: 1, failed: 1 });
    expect(onSent).toHaveBeenCalledExactlyOnceWith(recipients[0]);
  });

  it('stops before the next recipient when its owner closes during a send', async () => {
    let current = true;
    const fetch = vi.fn(async () => {
      current = false;
      return { ok: true, json: async () => ({ id: 'sent' }) };
    });
    vi.stubGlobal('fetch', fetch);
    const result = await sendBulkEmailsViaGmail(
      'token',
      recipients,
      'subject',
      'body',
      { isCurrent: () => current },
    );
    expect(result).toMatchObject({ sent: 1, failed: 0 });
    expect(fetch).toHaveBeenCalledOnce();
  });
});
