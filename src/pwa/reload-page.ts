import {
  PAGE_RELOAD_REASON_KEY,
  whenAppReloadAllowed,
} from '@shared/app-reload/index.js';

type ReloadPageOptions = {
  whenAllowed?: () => Promise<void>;
  reload?: () => void;
  reason?: 'sw-update-reload' | 'stale-chunk-reload';
};

const PRELOAD_RELOAD_KEY = 'pwa:preload-error-reloaded-at';
// Long enough that a chunk still missing after the reload can't loop.
const PRELOAD_RELOAD_COOLDOWN_MS = 60_000;

let pendingReload: Promise<void> | null = null;

/** Reloads the page as soon as the app is safe to interrupt, recording why. */
export function reloadPageWhenAllowed({
  reason = 'sw-update-reload',
  whenAllowed = whenAppReloadAllowed,
  reload = () => window.location.reload(),
}: ReloadPageOptions = {}): Promise<void> {
  if (pendingReload) return pendingReload;

  pendingReload = Promise.resolve()
    .then(whenAllowed)
    .then(() => {
      if (reason === 'stale-chunk-reload') {
        try {
          sessionStorage.setItem(PRELOAD_RELOAD_KEY, String(Date.now()));
        } catch {
          // Without a saved cooldown, another import failure could loop.
          return;
        }
      }
      try {
        sessionStorage.setItem(PAGE_RELOAD_REASON_KEY, reason);
      } catch {
        // Storage blocked: the load is just tagged 'reload' instead.
      }
      reload();
    })
    .finally(() => {
      pendingReload = null;
    });
  return pendingReload;
}

/**
 * Reloads once a dynamic import fails, e.g. a stale client requesting a chunk
 * that a newer deploy removed (Vite's `vite:preloadError`).
 */
export function reloadAfterPreloadError(
  options: ReloadPageOptions = {},
): Promise<void> | undefined {
  let reloadedAt: number;
  try {
    reloadedAt = Number(sessionStorage.getItem(PRELOAD_RELOAD_KEY));
  } catch {
    // Without a persistent cooldown, a reload could repeat indefinitely.
    return;
  }
  if (Date.now() - reloadedAt < PRELOAD_RELOAD_COOLDOWN_MS) return;

  return reloadPageWhenAllowed({ ...options, reason: 'stale-chunk-reload' });
}
