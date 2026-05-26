import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanupCallService, initCallService } from './call-service.js';

describe('initCallService', () => {
  afterEach(() => {
    cleanupCallService();
  });

  it('replaces a stale singleton when the authenticated UID changes', () => {
    const first = initCallService({
      localUID: 'guest-id',
      rtdb: {},
    });
    const cleanup = vi.spyOn(first, 'cleanup');

    const second = initCallService({
      localUID: 'firebase-auth-uid',
      rtdb: {},
    });

    expect(second).not.toBe(first);
    expect(second.localUID).toBe('firebase-auth-uid');
    expect(cleanup).toHaveBeenCalledOnce();
  });
});
