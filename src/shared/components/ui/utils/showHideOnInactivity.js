import { showElement, hideElement } from './ui-utils.js';

/**
 * Setup show/hide behavior for an element based on user inactivity.
 * @param {HTMLElement} element - Element to show/hide
 * @param {Object} [options]
 * @param {number} [options.inactivityMs=3000] - milliseconds of inactivity before hiding
 * @param {Array<String>} [options.excludeEvents='keydown']  - Activity events to exclude
 * @param {Array<String|Element>} [options.excludeElements=[]] - Elements to ignore (CSS selectors or element refs)
 * @param {boolean} [options.excludeInteractive=false] - Exclude all interactive elements (buttons, inputs, etc.)
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
    excludeElements = [],
    excludeInteractive = false,
  } = {},
) {
  if (!element) return () => {};

  // Validate excludeElements: remove the controlled element itself
  const validatedExcludeElements = Array.isArray(excludeElements)
    ? excludeElements.filter((ex) => {
        if (ex === element) {
          console.warn(
            'setupShowHideOnInactivity: The controlled element cannot be excluded from inactivity show/hide. ' +
              'Removing it from excludeElements. The controlled element will always respond to inactivity.',
          );
          return false;
        }
        return true;
      })
    : [];

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
    (ev) => !Array.isArray(excludeEvents) || !excludeEvents.includes(ev),
  );

  // Build exclude list with interactive elements selector if requested
  const finalExcludeElements = [...validatedExcludeElements];
  if (excludeInteractive) {
    finalExcludeElements.push(
      'button, input, textarea, select, a, [role="button"], [role="link"], [role="tab"], [contenteditable], label, details',
    );
  }

  function showAndSchedule(event) {
    // Check if event originated from an excluded element
    if (event?.target && finalExcludeElements.length > 0) {
      // Ensure event.target is an Element before using Element methods
      const targetEl = event.target instanceof Element ? event.target : null;
      if (!targetEl) return showAndScheduleImpl();

      for (const exclude of finalExcludeElements) {
        // Handle CSS selector strings
        if (typeof exclude === 'string') {
          // Guard against invalid selectors and ensure closest is available
          if (
            typeof targetEl.closest === 'function' &&
            targetEl.closest(exclude)
          ) {
            return; // Don't show - event from excluded element
          }
        }
        // Handle direct element references
        else if (typeof Element !== 'undefined' && exclude instanceof Element) {
          if (targetEl === exclude) {
            return; // Don't show - event from excluded element
          }
          if (
            typeof exclude.contains === 'function' &&
            exclude.contains(targetEl)
          ) {
            return; // Don't show - event from excluded element
          }
        }
      }
    }

    return showAndScheduleImpl();
  }

  function showAndScheduleImpl() {
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
    listenTarget.addEventListener(ev, showAndSchedule, { passive: true }),
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
          'showHideOnInactivity hideElement (visibilitychange) error:',
          err,
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
          'showHideOnInactivity onHide (mouseout) callback error:',
          err,
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

  function onTouchEnd(event) {
    if (!hideTimeout) showAndSchedule(event);
  }
  listenTarget.addEventListener('touchend', onTouchEnd, { passive: true });

  // Start hidden
  hideElement(element);

  // Cleanup function to remove listeners and clear timeout
  function cleanup() {
    filteredActivityEvents.forEach((ev) =>
      listenTarget.removeEventListener(ev, showAndSchedule),
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
