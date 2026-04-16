// src/features/contacts/contacts-state.js
//
// In-memory mirror of the contacts module's cross-module state.
// See docs/WIP_Architecture/STATE_RULES.md.
//
// Rules applied:
// - Single private `state` object.
// - Single private `setState` writer (NOT exported from index.js).
// - Sync getters only — no Firebase, no storage, no awaits.
// - One canonical event: `evt:contacts:state:changed` with `{ state, prev }`.
//
// Hydration: contacts-service writes through here after every storage mutation.
// Initial bulk hydration from RTDB is wired in setup (see HANDOFF: contacts state).

import { publish } from '../../shared/events/index.js';

/**
 * @typedef {import('./storage/contact-schema.js').ContactRecord} ContactRecord
 * @typedef {{
 *   byId: Record<string, ContactRecord>,
 *   isHydrated: boolean,
 * }} ContactsStateSnapshot
 */

/** @type {ContactsStateSnapshot} */
let state = {
  byId: {},
  isHydrated: false,
};

function snapshot() {
  return {
    byId: { ...state.byId },
    isHydrated: state.isHydrated,
  };
}

/**
 * Module-private writer. Do NOT re-export from index.js.
 * Every mutation flows through here. Publishes the canonical state-change event.
 *
 * @param {Partial<ContactsStateSnapshot>} patch
 */
export function setState(patch) {
  const prev = snapshot();
  state = { ...state, ...patch };
  publish('evt:contacts:state:changed', { state: snapshot(), prev });
}

// ---------- Sync getters ----------

/** @returns {Record<string, ContactRecord>} */
export function getAllContacts() {
  return { ...state.byId };
}

/**
 * @param {string} contactId
 * @returns {ContactRecord|null}
 */
export function getContactById(contactId) {
  return state.byId[contactId] ?? null;
}

/**
 * @param {string|null|undefined} roomId
 * @returns {ContactRecord|null}
 */
export function getContactByRoomId(roomId) {
  if (!roomId) return null;
  for (const contact of Object.values(state.byId)) {
    if (contact.roomId === roomId) return contact;
  }
  return null;
}

/** @returns {boolean} */
export function getIsHydrated() {
  return state.isHydrated;
}
