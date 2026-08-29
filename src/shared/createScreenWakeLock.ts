import { createEffect, onCleanup, type Accessor } from 'solid-js';

/** Keep the screen awake while `enabled` is true and the page is visible. */
export function createScreenWakeLock(enabled: Accessor<boolean>): void {
  if (typeof document === 'undefined' || typeof navigator === 'undefined') {
    return;
  }

  let shouldHoldLock = false;
  let lock: WakeLockSentinel | undefined;
  let requestPending = false;
  let releaseRetryAvailable = false;

  const release = () => {
    const currentLock = lock;
    lock = undefined;
    if (currentLock && !currentLock.released) {
      void currentLock.release();
    }
  };

  const request = async () => {
    if (
      !shouldHoldLock ||
      document.visibilityState !== 'visible' ||
      requestPending ||
      (lock && !lock.released) ||
      !('wakeLock' in navigator)
    ) {
      return;
    }

    requestPending = true;
    try {
      const requestedLock = await navigator.wakeLock.request('screen');
      if (shouldHoldLock && document.visibilityState === 'visible') {
        lock = requestedLock;
        requestedLock.addEventListener(
          'release',
          () => {
            if (lock !== requestedLock) return;
            lock = undefined;
            if (releaseRetryAvailable) {
              releaseRetryAvailable = false;
              queueMicrotask(() => void request());
            }
          },
          { once: true },
        );
      } else {
        void requestedLock.release();
      }
    } catch (error) {
      console.warn('[ScreenWakeLock] Request failed:', error);
    } finally {
      requestPending = false;
    }
  };

  const requestWhenVisible = () => {
    if (document.visibilityState !== 'visible') return;
    releaseRetryAvailable = true;
    void request();
  };
  document.addEventListener('visibilitychange', requestWhenVisible);

  createEffect(() => {
    const nextShouldHoldLock = enabled();
    if (nextShouldHoldLock && !shouldHoldLock) {
      releaseRetryAvailable = true;
    }
    shouldHoldLock = nextShouldHoldLock;
    if (shouldHoldLock) void request();
    else {
      releaseRetryAvailable = false;
      release();
    }
  });

  onCleanup(() => {
    shouldHoldLock = false;
    document.removeEventListener('visibilitychange', requestWhenVisible);
    release();
  });
}
