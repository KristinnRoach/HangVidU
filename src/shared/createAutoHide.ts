import {
  createSignal,
  createMemo,
  createEffect,
  onCleanup,
  type Accessor,
} from 'solid-js';

export type AutoHideController = {
  visible: Accessor<boolean>;
  hold: (visibility: 'hidden' | 'visible') => () => void;
};

/**
 * Show on user interaction (pointer or keyboard), hide after `delayMs` of
 * idle. When `active` is provided and returns false, the helper is a no-op
 * (always visible) and no global listeners are attached. Holds override this:
 * hidden wins over visible; releasing the last hold starts a fresh idle delay.
 * Release holds with the returned function, usually via `onCleanup`.
 */
export function createAutoHide(
  delayMs: number,
  active?: Accessor<boolean>,
): AutoHideController {
  const [visible, setVisible] = createSignal(true);
  const [holds, setHolds] = createSignal<
    { visibility: 'hidden' | 'visible' }[]
  >([]);
  let disposed = false;
  onCleanup(() => {
    disposed = true;
  });
  const mode = createMemo(() => {
    const requests = holds();
    if (requests.some((hold) => hold.visibility === 'hidden')) return 'hidden';
    if (requests.length || (active && !active())) return 'visible';
    return 'auto';
  });

  createEffect(() => {
    const currentMode = mode();
    if (currentMode !== 'auto') {
      setVisible(currentMode === 'visible');
      return;
    }

    let timer: number | undefined;
    const show = () => {
      setVisible(true);
      clearTimeout(timer);
      timer = window.setTimeout(() => setVisible(false), delayMs);
    };

    const events = ['pointermove', 'pointerdown', 'keydown'] as const;
    events.forEach((e) => window.addEventListener(e, show, { passive: true }));
    show();

    onCleanup(() => {
      events.forEach((e) => window.removeEventListener(e, show));
      clearTimeout(timer);
    });
  });

  return {
    visible,
    hold(visibility) {
      if (disposed) return () => {};
      const request = { visibility };
      setHolds((current) => [...current, request]);
      let released = false;
      return () => {
        if (released || disposed) return;
        released = true;
        setHolds((current) => current.filter((hold) => hold !== request));
      };
    },
  };
}
