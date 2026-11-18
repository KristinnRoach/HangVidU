import { afterEach, expect, it, vi } from 'vite-plus/test';
import { registerSW } from 'virtual:pwa-register';
import { holdAppReload, reloadApp } from '@shared/app-reload/index.js';

vi.mock('@shared/app-reload/index.js', async (importOriginal) => ({
  ...(await importOriginal()),
  reloadApp: vi.fn(),
}));

vi.mock('virtual:pwa-register', () => ({
  registerSW: vi.fn(() => vi.fn()),
}));

let stopUpdateChecks;

afterEach(() => {
  stopUpdateChecks?.();
  vi.clearAllMocks();
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

it.each([
  ['1', 1],
  [undefined, 0],
])(
  'requests an update reload during an active call only in watch mode (flag: %s)',
  async (flag, reloadsDuringCall) => {
    vi.resetModules();
    vi.stubEnv('VITE_PREVIEW_WATCH', flag);
    vi.stubGlobal('navigator', {});
    vi.useFakeTimers();
    const handler = await import('./update-handlers.js');
    stopUpdateChecks = handler.stopUpdateChecks;
    await handler.setupUpdateHandler();

    const release = holdAppReload();
    try {
      registerSW.mock.lastCall[0].onNeedReload();
      await vi.advanceTimersByTimeAsync(0);
      expect(reloadApp).toHaveBeenCalledTimes(reloadsDuringCall);
    } finally {
      release();
    }
    await vi.advanceTimersByTimeAsync(0);
    expect(reloadApp).toHaveBeenCalledOnce();
  },
);
