import { appBus } from '../../events/app-bus.js';
import { CONTACTS_EVENTS, contactsBus } from './contacts-bus.js';

let cleanupContactsAppBusBridge = null;

/**
 * Forward selected contact-domain events to appBus compatibility events.
 *
 * This bridge is intentionally narrow: it decides what the rest of the app
 * should hear without forcing contacts-service to know about app-level event
 * names or consumers.
 */
export function setupContactsAppBusBridge() {
  if (cleanupContactsAppBusBridge) {
    return cleanupContactsAppBusBridge;
  }

  const ac = new AbortController();

  contactsBus.on(
    CONTACTS_EVENTS.SAVED,
    async ({ contact }) => {
      const roomId = contact?.roomId ?? null;

      if (!roomId) {
        return;
      }

      await appBus.emitAsync('room:id:created', { roomId });
    },
    { signal: ac.signal },
  );

  contactsBus.on(
    CONTACTS_EVENTS.UPDATED,
    async ({ contact, previousRoomId }) => {
      const roomId = contact?.roomId ?? null;
      const isRoomIdChange = !!roomId && previousRoomId !== roomId;

      if (!isRoomIdChange) {
        return;
      }

      await appBus.emitAsync('room:id:updated', {
        contactId: contact.contactId,
        contactName: contact.contactName,
        roomId,
        previousRoomId,
      });
    },
    { signal: ac.signal },
  );

  contactsBus.on(
    CONTACTS_EVENTS.DELETED,
    async ({ contactId, roomId }) => {
      await appBus.emitAsync('contact:deleted', {
        contactId,
        roomId: roomId ?? null,
      });
    },
    { signal: ac.signal },
  );

  const cleanup = () => {
    ac.abort();
    if (cleanupContactsAppBusBridge === cleanup) {
      cleanupContactsAppBusBridge = null;
    }
  };

  cleanupContactsAppBusBridge = cleanup;
  return cleanup;
}
