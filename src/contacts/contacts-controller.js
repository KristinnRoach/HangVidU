import { EventEmitter } from '../utils/event-emitter.js';
import { contactsStore } from './contacts-store.js';

/**
 * ContactsController
 *
 * - Pattern: extends EventEmitter (same pattern as MessagingController)
 * - Delegates to existing contact utilities for now (see notes below)
 * - Emits events: 'contact:saved', 'contact:deleted', ... TBD
 *
 * Note: storage layer still WIP - currently using draft in ./contacts-store.js
 *
 * This is intentionally minimal; larger refactors (moving storage out of UI
 * module, removing DOM CustomEvents, etc.) will follow after design decisions.
 */
export class ContactsController extends EventEmitter {
  constructor() {
    super();
  }

  async handleHangUp(contactUserId, roomId) {
    if (!getLoggedInUserId())
      return { action: 'skip', reason: 'not-logged-in' };

    const existing = await this.getContacts();
    const entry = existing?.[contactUserId];

    if (entry) {
      if (entry.roomId !== roomId) {
        await this.saveContact(contactUserId, entry.contactName, roomId);
      }
      this.ensureRoomListener(roomId);
      return { action: 'existing' };
    }

    return { action: 'prompt-save' };
  }

  async saveContact(contactId, contactName, roomId) {
    await contactsStore.saveContact(contactId, contactName, roomId);
    try {
      this.emit('contact:saved', { roomId });
    } catch (e) {
      console.warn('[ContactsController] emit contact:saved failed', e);
    }
  }

  ensureRoomListener(roomId) {
    this.emit('contact:saved', { roomId });
  }

  async deleteContact(contactId) {
    await contactsStore.deleteContact(contactId);
    try {
      this.emit('contact:deleted', { contactId });
    } catch (e) {
      console.warn('[ContactsController] emit contact:deleted failed', e);
    }
  }

  async getContacts() {
    return await contactsStore.getContacts();
  }

  async getContactsSorted(sortedBy = 'lastInteractionAt') {
    return await contactsStore.getContactsSorted(sortedBy);
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
}

export const contactsController = new ContactsController();
