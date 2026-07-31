import { afterEach, describe, expect, it, vi } from 'vite-plus/test';

import { holdAppReload, whenAppReloadAllowed } from './index.js';

describe('app reload gate', () => {
  const releases = [];

  afterEach(() => {
    for (const release of releases.splice(0)) release();
  });

  it('waits until every active reload hold is released', async () => {
    const releaseIncomingCall = holdAppReload();
    const releaseActiveCall = holdAppReload();
    releases.push(releaseIncomingCall, releaseActiveCall);
    const allowed = vi.fn();

    void whenAppReloadAllowed().then(allowed);
    await Promise.resolve();
    expect(allowed).not.toHaveBeenCalled();

    releaseIncomingCall();
    await Promise.resolve();
    expect(allowed).not.toHaveBeenCalled();

    releaseActiveCall();
    await Promise.resolve();
    expect(allowed).toHaveBeenCalledOnce();
  });

  it('allows reload immediately when there are no holds', async () => {
    await expect(whenAppReloadAllowed()).resolves.toBeUndefined();
  });
});
