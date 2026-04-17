// src/app/mount-app.jsx
//
// Imperative mount surface for the SolidJS app root. This preserves a simple
// mount/cleanup API while the rest of the app still boots through setup/main.

import { render } from 'solid-js/web';
import App from './App.jsx';
import { setupAppRoot } from './setupAppRoot.js';

let disposeRender = null;
let teardownAppRoot = null;
let mountedEl = null;

/**
 * Mount the Solid app root into `mountEl`. Wires app-level bridges.
 * Idempotent: repeated calls with the same element are a no-op; calling with
 * a different element remounts.
 *
 * @param {HTMLElement|null|undefined} mountEl
 * @returns {Promise<void>}
 */
export async function mountApp(mountEl) {
  if (!mountEl) return;
  if (mountedEl === mountEl) return;

  if (mountedEl) cleanupApp();

  teardownAppRoot = setupAppRoot();
  disposeRender = render(() => <App />, mountEl);
  mountedEl = mountEl;
}

/**
 * Tear down the mounted Solid app root and all app-level subscriptions.
 * Safe to call multiple times.
 *
 * @returns {void}
 */
export function cleanupApp() {
  if (disposeRender) {
    try {
      disposeRender();
    } catch (e) {
      console.warn('[mount-app] dispose render failed:', e);
    }
    disposeRender = null;
  }
  if (teardownAppRoot) {
    try {
      teardownAppRoot();
    } catch (e) {
      console.warn('[mount-app] teardown app root failed:', e);
    }
    teardownAppRoot = null;
  }
  mountedEl = null;
}
