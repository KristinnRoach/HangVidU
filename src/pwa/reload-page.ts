import {
  PAGE_RELOAD_REASON_KEY,
  whenAppReloadAllowed,
} from '@shared/app-reload/index.js';

type ReloadPageOptions = {
  whenAllowed?: () => Promise<void>;
  reload?: () => void;
  reason?: 'sw-update-reload' | 'stale-chunk-reload';
};

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
