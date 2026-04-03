import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../features/auth/index.js', () => ({
  getLoggedInUserToken: vi.fn().mockResolvedValue('mock-token-123'),
}));

// Must import after mocks
const { callCloudFunction } = await import('./cloud-functions.js');

describe('callCloudFunction', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends POST with Bearer token and JSON body', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ success: true }),
    });
    vi.stubGlobal('fetch', mockFetch);

    await callCloudFunction('testFunction', { key: 'value' });

    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toContain('testFunction');
    expect(opts.method).toBe('POST');
    expect(opts.headers.Authorization).toBe('Bearer mock-token-123');
    expect(opts.headers['Content-Type']).toBe('application/json');
    expect(JSON.parse(opts.body)).toEqual({ key: 'value' });
  });

  it('returns status and payload on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'test' }),
      }),
    );

    const result = await callCloudFunction('fn');
    expect(result).toEqual({ status: 200, payload: { data: 'test' } });
  });

  it('throws with status and payload on non-2xx response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ error: 'Unauthorized' }),
      }),
    );

    const err = await callCloudFunction('fn').catch((e) => e);
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('Unauthorized');
    expect(err.status).toBe(401);
    expect(err.payload).toEqual({ error: 'Unauthorized' });
  });

  it('handles non-JSON error responses gracefully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error('not json')),
      }),
    );

    const err = await callCloudFunction('fn').catch((e) => e);
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toContain('fn failed with status 500');
    expect(err.status).toBe(500);
  });
});
