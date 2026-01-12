/**
 * closeOnClickOutside
 *
 * Adds document-level listeners that call `onClose` when a click/touch happens
 * outside `element`. Returns a cleanup function to remove listeners.
 *
 * @param {HTMLElement} element - The element to detect outside clicks for.
 * @param {(event: Event) => void} onClick - Callback invoked when an outside click or Escape occurs.
 * @param {Object} [options]
 * @param {Array<HTMLElement>} [options.ignore=[]] - Elements to treat as "inside" (e.g. toggle button).
 * @param {boolean} [options.esc=true] - Whether to close on Escape key.
 * @param {Array<string>} [options.events=['mousedown','touchstart']] - DOM events to listen for outside interactions.
 * @returns {() => void} cleanup - Call to remove all attached listeners.
 */
export function onClickOutside(element, onClick, options = {}) {
  if (!element || typeof onClick !== 'function') {
    throw new Error(
      'closeOnClickOutside: valid element and onClose callback required'
    );
  }

  // Todo: look into whether it is better to use Pointer Events for unified handling: events = ['pointerdown']  // Handles mouse, touch, and pen

  const {
    ignore = [],
    esc = true,
    events = ['mousedown', 'touchstart'],
  } = options;

  // Normalize ignore list to HTMLElement references
  const ignoreList = Array.isArray(ignore) ? ignore.filter(Boolean) : [];

  const outsideHandler = (evt) => {
    try {
      const target = evt.target;
      // If click is inside the element, ignore
      if (element.contains(target)) return;
      // If click is inside any ignore element, ignore
      for (const ign of ignoreList) {
        if (ign && ign.contains && ign.contains(target)) return;
        if (ign === target) return;
      }
      onClick(evt);
    } catch (err) {
      // Defensive: don't break global listener if something unexpected happens
      console.error('closeOnClickOutside handler error:', err);
    }
  };

  const keyHandler = (evt) => {
    if (esc && evt.key === 'Escape') {
      onClick(evt);
    }
  };

  // Attach listeners
  events.forEach((ev) =>
    document.addEventListener(ev, outsideHandler, { passive: true })
  );
  if (esc) document.addEventListener('keydown', keyHandler);

  // Return cleanup function
  return function cleanup() {
    events.forEach((ev) =>
      document.removeEventListener(ev, outsideHandler, { passive: true })
    );
    if (esc) document.removeEventListener('keydown', keyHandler);
  };
}

export function onDoubleClickOutside(element, onClose, options = {}) {
  return onClickOutside(element, onClose, {
    ...options,
    events: ['dblclick'],
  });
}
