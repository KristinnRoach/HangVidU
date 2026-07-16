import { describe, expect, it, vi } from 'vite-plus/test';
import { subscribeToWakeSignals } from './wake-signals';

describe('subscribeToWakeSignals', () => {
  it('fires on online and on visibilitychange to visible, not after cleanup', () => {
    const onWake = vi.fn();
    const unsubscribe = subscribeToWakeSignals(onWake);

    window.dispatchEvent(new Event('online'));
    expect(onWake).toHaveBeenCalledTimes(1);

    // visibilitychange only wakes when the document is actually visible.
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'hidden',
    });
    document.dispatchEvent(new Event('visibilitychange'));
    expect(onWake).toHaveBeenCalledTimes(1);

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'visible',
    });
    document.dispatchEvent(new Event('visibilitychange'));
    expect(onWake).toHaveBeenCalledTimes(2);

    unsubscribe();
    window.dispatchEvent(new Event('online'));
    document.dispatchEvent(new Event('visibilitychange'));
    expect(onWake).toHaveBeenCalledTimes(2);
  });
});
