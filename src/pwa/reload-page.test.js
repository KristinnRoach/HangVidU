import { afterEach, describe, expect, it, vi } from 'vite-plus/test';

import { PAGE_RELOAD_REASON_KEY } from '@shared/app-reload/index.js';
import {
  reloadAfterPreloadError,
  reloadPageWhenAllowed,
} from './reload-page.js';

describe('PWA page reload', () => {
  afterEach(() => vi.restoreAllMocks());
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
    expect(sessionStorage.getItem(PAGE_RELOAD_REASON_KEY)).toBe(
      'sw-update-reload',
    );
  });

  it('reloads once after a failed dynamic import', async () => {
    sessionStorage.clear();
    const reload = vi.fn();
    const options = { whenAllowed: () => Promise.resolve(), reload };

    await reloadAfterPreloadError(options);
    expect(sessionStorage.getItem(PAGE_RELOAD_REASON_KEY)).toBe(
      'stale-chunk-reload',
    );
    // Startup consumes the reason before the next import failure.
    sessionStorage.removeItem(PAGE_RELOAD_REASON_KEY);
    // The reloaded page fails the same import again; it must not loop.
    await reloadAfterPreloadError(options);

    expect(reload).toHaveBeenCalledOnce();
    expect(sessionStorage.getItem(PAGE_RELOAD_REASON_KEY)).toBeNull();
  });

  it.each(['getItem', 'setItem'])(
    'does not reload or throw when sessionStorage.%s fails',
    async (method) => {
      sessionStorage.clear();
      vi.spyOn(Storage.prototype, method).mockImplementation(() => {
        throw new DOMException('Storage blocked', 'SecurityError');
      });
      const reload = vi.fn();
      const options = { whenAllowed: () => Promise.resolve(), reload };

      await expect(
        Promise.resolve().then(() => reloadAfterPreloadError(options)),
      ).resolves.toBeUndefined();
      await reloadAfterPreloadError(options);
      expect(reload).not.toHaveBeenCalled();
      vi.restoreAllMocks();
      expect(sessionStorage.getItem(PAGE_RELOAD_REASON_KEY)).toBeNull();
    },
  );
});
