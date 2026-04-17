// src/contacts/index.js — barrel re-exports (public API)

export {
  contactsService,
  ContactsService,
  ensureContactsHydrated,
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

// Contacts list UI moved to src/app/ (SolidJS). The legacy DOM component at
// ./components/contacts-list.js is retained only until the SolidJS PoC is
// accepted; it is not re-exported from the barrel.

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
