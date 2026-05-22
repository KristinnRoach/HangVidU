import { dispatchCommandAndAwait } from '../shared/events/index.js';
import {
  getContactById,
  getConversationId,
} from '../stores/contact-store.js';

// TODO: Add nav to join incoming calls directly, /?room=room-1

function getTrimmedSearchParam(searchParams, name) {
  const value = searchParams.get(name);
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

async function selectConversation({ conversationId, contactId }) {
  const contact = contactId ? getContactById(contactId) : null;
  await dispatchCommandAndAwait('cmd:messaging:conversation:select', {
    conversationId,
    remoteParticipantIds: contactId ? [contactId] : [],
    displayUI: true,
    contactNickName: contact?.contactNickName ?? undefined,
  });
  return true;
}

/**
 * Route service-worker notification navigation into app commands.
 *
 * @param {string} path
 * @returns {Promise<boolean>} true when the path was handled
 */
export async function handleServiceWorkerNavigation(path) {
  const url = new URL(path, window.location.origin);
  const conversationId = getTrimmedSearchParam(
    url.searchParams,
    'conversationId',
  );
  const contactId = getTrimmedSearchParam(url.searchParams, 'contact');

  if (conversationId) {
    return selectConversation({ conversationId, contactId });
  }

  if (!contactId) {
    return false;
  }

  const resolvedConversationId = getConversationId(contactId);
  if (!resolvedConversationId) {
    return false;
  }

  return selectConversation({
    conversationId: resolvedConversationId,
    contactId,
  });
}
