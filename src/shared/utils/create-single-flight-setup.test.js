import { describe, expect, it, vi } from 'vitest';

import { createSingleFlightSetup } from './create-single-flight-setup.js';

describe('createSingleFlightSetup', () => {
  it('aborts registered handlers when start fails', async () => {
    const abortHandler = vi.fn();
    const error = new Error('boom');
    const setup = createSingleFlightSetup({
      label: '[test]',
      register: (signal) => signal.addEventListener('abort', abortHandler),
      start: () => Promise.reject(error),
    });

    await expect(setup()).rejects.toBe(error);
    expect(abortHandler).toHaveBeenCalledOnce();
  });
});
