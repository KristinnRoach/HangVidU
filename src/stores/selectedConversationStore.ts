import { createSignal } from 'solid-js';
import type { ConversationSelection } from '../features/conversations/interfaces.js';
import { resolveDirectConversationId } from './conversations-client';
import { cacheContactConversationId, getContactById } from './contactsStore.js';

const [selection, setSelection] = createSignal<ConversationSelection | null>(
  null,
);

export { selection };

export function open(next: ConversationSelection): void {
  setSelection(next);
}

export function clear(): void {
  setSelection(null);
}

type OpenDirectMeta = Omit<
  ConversationSelection,
  'conversationId' | 'remoteParticipantIds'
>;

/**
 * Open a contact's DM conversation. This is the single place the messaging
 * open flow learns the id, so callers pass a contactId and never handle
 * conversation ids directly.
 *
 * The conversationId is normally already on the contact record (minted at
 * invite-accept time); resolveDirectConversationId() is only a fallback for
 * contacts saved before that existed.
 */
export async function openDirectConversation(
  contactId: string,
  meta?: OpenDirectMeta,
): Promise<void> {
  let conversationId: string | null =
    getContactById(contactId)?.conversationId ?? null;

  if (!conversationId) {
    try {
      // Network + auth call; can reject. Callers fire-and-forget, so catch
      // here to keep failures on the warn-and-return path instead of an
      // unhandled rejection.
      conversationId = await resolveDirectConversationId(contactId);
      void cacheContactConversationId(contactId, conversationId);
    } catch (error) {
      console.warn('[conversation] failed to resolve conversation id', {
        contactId,
        error,
      });
    }
  }

  if (!conversationId) {
    console.warn('[conversation] could not resolve conversation id', {
      contactId,
    });
    return;
  }

  setSelection({ ...meta, conversationId, remoteParticipantIds: [contactId] });
}
