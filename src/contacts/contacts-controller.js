import { getIsLoggedIn } from '../auth/auth-state.js';
import { EventEmitter } from '../utils/event-emitter.js';
import { contactsStore } from './contacts-store.js';

/**
 * ContactsController
 *
 * - Pattern: extends EventEmitter (same pattern as MessagingController)
 * - Delegates to existing contact utilities for now (see notes below)
 * - Emits events: 'contact:saved', 'contact:updated', 'contact:deleted', ... TBD
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
    if (!getIsLoggedIn()) return { action: 'skip', reason: 'not-logged-in' };

    const existing = await this.getContacts();
    const entry = existing?.[contactUserId];

    if (entry) {
      // Update roomId for existing contact if changed
      if (entry.roomId !== roomId) {
        await this.updateContact(contactUserId, entry.contactName, roomId);
      }
      return { action: 'existing' };
    }

    return { action: 'prompt-save' };
  }

  async saveContact(contactId, contactName, roomId) {
    await contactsStore.saveContact(contactId, contactName, roomId);
    try {
      this.emit('contact:saved', { roomId });
      this.emit('room:id:created', { roomId });
    } catch (e) {
      console.warn('[ContactsController] emit contact:saved failed', e);
    }
  }

  async updateContact(contactId, contactName, roomId) {
    const existing = await contactsStore.getContact(contactId);
    const isRoomIdChange = existing?.roomId && existing.roomId !== roomId;

    await contactsStore.saveContact(contactId, contactName, roomId);
    try {
      if (isRoomIdChange) {
        this.emit('room:id:updated', { contactName, roomId });
      } else {
        this.emit('contact:updated', { contactId, contactName, roomId });
      }
    } catch (e) {
      console.warn('[ContactsController] updateContact(): emit failed', e);
    }
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
