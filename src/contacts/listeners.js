import { appBus } from '../app/app-bus';
import { contactsService } from './contacts-service';

export function setupContactListeners() {
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
