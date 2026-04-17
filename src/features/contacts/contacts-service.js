import { getIsLoggedIn, getLoggedInUserId } from '../../auth/index.js';
import { rtdb } from '../../shared/storage/fb-rtdb/rtdb.js';
import {
  createContactsLocalStore,
  createContactsRTDBStore,
} from './storage/index.js';
import { resolveDirectConversationId } from '../../shared/utils/direct-conversation-id.js';
import { publish } from '../../shared/events/index.js';
import { setState, getAllContacts, getIsHydrated } from './contacts-state.js';
// PAUSED: claude --resume edf6030f-72fb-4503-9175-bfc21d2d973c

/**
 * @typedef {import('./storage/contact-schema.js').ContactRecord} ContactRecord
 */

/**
 * @typedef {{ action: 'existing' | 'skip' | 'prompt-save', reason?: string }} HangUpResult
 */

/** @type {Promise<void>|null} */
let hydrationPromise = null;
/** @type {string|null} */
let hydrationPromiseScopeKey = null;
/** @type {string|null} */
let hydratedScopeKey = null;
let hydrationRequestId = 0;

/**
 * Resolve the current hydration scope.
 *
 * Contacts state is scoped to the logged-in user when authenticated,
 * otherwise it is scoped to guest storage.
 *
 * @param {string|null} [ownerId=getLoggedInUserId()]
 * @returns {string}
 */
function getHydrationScopeKey(ownerId = getLoggedInUserId()) {
  return ownerId ? `user:${ownerId}` : 'guest';
}

/**
 * Resolve the active storage backend for the current auth state.
 *
 * @param {string|null} [ownerId=getLoggedInUserId()]
 * @returns {import('./storage/contacts-store.js').ContactsStore}
 */
function getContactsStorage(ownerId = getLoggedInUserId()) {
  if (ownerId) {
    return createContactsRTDBStore({
      database: rtdb,
      getOwnerId: () => ownerId,
    });
  }

  return createContactsLocalStore({
    storageKey: 'contacts',
  });
}

/**
 * Log one service failure.
 *
 * @param {string} action
 * @param {unknown} error
 * @param {Record<string, unknown>} [context]
 * @returns {void}
 */
function logServiceFailure(action, error, context = {}) {
  console.warn(`[ContactsService] ${action} failed`, {
    ...context,
    error,
  });
}

/**
 * Read all contacts from storage and key them by contact id.
 *
 * @param {import('./storage/contacts-store.js').ContactsStore} storage
 * @returns {Promise<Record<string, ContactRecord>>}
 */
async function loadContactsById(storage) {
  const contacts = await storage.list();
  const byId = {};

  for (const contact of contacts) {
    if (!contact?.contactId) {
      continue;
    }

    byId[contact.contactId] = contact;
  }

  return byId;
}

/**
 * Publish room creation when a saved contact has a room id.
 *
 * @param {ContactRecord} contact
 * @returns {Promise<void>}
 */
async function emitContactSaved(contact) {
  const roomId = contact?.roomId ?? null;

  if (!roomId) {
    return;
  }

  publish('evt:contacts:room:created', { roomId });
}

/**
 * Publish room updates when a contact's room id changes.
 *
 * @param {ContactRecord} contact
 * @param {string|null} previousRoomId
 * @returns {Promise<void>}
 */
async function emitContactUpdated(contact, previousRoomId) {
  const roomId = contact?.roomId ?? null;
  const isRoomIdChange = !!roomId && previousRoomId !== roomId;

  if (!isRoomIdChange) {
    return;
  }

  publish('evt:contacts:room:updated', {
    contactId: contact.contactId,
    contactNickName: contact.contactNickName,
    roomId,
    previousRoomId,
  });
}

/**
 * Publish contact deletion for listeners keyed by room id.
 *
 * @param {string} contactId
 * @param {string|null|undefined} roomId
 * @returns {Promise<void>}
 */
async function emitContactDeleted(contactId, roomId) {
  publish('evt:contacts:contact:deleted', {
    contactId,
    roomId: roomId ?? null,
  });
}

/**
 * Contacts application service built on top of the storage-layer contract.
 *
 * The service owns backend selection, contact-domain events, and
 * contact-specific query helpers that should not live in storage.
 */
export class ContactsService {
  /**
   * Update an existing contact.
   * Returns `null` when the contact does not exist.
   *
   * @param {string} contactId
   * @param {string} contactNickName
   * @param {string|null|undefined} roomId
   * @returns {Promise<ContactRecord|null>}
   */
  async updateContact(contactId, contactNickName, roomId) {
    try {
      const storage = getContactsStorage();
      const existing = await storage.get(contactId);

      if (!existing) {
        return null;
      }

      const previousRoomId = existing.roomId ?? null;
      const updatedContact = await storage.patch(contactId, {
        contactNickName,
        roomId,
      });

      if (!updatedContact) {
        return null;
      }

      // Sync in-memory state mirror
      const byId = getAllContacts();
      byId[contactId] = updatedContact;
      setState({ byId });

      await emitContactUpdated(updatedContact, previousRoomId);
      return updatedContact;
    } catch (error) {
      logServiceFailure('updateContact', error, {
        contactId,
        roomId: roomId ?? null,
      });
      return null;
    }
  }

