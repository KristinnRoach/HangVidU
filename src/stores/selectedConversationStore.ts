import { createSignal } from 'solid-js';
import type { ConversationSelection } from '../features/messaging-next/interfaces.js';
import { resolveDirectConversationId } from './conversations-client';

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
 * Resolve a contact's DM conversation id (opaque registry id, resolve-or-create)
 * and open it. This is the single place the messaging open flow learns the id,
 * so callers pass a contactId and never handle conversation ids directly.
 */
export async function openDirectConversation(
  contactId: string,
  meta?: OpenDirectMeta,
): Promise<void> {
  let conversationId: string | null = null;
  try {
    // Network + auth call; can reject. Callers fire-and-forget, so catch here
    // to keep failures on the warn-and-return path instead of an unhandled
    // rejection.
    conversationId = await resolveDirectConversationId(contactId);
  } catch (error) {
    console.warn('[conversation] failed to resolve conversation id', {
      contactId,
      error,
    });
  }

  if (!conversationId) {
    console.warn('[conversation] could not resolve conversation id', {
      contactId,
    });
    return;
  }

  setSelection({ ...meta, conversationId, remoteParticipantIds: [contactId] });
}
