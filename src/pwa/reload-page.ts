import {
  UPDATE_RELOAD_KEY,
  whenAppReloadAllowed,
} from '@shared/app-reload/index.js';

type ReloadPageOptions = {
  whenAllowed?: () => Promise<void>;
  reload?: () => void;
};

let pendingReload: Promise<void> | null = null;

/** Reloads an activated PWA update as soon as the app is safe to interrupt. */
export function reloadPageWhenAllowed({
  whenAllowed = whenAppReloadAllowed,
  reload = () => window.location.reload(),
}: ReloadPageOptions = {}): Promise<void> {
  if (pendingReload) return pendingReload;

  pendingReload = Promise.resolve()
    .then(whenAllowed)
    .then(() => {
      try {
        sessionStorage.setItem(UPDATE_RELOAD_KEY, '1');
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
