// src/features/contacts/index.js — barrel re-exports (public API)

export {
  // reads
  getContactsStore,
  getAllContacts,
  getContactById,
  getContactByRoomId,
  getConversationId,
  getAllContactsSorted,
  getContactByMostRecentInteraction,
  getContactsIsHydrated,
  // mutations
  saveContact,
  updateContact,
  deleteContact,
  recordInteraction,
  recordInteractionByConversation,
  handleHangUp,
  // lifecycle
  hydrateContacts,
  resetContacts,
} from './contacts-store.js';

export { useContacts } from './useContacts.js';

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
