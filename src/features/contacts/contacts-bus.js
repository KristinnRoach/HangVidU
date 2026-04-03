import { EventEmitter } from '../../app/event-emitter.js';

export const CONTACTS_EVENTS = {
  SAVED: 'contact:saved',
  UPDATED: 'contact:updated',
  DELETED: 'contact:deleted',
};

/**
 * ContactsBus - module-local event bus for contact-domain events.
 *
 * The contacts module emits domain events here first. Cross-module forwarding
 * is handled by explicit bridge modules so contacts code stays unaware of
 * app-level compatibility contracts.
 */
export const contactsBus = new EventEmitter();
