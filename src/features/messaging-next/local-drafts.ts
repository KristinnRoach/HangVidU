import type { ConversationId, UserId } from './types.js';

const STORAGE_PREFIX = 'hangvidu:messaging-next:draft';

function storageKey(userId: UserId, conversationId: ConversationId) {
  return `${STORAGE_PREFIX}:${encodeURIComponent(userId)}:${encodeURIComponent(
    conversationId,
  )}`;
}

function getStorage(): Storage | null {
  return typeof globalThis.localStorage === 'undefined'
    ? null
    : globalThis.localStorage;
}

export function loadLocalDraft(
  userId: UserId,
  conversationId: ConversationId,
): string {
  try {
    return getStorage()?.getItem(storageKey(userId, conversationId)) ?? '';
  } catch {
    return '';
  }
}

export function saveLocalDraft(
  userId: UserId,
  conversationId: ConversationId,
  text: string,
) {
  try {
    const storage = getStorage();
    if (!storage) return;

    const key = storageKey(userId, conversationId);
    if (text) storage.setItem(key, text);
    else storage.removeItem(key);
  } catch {
    // Local draft persistence is best-effort; in-memory state remains canonical.
  }
}

export function clearLocalDraft(userId: UserId, conversationId: ConversationId) {
  saveLocalDraft(userId, conversationId, '');
}
