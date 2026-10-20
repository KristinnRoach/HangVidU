import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';

import { getVideoConstraints } from './media-constraints.js';

describe('call media constraints', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        mediaDevices: {
          getSupportedConstraints: () => ({}),
        },
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      },
      configurable: true,
    });
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: true })),
    );
    vi.stubGlobal('screen', { orientation: { type: 'portrait-primary' } });
    vi.stubGlobal('innerHeight', 844);
    vi.stubGlobal('innerWidth', 390);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('omits undefined facingMode from mobile video constraints', () => {
    expect(getVideoConstraints()).toEqual({});
  });

  it('keeps an explicit mobile facingMode constraint', () => {
    expect(getVideoConstraints({ ideal: 'user' })).toEqual({
      facingMode: { ideal: 'user' },
    });
  });
});
