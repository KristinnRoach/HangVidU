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

// async function listenForIncomingOnRoom(roomId) {
//   if (!roomId) return;

//   try {
//     const contacts = await contactsService.getAllContacts();
//     for (const contact of Object.values(contacts || {})) {
//       if (contact?.roomId === roomId) {
//         appBus.emit('contact:incoming', { contact });
//         break;
//       }
//     }
//   } catch (e) {
//     console.warn('Failed to listen for incoming on room', e);
//   }
// }

//   appBus.on('room:id:created', async ({ roomId }) => {
//     listenForIncomingOnRoom(roomId);
//   });

//   appBus.on('room:id:updated', async ({ roomId }) => {
//     listenForIncomingOnRoom(roomId);
//   });
