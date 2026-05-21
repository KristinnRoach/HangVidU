import {
  createSignal,
  createEffect,
  onCleanup,
  type Accessor,
} from 'solid-js';

/**
 * Show on user interaction (pointer or keyboard), hide after `delayMs` of
 * idle. When `active` is provided and returns false, the helper is a no-op
 * (always visible) and no global listeners are attached.
 */
export function createAutoHide(
  delayMs: number,
  active?: Accessor<boolean>
): Accessor<boolean> {
  const [visible, setVisible] = createSignal(true);

  createEffect(() => {
    if (active && !active()) {
      setVisible(true);
      return;
    }

    let timer: number | undefined;
    const show = () => {
      setVisible(true);
      clearTimeout(timer);
      timer = window.setTimeout(() => setVisible(false), delayMs);
    };

    const events = ['pointermove', 'pointerdown', 'keydown'] as const;
    events.forEach((e) =>
      window.addEventListener(e, show, { passive: true })
    );
    show();

    onCleanup(() => {
      events.forEach((e) => window.removeEventListener(e, show));
      clearTimeout(timer);
    });
  });

  return visible;
}
