// src/app/contacts-list-mount.js
//
// Imperative mount surface for the SolidJS contacts list. Preserves the
// prior API (`mountContactsList(el)` / `cleanupContactsList()`) so main.js
// and setupApp.js swap in with a one-line import change.

import { render } from 'solid-js/web';
import ContactsList from './components/ContactsList.jsx';
import { setupContactsList } from '../setup/setupContactsList.js';

let disposeRender = null;
let teardownBridges = null;
let mountedEl = null;

/**
 * Mount the contacts list into `lobbyElement`. Wires domain bridges.
 * Idempotent: repeated calls with the same element are a no-op; calling with
 * a different element remounts.
 *
 * @param {HTMLElement|null|undefined} lobbyElement
 * @returns {Promise<void>}
 */
export async function mountContactsList(lobbyElement) {
  if (!lobbyElement) return;
  if (mountedEl === lobbyElement) return;

  if (mountedEl) cleanupContactsList();

  teardownBridges = setupContactsList();
  disposeRender = render(() => <ContactsList />, lobbyElement);
  mountedEl = lobbyElement;
}

/**
 * Tear down the mounted contacts list and all its subscriptions.
 * Safe to call multiple times.
 *
 * @returns {void}
 */
export function cleanupContactsList() {
  if (disposeRender) {
    try {
      disposeRender();
    } catch (e) {
      console.warn('[contacts-list-mount] dispose render failed:', e);
    }
    disposeRender = null;
  }
  if (teardownBridges) {
    try {
      teardownBridges();
    } catch (e) {
      console.warn('[contacts-list-mount] teardown bridges failed:', e);
    }
    teardownBridges = null;
  }
  mountedEl = null;
}
