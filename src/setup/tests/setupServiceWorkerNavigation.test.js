import { beforeEach, describe, expect, it, vi } from 'vitest';

function createDeferred() {
  let resolve;
  const promise = new Promise((r) => {
    resolve = r;
  });
  return { promise, resolve };
}

describe('setupServiceWorkerNavigation', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('queues NAVIGATE events until ready, then flushes and unsubscribes on cleanup', async () => {
    let messageListener = null;
    const serviceWorker = {
      startMessages: vi.fn(),
      addEventListener: vi.fn((type, listener) => {
        if (type === 'message') {
          messageListener = listener;
        }
      }),
      removeEventListener: vi.fn((type, listener) => {
        if (type === 'message' && messageListener === listener) {
          messageListener = null;
        }
      }),
    };
    Object.defineProperty(globalThis.navigator, 'serviceWorker', {
      configurable: true,
      writable: true,
      value: serviceWorker,
    });

    const readyGate = createDeferred();
    const handleServiceWorkerNavigation = vi.fn(async () => true);

    const { setupServiceWorkerNavigation } = await import(
      '../setupServiceWorkerNavigation.js'
    );
    const cleanup = await setupServiceWorkerNavigation({
      handleServiceWorkerNavigation,
      waitUntilReady: readyGate.promise,
    });

    expect(serviceWorker.addEventListener).toHaveBeenCalledTimes(1);
    expect(serviceWorker.startMessages).toHaveBeenCalledTimes(1);
    expect(handleServiceWorkerNavigation).not.toHaveBeenCalled();

    messageListener?.({ data: { type: 'NAVIGATE', path: '/queued' } });
    expect(handleServiceWorkerNavigation).not.toHaveBeenCalled();

    readyGate.resolve();
    await Promise.resolve();

    expect(handleServiceWorkerNavigation).toHaveBeenCalledTimes(1);
    expect(handleServiceWorkerNavigation).toHaveBeenCalledWith('/queued');

    cleanup();
    messageListener?.({ data: { type: 'NAVIGATE', path: '/after-cleanup' } });
    expect(serviceWorker.removeEventListener).toHaveBeenCalledTimes(1);
    expect(handleServiceWorkerNavigation).toHaveBeenCalledTimes(1);
  });
});
