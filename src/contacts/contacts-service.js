import { getIsLoggedIn, getLoggedInUserId } from '../auth/auth-state.js';
import { appBus } from '../app/app-bus.js';
import { rtdb } from '../storage/fb-rtdb/rtdb.js';
import { t } from '../i18n/index.js';
import {
  createContactsLocalStore,
  createContactsRTDBStore,
} from './storage/index.js';

function sortContactsByLastInteraction(contacts) {
  return [...contacts].sort((a, b) => {
    const aTime = a?.lastInteractionAt || a?.savedAt || 0;
    const bTime = b?.lastInteractionAt || b?.savedAt || 0;

    if (aTime !== bTime) {
      return bTime - aTime;
    }

    const aName = (a?.contactName || '').toLowerCase();
    const bName = (b?.contactName || '').toLowerCase();
    return aName.localeCompare(bName);
  });
}

function toContactMap(contacts) {
  const map = {};

  for (const contact of contacts) {
    if (!contact?.contactId) {
      continue;
    }

    map[contact.contactId] = contact;
  }

  return map;
}

function getContactsStorage() {
  const ownerId = getLoggedInUserId();

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

function emitContactSaved(contact) {
  try {
    appBus.emit('contact:updated', { roomId: contact.roomId ?? null });
    appBus.emit('room:id:created', { roomId: contact.roomId ?? null });
  } catch (e) {
    console.warn('[ContactsService] saveContact() appBus emit failed', e);
  }
}

function emitContactUpdated(contact, previousRoomId) {
  const roomId = contact.roomId ?? null;
  const isRoomIdChange = !!roomId && previousRoomId !== roomId;

  try {
    appBus.emit('contact:updated', { roomId });

    if (isRoomIdChange) {
      appBus.emit('room:id:updated', {
        contactId: contact.contactId,
        contactName: contact.contactName,
        roomId,
        previousRoomId,
      });
    }
  } catch (e) {
    console.warn('[ContactsService] updateContact(): emit failed', e);
  }
}

export class ContactsService {
  constructor() {
    import.meta.env.DEV &&
      console.log('[ContactsService] constructor', {
        storage: 'src/contacts/storage',
      });
  }

  async getContact(contactId) {
    try {
      return await getContactsStorage().get(contactId);
    } catch (e) {
      console.warn('[ContactsService] Failed to get contact', { contactId, e });
      return null;
    }
  }

  async updateContact(contactId, contactName, roomId) {
    try {
      const storage = getContactsStorage();
      const existing = await storage.get(contactId);
      const previousRoomId = existing?.roomId ?? null;

      let updatedContact = null;

      if (existing) {
        updatedContact = await storage.patch(contactId, {
          contactName,
          roomId,
        });
      } else {
        const now = Date.now();
        updatedContact = await storage.put({
          contactId,
          contactName,
          roomId,
          savedAt: now,
          lastInteractionAt: now,
        });
      }

      if (!updatedContact) {
        console.error('[ContactsService] Failed to update contact', {
          contactId,
          contactName,
          roomId,
        });
        return null;
      }

      console.info('[ContactsService] Contact updated: ', {
        updatedContact,
      });

      emitContactUpdated(updatedContact, previousRoomId);
      return updatedContact;
    } catch (e) {
      console.error('[ContactsService] Failed to update contact', {
        contactId,
        contactName,
        roomId,
        e,
      });
      return null;
    }
  }

  async deleteContact(contactId) {
    try {
      const storage = getContactsStorage();
      const existing = await storage.get(contactId);
      const deleted = await storage.remove(contactId);

      if (!deleted) {
        return false;
      }

      try {
        appBus.emit('contact:deleted', {
          contactId,
          roomId: existing?.roomId ?? null,
        });
      } catch (e) {
        console.warn('[ContactsService] emit contact:deleted failed', e);
      }

      return true;
    } catch (e) {
      console.warn('[ContactsService] Failed to delete contact', {
        contactId,
        e,
      });
      return false;
    }
  }

  async getAllContacts() {
    try {
      return toContactMap(await getContactsStorage().list());
    } catch (e) {
      console.warn('[ContactsService] Failed to get all contacts', e);
      return {};
    }
  }

  async getAllContactsSorted(sortedBy = 'lastInteractionAt') {
    if (sortedBy !== 'lastInteractionAt') {
      console.warn(
        `[ContactsService] Unsupported sort field "${sortedBy}", defaulting to "lastInteractionAt"`,
      );
    }

    try {
      return sortContactsByLastInteraction(await getContactsStorage().list());
    } catch (e) {
      console.warn('[ContactsService] Failed to get sorted contacts', e);
      return [];
    }
  }

  async getContactByMostRecentInteraction() {
    try {
      const contacts = await getContactsStorage().list();
      return sortContactsByLastInteraction(contacts)[0] || null;
    } catch (e) {
      console.warn(
        '[ContactsService] Failed to get contact by most recent interaction',
        e,
      );
      return null;
    }
  }

  async getContactByRoomId(roomId) {
    if (!roomId) {
      return null;
    }

    try {
      const contacts = await getContactsStorage().list();

      for (const contact of contacts) {
        if (contact?.roomId === roomId) {
          return contact;
        }
      }
    } catch (e) {
      console.warn('[ContactsService] Failed to get contact by roomId', e);
    }

    return null;
  }

  async resolveCallerName(roomId, fallbackUserId) {
    if (!roomId) {
      return fallbackUserId || t('shared.unknown');
    }

    try {
      const contact = await this.getContactByRoomId(roomId);
      if (contact) {
        return contact.contactName || t('contact.no_name');
      }
    } catch (e) {
      console.warn('[ContactsService] Failed to resolve caller name', e);
    }

    return fallbackUserId || t('shared.unknown');
  }

  async updateLastInteraction(contactId) {
    if (!contactId) {
      return null;
    }

    try {
      return await getContactsStorage().patch(contactId, {
        lastInteractionAt: Date.now(),
      });
    } catch (e) {
      console.warn('[ContactsService] Failed to update lastInteractionAt', e);
      return null;
    }
  }

  async saveContact(contactId, contactName, roomId) {
    try {
      const storage = getContactsStorage();
      const existing = await storage.get(contactId);
      const now = Date.now();

      const contact = await storage.put({
        contactId,
        contactName,
        roomId,
        savedAt: existing?.savedAt ?? now,
        lastInteractionAt: existing?.lastInteractionAt ?? now,
      });

      console.info('[ContactsService] Contact saved: ', {
        contact,
      });

      emitContactSaved(contact);
      return contact;
    } catch (e) {
      console.error('[ContactsService] Failed to save contact', {
        contactId,
        contactName,
        roomId,
        e,
      });
      return null;
    }
  }

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
