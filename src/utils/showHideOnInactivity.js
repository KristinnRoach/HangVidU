import { showElement, hideElement } from './ui-utils.js';

/**
 * Setup show/hide behavior for an element based on user inactivity.
 * @param {HTMLElement} element - Element to show/hide
 * @param {Object} [options]
 * @param {number} [options.inactivityMs=3000] - milliseconds of inactivity before hiding
 * @param {Array<String>} [options.excludeEvents='keydown']  - Activity events to exclude
 * @param {EventTarget} [options.listenTarget=document] - element/document to attach activity listeners to
 * @param {Function} [options.onShow] - optional callback invoked when element is shown: () => void
 * @param {Function} [options.onHide] - optional callback invoked when element is hidden: () => void
 * @param {boolean} [options.hideOnEsc=false] - hide element when Escape key is pressed
 * @returns {Function} cleanup() - call to remove listeners and clear timers
 */
export function setupShowHideOnInactivity(
  element,
  {
    inactivityMs = 3000,
    listenTarget = document,
    onShow = null,
    onHide = null,
    hideOnEsc = false,
    excludeEvents = ['keydown'],
  } = {}
) {
  if (!element) return () => {};

  let hideTimeout = null;

  const activityEvents = [
    'pointermove',
    'pointerdown',
    'pointerup',
    'touchstart',
    'touchmove',
    'mousemove',
    'mousedown',
    'keydown',
  ];

  // Allow callers to exclude certain activity events (e.g. exclude 'keydown')
  const filteredActivityEvents = activityEvents.filter(
    (ev) => !Array.isArray(excludeEvents) || !excludeEvents.includes(ev)
  );

  function showAndSchedule() {
    showElement(element);

    // Notify caller that element is visible
    try {
      if (typeof onShow === 'function') onShow();
    } catch (err) {
      console.warn('showHideOnInactivity onShow callback error:', err);
    }

    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }

    hideTimeout = setTimeout(() => {
      hideElement(element);
      // Notify caller that element was hidden
      try {
        if (typeof onHide === 'function') onHide();
      } catch (err) {
        console.warn('showHideOnInactivity onHide callback error:', err);
      }

      hideTimeout = null;
    }, inactivityMs);
  }

  filteredActivityEvents.forEach((ev) =>
    listenTarget.addEventListener(ev, showAndSchedule, { passive: true })
  );

  function onVisibilityChange() {
    if (document.hidden) {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      try {
        hideElement(element);
      } catch (err) {
        console.warn(
          'showHideOnInactivity onHide (visibilitychange) callback error:',
          err
        );
      }
    } else {
      showAndSchedule();
    }
  }

  document.addEventListener('visibilitychange', onVisibilityChange);

  function onMouseOut(e) {
    // relatedTarget is null when the pointer left the document
    if (!e.relatedTarget) {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      hideElement(element);
      try {
        if (typeof onHide === 'function') onHide();
      } catch (err) {
        console.warn(
          'showHideOnInactivity onHide (visibilitychange) callback error:',
          err
        );
      }
    }
  }

  listenTarget.addEventListener('mouseout', onMouseOut);

  // Optional: hide on Escape key
  function onKeyDownForEsc(e) {
    if (!hideOnEsc) return;
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      hideElement(element);
      try {
        if (typeof onHide === 'function') onHide();
      } catch (err) {
        console.warn('showHideOnInactivity onHide (esc) callback error:', err);
      }
    }
  }

  document.addEventListener('keydown', onKeyDownForEsc);

  function onTouchEnd() {
    if (!hideTimeout) showAndSchedule();
  }
  listenTarget.addEventListener('touchend', onTouchEnd, { passive: true });

  // Start hidden
  hideElement(element);

  // Cleanup function to remove listeners and clear timeout
  function cleanup() {
    filteredActivityEvents.forEach((ev) =>
      listenTarget.removeEventListener(ev, showAndSchedule)
    );
    document.removeEventListener('visibilitychange', onVisibilityChange);
    listenTarget.removeEventListener('mouseout', onMouseOut);
    listenTarget.removeEventListener('touchend', onTouchEnd);
    document.removeEventListener('keydown', onKeyDownForEsc);
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
  }

  return cleanup;
}

export default setupShowHideOnInactivity;
