import { createRoot, createSignal } from 'solid-js';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';
import { createAutoHide } from './createAutoHide';

let dispose;
function setup(active) {
  let controller;
  dispose = createRoot((cleanup) => {
    controller = createAutoHide(1000, active);
    return cleanup;
  });
  return controller;
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  dispose?.();
  vi.useRealTimers();
});

describe('createAutoHide', () => {
  it('shows on interaction and hides after inactivity', () => {
    const controller = setup();
    expect(controller.visible()).toBe(true);
    vi.advanceTimersByTime(1000);
    expect(controller.visible()).toBe(false);
    window.dispatchEvent(new Event('pointermove'));
    expect(controller.visible()).toBe(true);
    vi.advanceTimersByTime(999);
    window.dispatchEvent(new Event('keydown'));
    vi.advanceTimersByTime(999);
    expect(controller.visible()).toBe(true);
    vi.advanceTimersByTime(1);
    expect(controller.visible()).toBe(false);
  });

  it.each(['hidden', 'visible'])(
    'holds %s despite interaction and elapsed time',
    (mode) => {
      const controller = setup();
      const release = controller.hold(mode);
      for (const event of ['pointermove', 'pointerdown', 'keydown']) {
        window.dispatchEvent(new Event(event));
        vi.advanceTimersByTime(2000);
        expect(controller.visible()).toBe(mode === 'visible');
      }
      expect(vi.getTimerCount()).toBe(0);
      release();
      expect(controller.visible()).toBe(true);
      vi.advanceTimersByTime(999);
      expect(controller.visible()).toBe(true);
      vi.advanceTimersByTime(1);
      expect(controller.visible()).toBe(false);
    },
  );

  it('keeps overlapping holds independent and gives hidden precedence', () => {
    const controller = setup();
    const releaseVisible = controller.hold('visible');
    const releaseFirst = controller.hold('hidden');
    const releaseSecond = controller.hold('hidden');
    releaseFirst();
    releaseFirst();
    expect(controller.visible()).toBe(false);
    releaseSecond();
    expect(controller.visible()).toBe(true);
    vi.advanceTimersByTime(2000);
    expect(controller.visible()).toBe(true);
    releaseVisible();
    vi.advanceTimersByTime(1000);
    expect(controller.visible()).toBe(false);
  });

  it('overrides inactive auto-hide and uses the current active state on release', () => {
    const [active, setActive] = createSignal(false);
    const controller = setup(active);
    vi.advanceTimersByTime(2000);
    expect(controller.visible()).toBe(true);
    const release = controller.hold('hidden');
    expect(controller.visible()).toBe(false);
    setActive(true);
    expect(controller.visible()).toBe(false);
    release();
    vi.advanceTimersByTime(1000);
    expect(controller.visible()).toBe(false);
    setActive(false);
    expect(controller.visible()).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('removes timers and listeners on disposal and ignores later holds/releases', () => {
    const controller = setup();
    dispose();
    expect(vi.getTimerCount()).toBe(0);
    controller.hold('hidden')();
    expect(controller.visible()).toBe(true);

    const held = setup();
    const release = held.hold('hidden');
    dispose();
    release();
    window.dispatchEvent(new Event('pointermove'));
    expect(held.visible()).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
  });
});
