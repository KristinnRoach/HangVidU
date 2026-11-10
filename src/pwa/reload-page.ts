import { whenAppReloadAllowed } from '@shared/app-reload/index.js';

type ReloadPageOptions = {
  whenAllowed?: () => Promise<void>;
  reload?: () => void;
};

const PRELOAD_RELOAD_KEY = 'pwa:preload-error-reloaded-at';
// Long enough that a chunk still missing after the reload can't loop.
const PRELOAD_RELOAD_COOLDOWN_MS = 60_000;

let pendingReload: Promise<void> | null = null;

/** Reloads an activated PWA update as soon as the app is safe to interrupt. */
export function reloadPageWhenAllowed({
  whenAllowed = whenAppReloadAllowed,
  reload = () => window.location.reload(),
}: ReloadPageOptions = {}): Promise<void> {
  if (pendingReload) return pendingReload;

  pendingReload = Promise.resolve()
    .then(whenAllowed)
    .then(reload)
    .finally(() => {
      pendingReload = null;
    });
  return pendingReload;
}

/**
 * Reloads once a dynamic import fails, e.g. a stale client requesting a chunk
 * that a newer deploy removed (Vite's `vite:preloadError`).
 */
export function reloadAfterPreloadError({
  reload = () => window.location.reload(),
  ...options
}: ReloadPageOptions = {}): Promise<void> | undefined {
  const reloadedAt = Number(sessionStorage.getItem(PRELOAD_RELOAD_KEY));
  if (Date.now() - reloadedAt < PRELOAD_RELOAD_COOLDOWN_MS) return;

  return reloadPageWhenAllowed({
    ...options,
    reload: () => {
      sessionStorage.setItem(PRELOAD_RELOAD_KEY, String(Date.now()));
      reload();
    },
  });
}
