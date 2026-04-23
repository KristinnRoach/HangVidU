import { afterEach, describe, expect, it, vi } from 'vitest';

import { setupRemoteStream } from '../../src/shared/media/stream.js';

describe('setupRemoteStream', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false when remote stream listener setup throws synchronously', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const remoteVideoEl = document.createElement('video');

    expect(setupRemoteStream(null, remoteVideoEl, null)).toBe(false);
  });

  it('returns true when the remote stream listener is registered', () => {
    const pc = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    const remoteVideoEl = document.createElement('video');

    expect(setupRemoteStream(pc, remoteVideoEl, null)).toBe(true);
    expect(pc.addEventListener).toHaveBeenCalledWith(
      'track',
      expect.any(Function),
    );
  });
});
