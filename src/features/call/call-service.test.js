import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanupCallService, initCallService } from './call-service.js';

describe('initCallService', () => {
  afterEach(() => {
    cleanupCallService();
  });

  it('replaces a stale singleton when the authenticated UID changes', () => {
    const first = initCallService({
      localUID: 'guest-id',
      baseUrl: 'http://localhost:8788',
      getToken: async () => null,
    });
    const cleanup = vi.spyOn(first, 'cleanup');

    const second = initCallService({
      localUID: 'firebase-auth-uid',
      baseUrl: 'http://localhost:8788',
      getToken: async () => null,
    });

    expect(second).not.toBe(first);
    expect(second.localUID).toBe('firebase-auth-uid');
    expect(cleanup).toHaveBeenCalledOnce();
  });

  it('normalizes a trailing slash from the data worker base URL', () => {
    const service = initCallService({
      localUID: 'firebase-auth-uid',
      baseUrl: 'http://localhost:8788/',
      getToken: async () => null,
    });

    expect(service.baseUrl).toBe('http://localhost:8788');
  });
});
