import { EventEmitter } from '../utils/event-emitter.js';
import {
  saveContactData as saveContactDataFn,
  getContacts as getContactsFn,
  getContactByMostRecentInteraction as getContactByMostRecentInteractionFn,
  getContactByRoomId as getContactByRoomIdFn,
  resolveCallerName as resolveCallerNameFn,
  saveContact as saveContactFn,
  updateLastInteraction as updateLastInteractionFn,
} from '../ui/components/contacts/contacts.js';

/**
 * ContactsController — thin, minimal controller scaffold.
 *
 * - Pattern: extends EventEmitter (same pattern as MessagingController)
 * - Delegates to existing contact utilities for now (see notes below)
 * - Emits `contact:saved` after a successful save
 *
 * This is intentionally minimal; larger refactors (moving storage out of UI
 * module, removing DOM CustomEvents, etc.) will follow after design decisions.
 */
export class ContactsController extends EventEmitter {
  constructor() {
    super();
  }

  async saveContactData(contactId, contactName, roomId) {
    await saveContactDataFn(contactId, contactName, roomId);
    try {
      this.emit('contact:saved', { roomId });
    } catch (e) {
      // don't throw for now; caller can still rely on underlying save
      console.warn('[ContactsController] emit contact:saved failed', e);
    }
  }

  async saveContact(contactUserId, roomId, lobbyElement) {
    const result = await saveContactFn(contactUserId, roomId, lobbyElement);
    // `saveContactFn` may have already dispatched DOM events; emit controller event
    try {
      this.emit('contact:saved', { roomId });
    } catch (e) {
      console.warn('[ContactsController] emit contact:saved failed', e);
    }
    return result;
  }

  async getContacts() {
    return getContactsFn();
  }

  async getContactByMostRecentInteraction() {
    return getContactByMostRecentInteractionFn();
  }

  async getContactByRoomId(roomId) {
    return getContactByRoomIdFn(roomId);
  }

  async resolveCallerName(roomId, fallbackUserId) {
    return resolveCallerNameFn(roomId, fallbackUserId);
  }

  async updateLastInteraction(contactId) {
    return updateLastInteractionFn(contactId);
  }
}

export const contactsController = new ContactsController();
