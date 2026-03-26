import { getIsLoggedIn } from '../auth/auth-state.js';
import { appBus } from '../app/app-bus.js';
import { contactsStore } from './contacts-store.js';

/**
 * ContactsService
 *
 * Note: storage layer still WIP - currently using draft in ./contacts-store.js
 * This is intentionally minimal; larger refactors (moving storage out of UI
 * module, removing DOM CustomEvents, etc.) will follow after design decisions.
 */
export class ContactsService {
  constructor() {
    import.meta.env.DEV &&
      console.log('[ContactsService] constructor', {
        contactsStore,
      });
  }

  async getContact(contactId) {
    return await contactsStore.getContact(contactId);
  }

  async updateContact(contactId, contactName, roomId) {
    const existing = await contactsStore.getContact(contactId);
    const isRoomIdChange = !!roomId && existing?.roomId !== roomId;

    const updatedContact = await contactsStore.saveContact(
      contactId,
      contactName,
      roomId,
    );

    console.info('[ContactsService] Contact updated: ', {
      updatedContact,
    });

    try {
      if (isRoomIdChange) {
        appBus.emit('room:id:updated', { contactName, roomId });
      }
    } catch (e) {
      console.warn('[ContactsService] updateContact(): emit failed', e);
    }
  }

  async deleteContact(contactId) {
    await contactsStore.deleteContact(contactId);
    try {
      appBus.emit('contact:deleted', { contactId });
    } catch (e) {
      console.warn('[ContactsService] emit contact:deleted failed', e);
    }
  }

  async getAllContacts() {
    return await contactsStore.getAllContacts();
  }

  async getAllContactsSorted(sortedBy = 'lastInteractionAt') {
    return await contactsStore.getAllContactsSorted(sortedBy);
  }

  async getContactByMostRecentInteraction() {
    return await contactsStore.getContactByMostRecentInteraction();
  }

  async getContactByRoomId(roomId) {
    return await contactsStore.getContactByRoomId(roomId);
  }

  async resolveCallerName(roomId, fallbackUserId) {
    return await contactsStore.resolveCallerName(roomId, fallbackUserId);
  }

  async updateLastInteraction(contactId) {
    return await contactsStore.updateLastInteraction(contactId);
  }

  async saveContact(contactId, contactName, roomId) {
    const contact = await contactsStore.saveContact(
      contactId,
      contactName,
      roomId,
    );
    if (!contact) {
      console.error('[ContactsService] Failed to save contact', {
        contactId,
        contactName,
        roomId,
      });
      return;
    }

    console.info('[ContactsService] Contact saved: ', {
      contact,
    });

    try {
      appBus.emit('contact:save:complete', { roomId }); // TODO: decide how to notify UI to re-render (Should UI listen, or only dispatch events via appBus ?)
      appBus.emit('room:id:created', { roomId }); // TODO: decouple room:id:created from saving
    } catch (e) {
      console.warn('[ContactsService] emit room:id:created failed', e);
    }
  }

  // ? Below methods might not make sense here.. ?

  async handleHangUp(contactUserId, roomId) {
    const existing = await this.getAllContacts();
    const entry = existing?.[contactUserId];

    if (entry) {
      // Update roomId for existing contact if changed
      if (entry.roomId !== roomId) {
        await this.updateContact(contactUserId, entry.contactName, roomId);
      }
      return { action: 'existing' };
    }

    if (!getIsLoggedIn()) return { action: 'skip', reason: 'not-logged-in' };

    return { action: 'prompt-save' };
  }

  setupContactListeners() {
    appBus.on('contact:save', async ({ contactUserId, name, roomId }) => {
      await contactsService.saveContact(contactUserId, name, roomId);
    });

    appBus.on('contact:update', async ({ contactUserId, name, roomId }) => {
      await contactsService.updateContact(contactUserId, name, roomId);
    });

    appBus.on('contact:delete', async ({ contactUserId }) => {
      await contactsService.deleteContact(contactUserId);
    });
  }
}

export const contactsService = new ContactsService();
