function isIOSDevice() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const ua = navigator.userAgent || navigator.vendor || '';
  return (
    (/iPad|iPhone|iPod/.test(ua) ||
      (/Macintosh/.test(ua) &&
        typeof navigator.maxTouchPoints === 'number' &&
        navigator.maxTouchPoints > 1)) &&
    !window.MSStream
  );
}

/**
 * Keep a fixed panel aligned to the visible viewport while the iOS keyboard is open.
 *
 * This is intentionally scoped to the messages UI shape:
 * - one focusable input
 * - one fixed panel that should stay inside the visual viewport
 * - temporary inline style overrides while focused
 *
 * @param {Object} options
 * @param {HTMLElement} options.inputEl
 * @param {HTMLElement} options.panelEl
 * @param {number} [options.margin=16]
 */
export function attachIOSKeyboardViewportSync({
  inputEl,
  panelEl,
  margin = 16,
}) {
  if (!isIOSDevice() || !inputEl || !panelEl) return () => {};

  let lockedScrollY = 0;
  let didLockViewport = false;
  let viewportSyncActive = false;
  let viewportSyncFrame = 0;
  let prevBodyOverflow = null;
  let prevDocOverflow = null;

  const syncToVisualViewport = () => {
    const vv = window.visualViewport;
    if (!vv || !viewportSyncActive) return;

    const availableWidth = Math.max(0, vv.width - margin * 2);
    const availableHeight = Math.max(0, vv.height - margin * 2);
    const width = availableWidth;
    const height = availableHeight;

    panelEl.style.top = `${Math.round(vv.offsetTop + margin)}px`;
    panelEl.style.left = `${Math.round(vv.offsetLeft + margin)}px`;
    panelEl.style.right = 'auto';
    panelEl.style.bottom = 'auto';
    panelEl.style.width = `${Math.round(width)}px`;
    panelEl.style.maxWidth = `${Math.round(width)}px`;
    panelEl.style.height = `${Math.round(height)}px`;
    panelEl.style.maxHeight = `${Math.round(height)}px`;

    if (Math.abs(window.scrollY - lockedScrollY) > 1) {
      window.scrollTo(0, lockedScrollY);
    }
  };

  const scheduleViewportSync = () => {
    if (!viewportSyncActive || viewportSyncFrame) return;
    viewportSyncFrame = requestAnimationFrame(() => {
      viewportSyncFrame = 0;
      syncToVisualViewport();
    });
  };

  const stopViewportSync = () => {
    viewportSyncActive = false;
    if (viewportSyncFrame) {
      cancelAnimationFrame(viewportSyncFrame);
      viewportSyncFrame = 0;
    }

    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', scheduleViewportSync);
      window.visualViewport.removeEventListener('scroll', scheduleViewportSync);
    }

    if (prevBodyOverflow !== null) {
      document.body.style.overflow = prevBodyOverflow;
      prevBodyOverflow = null;
    }
    if (prevDocOverflow !== null) {
      document.documentElement.style.overflow = prevDocOverflow;
      prevDocOverflow = null;
    }
    panelEl.style.top = '';
    panelEl.style.left = '';
    panelEl.style.right = '';
    panelEl.style.bottom = '';
    panelEl.style.width = '';
    panelEl.style.maxWidth = '';
    panelEl.style.height = '';
    panelEl.style.maxHeight = '';
    if (didLockViewport) {
      window.scrollTo(0, lockedScrollY);
      didLockViewport = false;
    }
  };

  inputEl.addEventListener('focus', () => {
    lockedScrollY = window.scrollY;
    didLockViewport = true;
    viewportSyncActive = true;
    prevBodyOverflow = document.body.style.overflow;
    prevDocOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', scheduleViewportSync);
      window.visualViewport.addEventListener('scroll', scheduleViewportSync);
    }

    scheduleViewportSync();
  });

  inputEl.addEventListener('blur', () => {
    requestAnimationFrame(stopViewportSync);
  });

  return stopViewportSync;
}
