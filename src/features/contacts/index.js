// src/contacts/index.js — barrel re-exports (public API)

export {
  getContactsService,
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
  getContactsIsHydrated,
} from './contacts-state.js';

export { cleanupInviteListeners } from './helpers/invitations.js';
export { setupInviteListener } from './helpers/invite-listener.js';

export {
  captureReferral,
  processReferral,
} from './helpers/referral-handler.js';

export { showAddContactModal } from './components/add-contact-modal.js';

export { hashEmail, lookupUserByEmail } from './helpers/user-discovery.js';
export {
  buildReferralLink,
  buildInviteText,
  copyInviteLink,
  shareInvite,
} from './helpers/share-invite.js';
export {
  getInviteShareProviders,
  buildProviderShareUrl,
  shareInviteViaProvider,
} from './helpers/share-invite-presets.js';
