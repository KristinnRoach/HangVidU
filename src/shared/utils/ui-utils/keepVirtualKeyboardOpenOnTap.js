/**
 * Stop iOS Safari from dismissing the virtual keyboard when the user taps
 * a button while a textarea/input is focused.
 *
 * Background: tapping any element in iOS Safari blurs the currently focused
 * input, which closes the virtual keyboard. Calling preventDefault() on the
 * `pointerdown` event suppresses that blur. Because preventDefault on
 * pointerdown also cancels the synthetic click, the caller passes an
 * `onTap` callback to perform whatever the click would have done.
 *
 * Typical use: a Send button next to a chat composer textarea, where the
 * keyboard must stay open across consecutive sends.
 *
 * @param {HTMLElement} buttonEl - The button element.
 * @param {(event: PointerEvent) => void} onTap - Action to run on tap.
 * @returns {() => void} Cleanup function that removes the listener.
 */
export function keepVirtualKeyboardOpenOnTap(buttonEl, onTap) {
  if (!buttonEl) return () => {};

  const pointerDownHandler = (event) => {
    // Only reject non-primary mouse buttons. Touch/pen pointer events on iOS
    // can report unexpected `button` values, and strict filtering breaks the
    // keyboard-retention path entirely.
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    onTap(event);
  };

  const clickHandler = (event) => {
    if (event.detail !== 0) return; // pointer activation already handled above
    onTap(event);
  };

  buttonEl.addEventListener('pointerdown', pointerDownHandler, {
    passive: false,
  });
  buttonEl.addEventListener('click', clickHandler);
  return () => {
    buttonEl.removeEventListener('pointerdown', pointerDownHandler);
    buttonEl.removeEventListener('click', clickHandler);
  };
}
