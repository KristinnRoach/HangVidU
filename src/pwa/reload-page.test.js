import { describe, expect, it, vi } from 'vite-plus/test';

import { PAGE_RELOAD_REASON_KEY } from '@shared/app-reload/index.js';
import { reloadPageWhenAllowed } from './reload-page.js';

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
    expect(sessionStorage.getItem(PAGE_RELOAD_REASON_KEY)).toBe(
      'sw-update-reload',
    );
  });
});
