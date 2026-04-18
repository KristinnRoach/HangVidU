import { render } from 'solid-js/web';

/**
 * Imperatively mount a Solid dialog component and resolve once the component
 * calls `close(value)`. Useful for migrating promise-based modal APIs one
 * surface at a time without changing existing callers.
 *
 * @template T
 * @param {(controls: { close: (value: T) => void }) => import('solid-js').JSX.Element} renderDialog
 * @returns {Promise<T>}
 */
export function openSolidDialog(renderDialog) {
  return new Promise((resolve) => {
    const host = document.createElement('div');
    document.body.appendChild(host);

    let settled = false;
    let dispose = () => {};

    const close = (value) => {
      if (settled) return;
      settled = true;

      try {
        dispose();
      } catch (e) {
        console.warn('[solid-dialog] dispose failed:', e);
      }

      try {
        host.remove();
      } catch (e) {
        console.warn('[solid-dialog] host removal failed:', e);
      }

      resolve(value);
    };

    dispose = render(() => renderDialog({ close }), host);
  });
}
