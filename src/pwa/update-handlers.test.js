import { afterEach, expect, it, vi } from 'vite-plus/test';

vi.mock('virtual:pwa-register', () => ({
  registerSW: vi.fn(() => vi.fn()),
}));

let stopUpdateChecks;

afterEach(() => {
  stopUpdateChecks?.();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

it.each([
  ['1', 3_000],
  [undefined, 20 * 60 * 1000],
])(
  'checks for updates at the expected interval (preview watch: %s)',
  async (flag, interval) => {
    vi.resetModules();
    vi.stubEnv('VITE_PREVIEW_WATCH', flag);
    vi.useFakeTimers();
    const update = vi.fn();
    vi.stubGlobal('navigator', {
      onLine: true,
      serviceWorker: { getRegistration: vi.fn(async () => ({ update })) },
    });
    const handler = await import('./update-handlers.js');
    stopUpdateChecks = handler.stopUpdateChecks;
    await handler.setupUpdateHandler();
    expect(update).toHaveBeenCalledOnce();

    await vi.advanceTimersByTimeAsync(interval - 1);
    expect(update).toHaveBeenCalledOnce();
    await vi.advanceTimersByTimeAsync(1);
    expect(update).toHaveBeenCalledTimes(2);

    stopUpdateChecks();
    await vi.advanceTimersByTimeAsync(interval);
    expect(update).toHaveBeenCalledTimes(2);
  },
);