  /**
   * Delete one contact.
   *
   * @param {string} contactId
   * @returns {Promise<boolean>}
   */
  async deleteContact(contactId) {
    try {
      const storage = getContactsStorage();
      const existing = await storage.get(contactId);
      const deleted = await storage.remove(contactId);

      if (!deleted) {
        return false;
      }

      // Sync in-memory state mirror
      const byId = getAllContacts();
      delete byId[contactId];
      setState({ byId });

      await emitContactDeleted(contactId, existing?.roomId ?? null);

      return true;
    } catch (error) {
      logServiceFailure('deleteContact', error, { contactId });
      return false;
    }
  }

  /**
   * Update `lastInteractionAt` for an existing authenticated contact.
   * Returns `null` for guest mode and when the contact does not exist.
   *
   * @param {string} contactId
   * @returns {Promise<ContactRecord|null>}
   */
  async updateLastInteraction(contactId) {
    if (!contactId || !getLoggedInUserId()) {
      return null;
    }

    try {
      const updated = await getContactsStorage().patch(contactId, {
        lastInteractionAt: Date.now(),
      });

      if (updated) {
        const byId = getAllContacts();
        byId[contactId] = updated;
        setState({ byId });
      }

      return updated;
    } catch (error) {
      logServiceFailure('updateLastInteraction', error, { contactId });
      return null;
    }
  }

  /**
   * Save or upsert one contact.
   * Preserves timestamps for existing contacts in this first pass.
   *
   * @param {string} contactId
   * @param {string} contactNickName
   * @param {string|null|undefined} roomId
   * @returns {Promise<ContactRecord|null>}
   */
  async saveContact(contactId, contactNickName, roomId) {
    try {
      const ownerId = getLoggedInUserId();
      const storage = getContactsStorage(ownerId);
      const existing = await storage.get(contactId);
      const now = Date.now();
      const conversationId =
        existing?.conversationId ??
        (ownerId ? resolveDirectConversationId(ownerId, contactId) : null);

      const contact = await storage.put({
        contactId,
        contactNickName,
        roomId,
        conversationId,
        savedAt: existing?.savedAt ?? now,
        lastInteractionAt: existing?.lastInteractionAt ?? now,
      });

      // Sync in-memory state mirror
      const byId = getAllContacts();
      byId[contactId] = contact;
      setState({ byId });

      if (existing) {
        await emitContactUpdated(contact, existing.roomId ?? null);
      } else {
        await emitContactSaved(contact);
      }

      return contact;
    } catch (error) {
      logServiceFailure('saveContact', error, {
        contactId,
        roomId: roomId ?? null,
      });
      return null;
    }
  }

  /**
   * Decide whether hang-up flow should update or prompt for contact saving.
   *
   * @param {string} contactUserId
   * @param {string} roomId
   * @returns {Promise<HangUpResult>}
   */
  async handleHangUp(contactUserId, roomId) {
    const existing = getAllContacts();
    const entry = existing?.[contactUserId];

    if (entry) {
      if (entry.roomId !== roomId) {
        await this.updateContact(contactUserId, entry.contactNickName, roomId);
      }
      return { action: 'existing' };
    }

    if (!getIsLoggedIn()) {
      return { action: 'skip', reason: 'not-logged-in' };
    }

    return { action: 'prompt-save' };
  }
}

/**
 * Hydrate contacts state once until the state is reset.
 * Concurrent callers share the same in-flight storage read.
 *
 * @returns {Promise<void>}
 */
export async function ensureContactsHydrated() {
  const ownerId = getLoggedInUserId();
  const scopeKey = getHydrationScopeKey(ownerId);

  if (getIsHydrated() && hydratedScopeKey === scopeKey) {
    return;
  }

  if (hydrationPromise && hydrationPromiseScopeKey === scopeKey) {
    return hydrationPromise;
  }

  const requestId = ++hydrationRequestId;
  hydrationPromiseScopeKey = scopeKey;
  hydrationPromise = (async () => {
    try {
      const allContacts = await loadContactsById(getContactsStorage(ownerId));

      if (requestId !== hydrationRequestId) {
        return;
      }

      hydratedScopeKey = scopeKey;
      setState({ byId: allContacts, isHydrated: true });
    } catch (error) {
      logServiceFailure('ensureContactsHydrated', error);
      throw error;
    } finally {
      if (requestId === hydrationRequestId) {
        hydrationPromise = null;
        hydrationPromiseScopeKey = null;
      }
    }
  })();

  return hydrationPromise;
}

/**
 * Backward-compatible alias for contacts hydration.
 *
 * @returns {Promise<void>}
 */
export async function hydrateContactsState() {
  return ensureContactsHydrated();
}

/**
 * Clear in-memory contacts state and drop any cached hydration promise.
 *
 * @returns {void}
 */
export function resetContactsState() {
  hydrationPromise = null;
  hydrationPromiseScopeKey = null;
  hydratedScopeKey = null;
  hydrationRequestId += 1;
  setState({ byId: {}, isHydrated: false });
}

export const contactsService = new ContactsService();
