import { createRoot, createSignal } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { createScreenWakeLock } from './createScreenWakeLock';

function setVisibility(state) {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    value: state,
  });
  document.dispatchEvent(new Event('visibilitychange'));
}

class MockWakeLock extends EventTarget {
  released = false;
  release = vi.fn(async () => this.releaseAutomatically());

  releaseAutomatically() {
    if (this.released) return;
    this.released = true;
    this.dispatchEvent(new Event('release'));
  }
}

function stubWakeLock(request) {
  vi.stubGlobal(
    'navigator',
    Object.create(navigator, {
      wakeLock: { configurable: true, value: { request } },
    }),
  );
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  setVisibility('visible');
});

describe('createScreenWakeLock', () => {
  it('holds the lock while enabled and reacquires it after returning visible', async () => {
    const firstLock = new MockWakeLock();
    const secondLock = new MockWakeLock();
    const request = vi
      .fn()
      .mockResolvedValueOnce(firstLock)
      .mockResolvedValueOnce(secondLock);
    stubWakeLock(request);

    const [enabled, setEnabled] = createSignal(false);
    const dispose = createRoot((dispose) => {
      createScreenWakeLock(enabled);
      return dispose;
    });

    setEnabled(true);
    await vi.waitFor(() => expect(request).toHaveBeenCalledOnce());

    setVisibility('hidden');
    firstLock.releaseAutomatically();
    setVisibility('visible');
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(2));

    setEnabled(false);
    expect(secondLock.release).toHaveBeenCalledOnce();

    dispose();
    setVisibility('hidden');
    setVisibility('visible');
    expect(request).toHaveBeenCalledTimes(2);
  });

  it('retries one automatic release without looping', async () => {
    const firstLock = new MockWakeLock();
    const retryLock = new MockWakeLock();
    const request = vi
      .fn()
      .mockResolvedValueOnce(firstLock)
      .mockResolvedValueOnce(retryLock);
    stubWakeLock(request);

    const [enabled, setEnabled] = createSignal(false);
    const dispose = createRoot((dispose) => {
      createScreenWakeLock(enabled);
      return dispose;
    });

    setEnabled(true);
    await vi.waitFor(() => expect(request).toHaveBeenCalledOnce());

    firstLock.releaseAutomatically();
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(2));

    retryLock.releaseAutomatically();
    await Promise.resolve();
    expect(request).toHaveBeenCalledTimes(2);

    dispose();
  });

  it('releases a request that resolves after being disabled', async () => {
    const lock = new MockWakeLock();
    let resolveRequest;
    const request = vi.fn(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve;
        }),
    );
    stubWakeLock(request);

    const [enabled, setEnabled] = createSignal(false);
    const dispose = createRoot((dispose) => {
      createScreenWakeLock(enabled);
      return dispose;
    });

    setEnabled(true);
    await vi.waitFor(() => expect(request).toHaveBeenCalledOnce());
    setEnabled(false);
    resolveRequest(lock);

    await vi.waitFor(() => expect(lock.release).toHaveBeenCalledOnce());
    dispose();
  });
});
