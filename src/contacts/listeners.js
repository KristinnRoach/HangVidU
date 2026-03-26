import { appBus } from '../app/app-bus.js';
import { contactsService } from './contacts-service.js';

// ! WIP - currently wired in main, review when looking at standardizing this pattern

export function setupContactListeners() {
  // TODO: decide WHERE to handle async error handling - standardize in ONE place if feasible
  appBus.on('contact:save', ({ contactUserId, name, roomId }) => {
    void contactsService.saveContact(contactUserId, name, roomId);
  });

  appBus.on('contact:update', ({ contactUserId, name, roomId }) => {
    void contactsService.updateContact(contactUserId, name, roomId);
  });

  appBus.on('contact:delete', ({ contactUserId }) => {
    void contactsService.deleteContact(contactUserId);
  });
}
