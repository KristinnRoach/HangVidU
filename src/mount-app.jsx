// src/mount-app.jsx
//
// Imperative bridge setup surface for the SolidJS app root. The actual shell is
// rendered by src/root.jsx before legacy bootstrap imports run.
import { setupAppRoot } from './setup/setupAppRoot.js';

let teardownAppRoot = null;
let mounted = false;

/**
 * Wire app-level bridges after legacy setup has initialized domain modules.
 * Idempotent: repeated calls are a no-op.
 *
 * @returns {Promise<void>}
 */
export async function mountApp() {
  if (mounted) return;
  teardownAppRoot = setupAppRoot();
  mounted = true;
}

/**
 * Tear down app-level subscriptions.
 * Safe to call multiple times.
 *
 * @returns {void}
 */
export function cleanupApp() {
  if (teardownAppRoot) {
    try {
      teardownAppRoot();
    } catch (e) {
      console.warn('[mount-app] teardown app root failed:', e);
    }
    teardownAppRoot = null;
  }
  mounted = false;
}
