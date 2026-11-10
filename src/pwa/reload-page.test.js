import { describe, expect, it, vi } from 'vite-plus/test';

import {
  reloadAfterPreloadError,
  reloadPageWhenAllowed,
} from './reload-page.js';

describe('PWA page reload', () => {
  it('does not reload until the app reload gate opens', async () => {
    let allowReload;
    const whenAllowed = new Promise((resolve) => {
      allowReload = resolve;
    });
    const reload = vi.fn();

    const options = {
      whenAllowed: () => whenAllowed,
      reload,
    };
    const firstPendingReload = reloadPageWhenAllowed(options);
    const secondPendingReload = reloadPageWhenAllowed(options);
    await Promise.resolve();
    expect(reload).not.toHaveBeenCalled();

    allowReload();
    await Promise.all([firstPendingReload, secondPendingReload]);
    expect(reload).toHaveBeenCalledOnce();
  });

  it('reloads once after a failed dynamic import', async () => {
    sessionStorage.clear();
    const reload = vi.fn();
    const options = { whenAllowed: () => Promise.resolve(), reload };

    await reloadAfterPreloadError(options);
    // The reloaded page fails the same import again; it must not loop.
    await reloadAfterPreloadError(options);

    expect(reload).toHaveBeenCalledOnce();
  });
});
