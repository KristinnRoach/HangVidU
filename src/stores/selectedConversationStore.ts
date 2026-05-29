import { createSignal } from 'solid-js';
import type { ConversationSelection } from '../features/messaging-next/interfaces.js';
import { getConversationsClient } from './conversations-client';

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

/**
 * Open a direct conversation with a contact, choosing the conversation id by
 * backend. With `VITE_MESSAGE_BACKEND=d1` the opaque id is resolved-or-created
 * in D1 (the row must exist before messaging — the membership guard 404s
 * otherwise); with the default `rtdb` backend the legacy derived id is used.
 */
export async function openDirectConversation(opts: {
  contactId: string;
  fallbackConversationId: string | null;
  contactNickName?: string | null;
}): Promise<void> {
  const useD1 =
    ((import.meta.env.VITE_MESSAGE_BACKEND as string | undefined) ?? 'rtdb') ===
    'd1';

  let conversationId = opts.fallbackConversationId;
  if (useD1) {
    conversationId = await getConversationsClient().resolveDirect(
      opts.contactId,
    );
  }

  if (!conversationId) {
    console.warn('[app] No conversation id for contact', {
      contactId: opts.contactId,
    });
    return;
  }

  setSelection({
    conversationId,
    remoteParticipantIds: [opts.contactId],
    displayUI: true,
    contactNickName: opts.contactNickName ?? undefined,
  });
}
