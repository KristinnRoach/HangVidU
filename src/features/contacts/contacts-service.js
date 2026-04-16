import { getIsLoggedIn, getLoggedInUserId } from '../../auth/index.js';
import { rtdb } from '../../shared/storage/fb-rtdb/rtdb.js';
import {
  createContactsLocalStore,
  createContactsRTDBStore,
} from './storage/index.js';
import { resolveDirectConversationId } from '../../shared/utils/direct-conversation-id.js';
import { publish } from '../../shared/events/index.js';
import { setState, getAllContacts } from './contacts-state.js';
// PAUSED: claude --resume edf6030f-72fb-4503-9175-bfc21d2d973c

/**
 * @typedef {import('./storage/contact-schema.js').ContactRecord} ContactRecord
 */

/**
 * @typedef {{ action: 'existing' | 'skip' | 'prompt-save', reason?: string }} HangUpResult
 */

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
 * Load all contacts from storage into in-memory state.
 * Call once after auth state confirms a logged-in user.
 */
export async function hydrateContactsState() {
  try {
    const allContacts = await loadContactsById(getContactsStorage());
    setState({ byId: allContacts, isHydrated: true });
  } catch (error) {
    logServiceFailure('hydrateContactsState', error);
  }
}

export function resetContactsState() {
  setState({ byId: {}, isHydrated: false });
}

export const contactsService = new ContactsService();
