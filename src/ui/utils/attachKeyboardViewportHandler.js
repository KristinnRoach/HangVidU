import { isIOSDevice } from '../../utils/detect-device.js';

const FIT_STYLE_KEYS = [
  'top',
  'left',
  'right',
  'bottom',
  'width',
  'maxWidth',
  'height',
  'maxHeight',
];

function computeFitStyle({ visualViewport, margin }) {
  const availableWidth = Math.max(0, visualViewport.width - margin * 2);
  const availableHeight = Math.max(0, visualViewport.height - margin * 2);

  return {
    top: `${Math.round(visualViewport.offsetTop + margin)}px`,
    left: `${Math.round(visualViewport.offsetLeft + margin)}px`,
    right: 'auto',
    bottom: 'auto',
    width: `${Math.round(availableWidth)}px`,
    maxWidth: `${Math.round(availableWidth)}px`,
    height: `${Math.round(availableHeight)}px`,
    maxHeight: `${Math.round(availableHeight)}px`,
  };
}

/**
 * Create a handler that repositions a fixed-position element to fit inside the
 * current visual viewport. Does not attach any listeners — call `refit()` when
 * the viewport changes, and `clear()` to restore original styles.
 *
 * @param {Object} options
 * @param {HTMLElement} options.targetEl - Fixed-position element to refit
 * @param {number} [options.margin=16] - Inset (px) from each visual viewport edge
 * @returns {{ refit: () => void, clear: () => void }}
 */
export function createVisualViewportFit({ targetEl, margin = 16 }) {
  const refit = () => {
    const visualViewport = window.visualViewport;
    if (!visualViewport) return;

    const fitStyle = computeFitStyle({ visualViewport, margin });
    for (const [key, value] of Object.entries(fitStyle)) {
      targetEl.style[key] = value;
    }
  };

  const clear = () => {
    for (const key of FIT_STYLE_KEYS) {
      targetEl.style[key] = '';
    }
  };

  return { refit, clear };
}

/**
 * Respond to visual viewport changes while a focus target is active.
 * Designed for virtual-keyboard scenarios on mobile.
 *
 * On all platforms: listens to VisualViewport resize/scroll while focusEl has
 * focus and calls `afterResize` each frame (e.g. to scroll content into view).
 *
 * On iOS only: also repositions `targetEl` to fit inside the visual viewport
 * and locks page scroll, because iOS does not resize the layout viewport when
 * the keyboard opens.
 *
 * @param {Object} options
 * @param {HTMLElement} options.focusEl - Element whose focus/blur activates the cycle
 * @param {HTMLElement} options.targetEl - Fixed-position element to refit (iOS only)
 * @param {number} [options.margin=16] - Inset (px) from each visual viewport edge (iOS only)
 * @param {boolean} [options.lockPageScroll=true] - Prevent body/document scrolling while active (iOS only)
 * @param {boolean} [options.enabled=true] - Set to false to skip attachment entirely (e.g. when VisualViewport API is unavailable)
 * @param {() => void} [options.afterResize] - Called after each viewport change (all platforms)
 * @returns {() => void} Cleanup function that removes all listeners and restores styles
 */
export function attachKeyboardViewportHandler({
  focusEl,
  targetEl,
  margin = 16,
  lockPageScroll = true,
  enabled = true,
  afterResize,
}) {
  if (!enabled || !focusEl || !targetEl) return () => {};

  const needsViewportFit = isIOSDevice();
  const fit = needsViewportFit
    ? createVisualViewportFit({ targetEl, margin })
    : null;

  let lockedScrollY = 0;
  let didLockViewport = false;
  let active = false;
  let frame = 0;
  let prevBodyOverflow = null;
  let prevDocOverflow = null;

  const onResize = () => {
    if (!active) return;

    if (fit) fit.refit();
    if (typeof afterResize === 'function') afterResize();

    if (
      needsViewportFit &&
      lockPageScroll &&
      Math.abs(window.scrollY - lockedScrollY) > 1
    ) {
      window.scrollTo(0, lockedScrollY);
    }
  };

  const scheduleResize = () => {
    if (!active || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      onResize();
    });
  };

  const teardown = () => {
    active = false;

    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }

    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', scheduleResize);
      window.visualViewport.removeEventListener('scroll', scheduleResize);
    }

    if (needsViewportFit && lockPageScroll) {
      if (prevBodyOverflow !== null) {
        document.body.style.overflow = prevBodyOverflow;
        prevBodyOverflow = null;
      }
      if (prevDocOverflow !== null) {
        document.documentElement.style.overflow = prevDocOverflow;
        prevDocOverflow = null;
      }
    }

    if (fit) fit.clear();

    if (needsViewportFit && lockPageScroll && didLockViewport) {
      window.scrollTo(0, lockedScrollY);
      didLockViewport = false;
    }
  };

  const onFocus = () => {
    lockedScrollY = window.scrollY;
    didLockViewport = true;
    active = true;

    if (needsViewportFit && lockPageScroll) {
      prevBodyOverflow = document.body.style.overflow;
      prevDocOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', scheduleResize);
      window.visualViewport.addEventListener('scroll', scheduleResize);
    }

    scheduleResize();
  };

  const onBlur = () => {
    requestAnimationFrame(teardown);
  };

  focusEl.addEventListener('focus', onFocus);
  focusEl.addEventListener('blur', onBlur);

  return () => {
    focusEl.removeEventListener('focus', onFocus);
    focusEl.removeEventListener('blur', onBlur);
    teardown();
  };
}
