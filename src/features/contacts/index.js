// src/contacts/index.js — barrel re-exports (public API)

export {
  contactsService,
  ContactsService,
  hydrateContactsState,
  resetContactsState,
} from './contacts-service.js';

// Read-only state API. `setState` is intentionally NOT re-exported — writers
// live inside the contacts module only. External consumers read via getters and
// subscribe to `evt:contacts:state:changed`. See docs/WIP_Architecture/STATE_RULES.md.
export {
  getAllContacts,
  getContactById,
  getContactByRoomId,
  getConversationId,
  getAllContactsSorted,
  getContactByMostRecentInteraction,
  getIsHydrated as getContactsIsHydrated,
} from './contacts-state.js';

export { cleanupInviteListeners } from './invitations.js';
export { setupInviteListener } from './invite-listener.js';

export { captureReferral, processReferral } from './referral-handler.js';

export {
  mountContactsList,
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
