import { createSignal } from 'solid-js';
import type { ConversationSelection } from '../features/messaging-next/interfaces.js';
import { getLoggedInUserId } from '../auth/index.js';
import { resolveDirectConversationId } from './conversations-client';
import { deriveLegacyDirectConversationId } from '../shared/utils/direct-conversation-id.js';

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
 * Resolve a contact's DM conversation id and open it. This is the single place
 * the messaging open flow learns the id, so callers pass a contactId and never
 * deal with the derived-vs-opaque distinction:
 *   - `d1`   → opaque registry id (resolve-or-create), the canonical pattern.
 *   - `rtdb` → legacy derived id (escape hatch; recomputed, never persisted).
 * The derive branch disappears when the rtdb backend is retired.
 */
export async function openDirectConversation(
  contactId: string,
  meta?: OpenDirectMeta,
): Promise<void> {
  const backend =
    (import.meta.env.VITE_MESSAGE_BACKEND as string | undefined) ?? 'rtdb';

  let conversationId: string | null = null;
  try {
    if (backend === 'd1') {
      // Network + auth call; can reject. Callers fire-and-forget, so catch here
      // to keep failures on the warn-and-return path instead of an unhandled
      // rejection.
      conversationId = await resolveDirectConversationId(contactId);
    } else {
      const ownerId = getLoggedInUserId();
      conversationId = ownerId
        ? deriveLegacyDirectConversationId(ownerId, contactId)
        : null;
    }
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
