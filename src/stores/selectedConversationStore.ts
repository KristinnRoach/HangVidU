import { createSignal } from 'solid-js';
import { getLoggedInUserId } from '../auth/index.js';
import type { ConversationSelection } from '../features/conversations/interfaces.js';
import { resolveDirectConversationId } from './conversations-client';
import { cacheContactConversationId, getContactById } from './contactsStore.js';

const [selection, setSelection] = createSignal<ConversationSelection | null>(
  null,
);
const STORAGE_PREFIX = 'hangvidu:conversations:selected-contact';

export { selection };

function getLocalStorage(): Storage | null {
  return typeof globalThis.localStorage === 'undefined'
    ? null
    : globalThis.localStorage;
}

function storageKey(userId: string) {
  return `${STORAGE_PREFIX}:${encodeURIComponent(userId)}`;
}

function saveSelectedContactId(contactId: string | null): void {
  try {
    const userId = getLoggedInUserId();
    const storage = getLocalStorage();
    if (!userId || !storage) return;

    const key = storageKey(userId);
    if (contactId) storage.setItem(key, contactId);
    else storage.removeItem(key);
  } catch {
    // Selection persistence is best-effort; in-memory state remains canonical.
  }
}

export function loadSelectedContactId(): string | null {
  try {
    const userId = getLoggedInUserId();
    const storage = getLocalStorage();
    if (!userId || !storage) return null;

    return storage.getItem(storageKey(userId))?.trim() || null;
  } catch {
    return null;
  }
}

export function open(next: ConversationSelection): void {
  saveSelectedContactId(
    next.remoteParticipantIds?.length === 1
      ? next.remoteParticipantIds[0]
      : null,
  );
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

  saveSelectedContactId(contactId);
  setSelection({ ...meta, conversationId, remoteParticipantIds: [contactId] });
}
