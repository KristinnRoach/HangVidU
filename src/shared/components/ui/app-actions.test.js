import { describe, expect, it, vi } from 'vitest';
import { runAppUiAction, setAppUiAction } from './app-actions.js';

describe('app UI actions', () => {
  it('runs registered handlers and unregisters them with cleanup', async () => {
    const handler = vi.fn();
    const cleanup = setAppUiAction('test-action', handler);

    await runAppUiAction('test-action');
    expect(handler).toHaveBeenCalledOnce();

    cleanup();
    await runAppUiAction('test-action');
    expect(handler).toHaveBeenCalledOnce();
  });

  it('ignores missing handlers', async () => {
    await expect(runAppUiAction('missing-action')).resolves.toBeUndefined();
  });
});

