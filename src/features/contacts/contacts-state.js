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
// - One snapshot boundary: never return references from private `state`.
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

/**
 * @param {ContactRecord|null|undefined} contact
 * @returns {ContactRecord|null}
 */
function cloneContact(contact) {
  return contact ? { ...contact } : null;
}

/**
 * @param {Record<string, ContactRecord>} byId
 * @returns {Record<string, ContactRecord>}
 */
function cloneContactsById(byId) {
  return Object.fromEntries(
    Object.entries(byId).map(([id, contact]) => [id, { ...contact }]),
  );
}

function snapshot() {
  return {
    byId: cloneContactsById(state.byId),
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
  return cloneContactsById(state.byId);
}

/**
 * @param {string} contactId
 * @returns {ContactRecord|null}
 */
export function getContactById(contactId) {
  return cloneContact(state.byId[contactId] ?? null);
}

/**
 * @param {string|null|undefined} roomId
 * @returns {ContactRecord|null}
 */
export function getContactByRoomId(roomId) {
  if (!roomId) return null;
  for (const contact of Object.values(state.byId)) {
    if (contact.roomId === roomId) return cloneContact(contact);
  }
  return null;
}

/**
 * @param {string} contactId
 * @returns {string|null}
 */
export function getConversationId(contactId) {
  return state.byId[contactId]?.conversationId ?? null;
}

/**
 * @param {string} [_sortedBy='lastInteractionAt']
 * @returns {ContactRecord[]}
 */
export function getAllContactsSorted(_sortedBy = 'lastInteractionAt') {
  return [...Object.values(state.byId)].sort((a, b) => {
    const aTime = a?.lastInteractionAt || a?.savedAt || 0;
    const bTime = b?.lastInteractionAt || b?.savedAt || 0;
    if (aTime !== bTime) return bTime - aTime;
    const aName = (a?.contactNickName || '').toLowerCase();
    const bName = (b?.contactNickName || '').toLowerCase();
    return aName.localeCompare(bName);
  }).map((contact) => ({ ...contact }));
}

/**
 * @returns {ContactRecord|null}
 */
export function getContactByMostRecentInteraction() {
  return getAllContactsSorted()[0] ?? null;
}

/** @returns {boolean} */
export function getIsHydrated() {
  return state.isHydrated;
}
