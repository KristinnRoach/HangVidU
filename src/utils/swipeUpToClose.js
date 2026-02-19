/**
 * Attaches swipe-up-to-close gesture to an element.
 * Calls the provided callback when swipe-up threshold is met.
 *
 * @param {HTMLElement} el - Element to attach gesture to
 * @param {Function} onClose - Callback to call on swipe-up
 * @param {Object} [opts] - Options: { thresholdPx, maxAngleDeg }
 * @returns {Function} detach - Removes listeners
 */
export function attachSwipeUpToClose(el, onClose, opts = {}) {
  const thresholdPx = opts.thresholdPx || 80;
  const maxAngleDeg = opts.maxAngleDeg || 30; // Allow some horizontal movement
  let startY = null;
  let startX = null;
  let moved = false;
  let closing = false;

  function onTouchStart(e) {
    if (e.touches.length !== 1) return;
    startY = e.touches[0].clientY;
    startX = e.touches[0].clientX;
    moved = false;
    closing = false;
  }

  function onTouchMove(e) {
    if (startY === null) return;
    const y = e.touches[0].clientY;
    const x = e.touches[0].clientX;
    const dy = startY - y;
    const dx = x - startX;
    if (dy > 0) moved = true;
    // Angle check: tan(theta) = dx/dy
    const angle = Math.abs((Math.atan2(dx, dy) * 180) / Math.PI);
    if (dy > thresholdPx && angle < maxAngleDeg && !closing) {
      closing = true;
      onClose();
    }
  }

  function onTouchEnd() {
    startY = null;
    startX = null;
    moved = false;
    closing = false;
  }

  el.addEventListener('touchstart', onTouchStart);
  el.addEventListener('touchmove', onTouchMove);
  el.addEventListener('touchend', onTouchEnd);
  el.addEventListener('touchcancel', onTouchEnd);

  // Detach utility
  return function detach() {
    el.removeEventListener('touchstart', onTouchStart);
    el.removeEventListener('touchmove', onTouchMove);
    el.removeEventListener('touchend', onTouchEnd);
    el.removeEventListener('touchcancel', onTouchEnd);
  };
}
