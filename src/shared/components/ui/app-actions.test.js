import { describe, expect, it, vi } from 'vitest';
import { callAppAction, setAppAction } from './app-actions.js';

describe('app UI actions', () => {
  it('runs registered handlers and unregisters them with cleanup', async () => {
    const handler = vi.fn();
    const cleanup = setAppAction('test-action', handler);

    await callAppAction('test-action');
    expect(handler).toHaveBeenCalledOnce();

    cleanup();
    await callAppAction('test-action');
    expect(handler).toHaveBeenCalledOnce();
  });

  it('ignores missing handlers', async () => {
    await expect(callAppAction('missing-action')).resolves.toBeUndefined();
  });
});

