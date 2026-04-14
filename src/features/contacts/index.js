// src/contacts/index.js — barrel re-exports (public API)

export { contactsService, ContactsService } from './contacts-service.js';

export { cleanupInviteListeners } from './invitations.js';
export { setupInviteListener } from './invite-listener.js';

export { captureReferral, processReferral } from './referral-handler.js';

export {
  renderContactsList,
  cleanupContacts,
} from './components/contacts-list.js';

export { showSaveContactPrompt } from './components/save-contact-modal.js';
export { showAddContactModal } from './components/add-contact-modal.js';

export { hashEmail, lookupUserByEmail } from './user-discovery.js';
export {
  buildReferralLink,
  buildInviteText,
  copyInviteLink,
  shareInvite,
} from './share-invite.js';
export {
  getInviteShareProviders,
  buildProviderShareUrl,
  shareInviteViaProvider,
} from './share-invite-presets.js';
export { createDebouncedAsyncAction } from './debounce.js';
