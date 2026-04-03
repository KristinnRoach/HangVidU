import { getIsLoggedIn, getLoggedInUserId } from '../auth/auth-state.js';
import { rtdb } from '../../storage/fb-rtdb/rtdb.js';
import {
  createContactsLocalStore,
  createContactsRTDBStore,
} from './storage/index.js';
import {
  getAllContacts,
  getAllContactsSorted,
  getContactByMostRecentInteraction,
  getContactByRoomId,
} from './contacts-query.js';
import { resolveDirectConversationId } from '../messaging/direct-conversation-id.js';
import { CONTACTS_EVENTS, contactsBus } from './contacts-bus.js';
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
 * Emit a contact-domain save event after a successful write.
 *
 * @param {ContactRecord} contact
 */
async function emitContactSaved(contact) {
  await contactsBus.emitAsync(CONTACTS_EVENTS.SAVED, { contact });
}

/**
 * Emit a contact-domain update event after a successful write.
 *
 * @param {ContactRecord} contact
 * @param {string|null} previousRoomId
 */
async function emitContactUpdated(contact, previousRoomId) {
  await contactsBus.emitAsync(CONTACTS_EVENTS.UPDATED, {
    contact,
    previousRoomId,
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
   * Read one contact.
   *
   * @param {string} contactId
   * @returns {Promise<ContactRecord|null>}
   */
  async getContact(contactId) {
    try {
      return await getContactsStorage().get(contactId);
    } catch (error) {
      logServiceFailure('getContact', error, { contactId });
      return null;
    }
  }

  /**
   * Resolve the stored conversation id for one saved contact.
   *
   * @param {string} contactId
   * @returns {Promise<string|null>}
   */
  async getConversationId(contactId) {
    const contact = await this.getContact(contactId);
    return contact?.conversationId ?? null;
  }

  /**
   * Update an existing contact.
   * Returns `null` when the contact does not exist.
   *
   * @param {string} contactId
   * @param {string} contactName
   * @param {string|null|undefined} roomId
   * @returns {Promise<ContactRecord|null>}
   */
  async updateContact(contactId, contactName, roomId) {
    try {
      const storage = getContactsStorage();
      const existing = await storage.get(contactId);

      if (!existing) {
        return null;
      }

      const previousRoomId = existing.roomId ?? null;
      const updatedContact = await storage.patch(contactId, {
        contactName,
        roomId,
      });

      if (!updatedContact) {
        return null;
      }

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

      await contactsBus.emitAsync(CONTACTS_EVENTS.DELETED, {
        contactId,
        roomId: existing?.roomId ?? null,
      });

      return true;
    } catch (error) {
      logServiceFailure('deleteContact', error, { contactId });
      return false;
    }
  }

  /**
   * Read all contacts as a map keyed by `contactId`.
   *
   * @returns {Promise<Record<string, ContactRecord>>}
   */
  async getAllContacts() {
    try {
      return await getAllContacts(getContactsStorage());
    } catch (error) {
      logServiceFailure('getAllContacts', error);
      return {};
    }
  }

  /**
   * Read all contacts sorted by last interaction time.
   *
   * @param {string} [sortedBy='lastInteractionAt']
   * @returns {Promise<ContactRecord[]>}
   */
  async getAllContactsSorted(sortedBy = 'lastInteractionAt') {
    try {
      return await getAllContactsSorted(getContactsStorage(), sortedBy);
    } catch (error) {
      logServiceFailure('getAllContactsSorted', error, { sortedBy });
      return [];
    }
  }

  /**
   * Read the most recently interacted contact.
   *
   * @returns {Promise<ContactRecord|null>}
   */
  async getContactByMostRecentInteraction() {
    try {
      return await getContactByMostRecentInteraction(getContactsStorage());
    } catch (error) {
      logServiceFailure('getContactByMostRecentInteraction', error);
      return null;
    }
  }

  /**
   * Find a contact by room id.
   *
   * @param {string|null|undefined} roomId
   * @returns {Promise<ContactRecord|null>}
   */
  async getContactByRoomId(roomId) {
    try {
      return await getContactByRoomId(getContactsStorage(), roomId);
    } catch (error) {
      logServiceFailure('getContactByRoomId', error, { roomId });
      return null;
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
      return await getContactsStorage().patch(contactId, {
        lastInteractionAt: Date.now(),
      });
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
   * @param {string} contactName
   * @param {string|null|undefined} roomId
   * @returns {Promise<ContactRecord|null>}
   */
  async saveContact(contactId, contactName, roomId) {
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
        contactName,
        roomId,
        conversationId,
        savedAt: existing?.savedAt ?? now,
        lastInteractionAt: existing?.lastInteractionAt ?? now,
      });

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
    const existing = await this.getAllContacts();
    const entry = existing?.[contactUserId];

    if (entry) {
      if (entry.roomId !== roomId) {
        await this.updateContact(contactUserId, entry.contactName, roomId);
      }
      return { action: 'existing' };
    }

    if (!getIsLoggedIn()) {
      return { action: 'skip', reason: 'not-logged-in' };
    }

    return { action: 'prompt-save' };
  }
}

export const contactsService = new ContactsService();
