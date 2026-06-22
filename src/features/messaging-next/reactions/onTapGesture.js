/**
 * Unified tap/click gesture handler for an element.
 * Distinguishes single tap, double tap, and long press.
 *
 * @param {HTMLElement} element - Target element
 * @param {Object} handlers
 * @param {Function} [handlers.onSingleTap] - Called on confirmed single tap (after delay)
 * @param {Function} [handlers.onDoubleTap] - Called on double tap
 * @param {Function} [handlers.onLongPress] - Called on long press
 * @param {Object} [opts]
 * @param {number} [opts.doubleTapDelay=300] - Max ms between taps for double-tap
 * @param {number} [opts.longPressDelay=500] - Ms to hold before long-press fires
 * @param {Function} [opts.ignoreTarget] - Return true to skip gesture handling for this target
 * @returns {{ destroy: Function }}
 */
export function onTapGesture(
  element,
  { onSingleTap, onDoubleTap, onLongPress } = {},
  { doubleTapDelay = 300, longPressDelay = 500, ignoreTarget } = {},
) {
  const isTouchDevice = 'ontouchstart' in window;
  const tapEvent = isTouchDevice ? 'touchend' : 'click';

  let lastTapTime = 0;
  let singleTapTimer = null;
  let longPressTimer = null;

  const shouldIgnore = (e) => {
    if (ignoreTarget && ignoreTarget(e.target)) return true;
    const tag = e.target.tagName;
    return tag === 'A' || tag === 'BUTTON';
  };

  // --- Tap (single / double) ---
  const handleTap = (e) => {
    if (shouldIgnore(e)) return;

    const now = Date.now();

    if (lastTapTime && now - lastTapTime < doubleTapDelay) {
      // Double tap
      if (singleTapTimer) {
        clearTimeout(singleTapTimer);
        singleTapTimer = null;
      }
      lastTapTime = 0;
      e.preventDefault();
      onDoubleTap?.(e);
    } else {
      // First tap — schedule single tap
      lastTapTime = now;
      if (onSingleTap) {
        if (singleTapTimer) clearTimeout(singleTapTimer);
        singleTapTimer = setTimeout(() => {
          singleTapTimer = null;
          onSingleTap(e);
        }, doubleTapDelay);
      }
    }
  };

  // --- Long press ---
  const startLongPress = (e) => {
    if (!onLongPress || shouldIgnore(e)) return;

    longPressTimer = setTimeout(() => {
      longPressTimer = null;
      // The touchend that releases this long-press also reaches handleTap;
      // clear lastTapTime so that touchend isn't mistaken for the first half
      // of a double-tap.
      lastTapTime = 0;
      onLongPress(e);
    }, longPressDelay);
  };

  const cancelLongPress = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  };

  // --- Attach ---
  element.addEventListener(tapEvent, handleTap, { passive: false });

  if (isTouchDevice) {
    element.addEventListener('touchstart', startLongPress, { passive: true });
    element.addEventListener('touchend', cancelLongPress, { passive: true });
    element.addEventListener('touchmove', cancelLongPress, { passive: true });
    element.addEventListener('touchcancel', cancelLongPress, { passive: true });
  } else {
    element.addEventListener('mousedown', startLongPress);
    element.addEventListener('mouseup', cancelLongPress);
    element.addEventListener('mouseleave', cancelLongPress);
  }

  return {
    destroy: () => {
      element.removeEventListener(tapEvent, handleTap);
      if (isTouchDevice) {
        element.removeEventListener('touchstart', startLongPress);
        element.removeEventListener('touchend', cancelLongPress);
        element.removeEventListener('touchmove', cancelLongPress);
        element.removeEventListener('touchcancel', cancelLongPress);
      } else {
        element.removeEventListener('mousedown', startLongPress);
        element.removeEventListener('mouseup', cancelLongPress);
        element.removeEventListener('mouseleave', cancelLongPress);
      }
      if (singleTapTimer) clearTimeout(singleTapTimer);
      cancelLongPress();
      lastTapTime = 0;
    },
  };
}
