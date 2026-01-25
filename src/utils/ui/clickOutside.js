/**
 * closeOnClickOutside
 *
 * Adds document-level listeners that call `onClose` when a click/touch happens
 * outside `element`. Returns a cleanup function to remove listeners.
 *
 * @param {HTMLElement} element - The element to detect outside clicks for.
 * @param {(event: Event) => void} onClick - Callback invoked when an outside click or Escape occurs.
 * @param {Object} [options]
 * @param {Array<HTMLElement>|Function} [options.ignore=[]] - Elements to treat as "inside" (can be array or function returning array).
 * @param {boolean} [options.esc=true] - Whether to close on Escape key.
 * @param {Array<string>} [options.events=['mousedown','touchstart']] - DOM events to listen for outside interactions.
 * @param {boolean} [options.ignoreInputBlur=false] - Ignore clicks that dismiss mobile keyboard (prevents accidental closes).
 * @returns {() => void} cleanup - Call to remove all attached listeners.
 */
export function onClickOutside(element, onClick, options = {}) {
  if (!element || typeof onClick !== 'function') {
    throw new Error(
      'closeOnClickOutside: valid element and onClose callback required',
    );
  }

  // Todo: look into whether it is better to use Pointer Events for unified handling: events = ['pointerdown']  // Handles mouse, touch, and pen

  const {
    ignore = [],
    esc = true,
    events = ['mousedown', 'touchstart'],
    ignoreInputBlur = false, // New option: ignore clicks that blur input elements
  } = options;

  // Normalize ignore list to HTMLElement references
  let ignoreList = options.ignore || [];
  if (typeof ignoreList === 'function') {
    ignoreList = ignoreList();
  }
  ignoreList = Array.isArray(ignoreList) ? ignoreList.filter(Boolean) : [];

  // Track if an input was focused before the click (for mobile keyboard handling)
  let inputWasFocused = false;

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

      // Mobile-specific: Ignore clicks that are just dismissing the keyboard
      // This prevents the dialog from closing when user taps outside to dismiss keyboard
      if (ignoreInputBlur && inputWasFocused) {
        const clickedOnInput =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable;

        // If we're clicking on another input, allow it (switching focus)
        // Otherwise, this is likely just dismissing the keyboard - ignore it
        if (!clickedOnInput) {
          inputWasFocused = false;
          return;
        }
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

  // Track input focus state for mobile keyboard handling
  const focusHandler = () => {
    inputWasFocused = true;
  };

  const blurHandler = () => {
    // Defer to next event loop to allow click events to process first
    setTimeout(() => {
      inputWasFocused = false;
    }, 0);
  };

  // Attach listeners
  events.forEach((ev) =>
    document.addEventListener(ev, outsideHandler, { passive: true }),
  );
  if (esc) document.addEventListener('keydown', keyHandler);

  // Track input focus if ignoreInputBlur is enabled
  if (ignoreInputBlur) {
    const inputs = element.querySelectorAll(
      'input, textarea, [contenteditable]',
    );
    inputs.forEach((input) => {
      input.addEventListener('focus', focusHandler);
      input.addEventListener('blur', blurHandler);
    });
  }

  // Return cleanup function
  return function cleanup() {
    events.forEach((ev) =>
      document.removeEventListener(ev, outsideHandler, { passive: true }),
    );
    if (esc) document.removeEventListener('keydown', keyHandler);

    if (ignoreInputBlur) {
      const inputs = element.querySelectorAll(
        'input, textarea, [contenteditable]',
      );
      inputs.forEach((input) => {
        input.removeEventListener('focus', focusHandler);
        input.removeEventListener('blur', blurHandler);
      });
    }
  };
}

export function onDoubleClickOutside(element, onClose, options = {}) {
  return onClickOutside(element, onClose, {
    ...options,
    events: ['dblclick'],
  });
}
