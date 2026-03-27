import { appBus } from '../app/app-bus.js';
import { contactsService } from './contacts-service.js';

// Wired in main.js. Async errors handled by contactsService (try/catch) and emitAsync (dispatch side).

export function setupContactListeners() {
  appBus.on('contact:save', ({ contactUserId, name, roomId }) =>
    contactsService.saveContact(contactUserId, name, roomId),
  );

  appBus.on('contact:update', ({ contactUserId, name, roomId }) =>
    contactsService.updateContact(contactUserId, name, roomId),
  );

  appBus.on('contact:delete', ({ contactUserId }) =>
    contactsService.deleteContact(contactUserId),
  );
}
