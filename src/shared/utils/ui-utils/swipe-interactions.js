// Swipe detector (pointer-first, falls back to touch)
export function onSwipe(element, callbacks = {}, options = {}) {
  const { onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight } = callbacks;

  const {
    minDistancePx = 30,
    maxDurationMs = 500,
    // default touchAction blocks native scroll/swipe - currently needed for reliable iOS swipe
    // Override for specific use cases (e.g. horizontal swipe in a scrollable container, Pinch-to-zoom etc.)
    touchAction = 'none',
    enablePreventDefault = true,
  } = options;

  const abortController = new AbortController();
  const signal = abortController.signal;

  let startX = 0;
  let startY = 0;
  let startTime = 0;

  const start = (x, y) => {
    startX = x;
    startY = y;
    startTime = performance.now();
  };

  const end = (x, y) => {
    const dx = x - startX;
    const dy = y - startY;
    const dt = performance.now() - startTime;
    if (dt > maxDurationMs) return; // too slow
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (absX < minDistancePx && absY < minDistancePx) return; // too short

    if (absX > absY) {
      // horizontal swipe
      if (dx > 0 && onSwipeRight) onSwipeRight();
      else if (dx < 0 && onSwipeLeft) onSwipeLeft();
    } else {
      // vertical swipe
      if (dy > 0 && onSwipeDown) onSwipeDown();
      else if (dy < 0 && onSwipeUp) onSwipeUp();
    }
  };

  // Pointer Events
  if (window.PointerEvent) {
    element.style.touchAction = touchAction || 'none';

    let pointerDown = false;

    element.addEventListener(
      'pointerdown',
      (e) => {
        if (enablePreventDefault === true && e.isPrimary) e.preventDefault(); // Block iOS scroll immediately
        pointerDown = true;
        start(e.clientX, e.clientY);
      },
      { passive: false, signal }, // Auto cleanup via signal, non-passive to allow preventDefault
    );

    element.addEventListener('pointermove', () => {}, {
      passive: true,
      signal,
    });

    element.addEventListener(
      'pointerup',
      (e) => {
        if (!pointerDown) return;
        pointerDown = false;
        end(e.clientX, e.clientY);
      },
      { passive: true, signal },
    );

    element.addEventListener(
      'pointercancel',
      () => {
        pointerDown = false;
      },
      { passive: true, signal },
    );
  } else {
    // Fallback: touch events (iOS etc.)
    let touching = false;

    element.addEventListener(
      'touchstart',
      (e) => {
        enablePreventDefault && e.preventDefault();
        if (!e.touches.length) return;
        touching = true;
        const t = e.touches[0];
        start(t.clientX, t.clientY);
      },
      { passive: false, signal },
    );

    element.addEventListener(
      'touchend',
      (e) => {
        if (!touching) return;
        touching = false;
        if (!e.changedTouches.length) return;
        const t = e.changedTouches[0];
        end(t.clientX, t.clientY);
      },
      { passive: true, signal },
    );
  }

  return () => {
    abortController.abort(); // Remove all listeners
    element.style.touchAction = '';
  };
}

/* Usage examples:

const cleanupSwipe = onSwipe(dialog, { onSwipeUp: close }, { touchAction: 'none' });  

const cleanupSwipe = onSwipe(scrollContainer, { onSwipeLeft: nextImg }, { 
  touchAction: 'pan-y'  // Allow vertical scroll, block horizontal
});

const cleanupSwipe = onSwipe(pinchZoomImg, callbacks, { touchAction: 'auto' }); // Allow zoom+scroll
*/

/* Common touch-action values for swipes

none      // Block all gestures ✓ your modal
pan-x     // Allow horizontal scroll, block vertical swipe
pan-y     // Allow vertical scroll, block horizontal swipe ✓ galleries
pan-x pan-y  // Allow scroll both ways, block pinch/zoom
manipulation  // Allow scroll+zoom, block double-tap zoom
auto      // Native behavior (no interference)

*/
