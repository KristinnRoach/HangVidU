import { getLoggedInUserId } from '@auth/index.js';
import { getConversationsClient } from './conversations-client';

// In-memory cache of `${myUserId}:${otherUserId}` -> opaque conversationId.
// resolve-direct is idempotent server-side; caching just skips the round-trip
// on repeat calls within a session. Keyed by the logged-in user so a cached id
// can never be served to a different account on the same device; also cleared
// on logout (resetConversationsState) and on reload.
const dmIDsCache = new Map<string, string>();

export function clearDmIDsCache() {
  dmIDsCache.clear();
}

/**
 * Resolve-or-create the direct conversation with `otherUserId` and return its
 * opaque id, cached per session.
 */
export async function resolveDirectConversationId(
  otherUserId: string,
): Promise<string> {
  const myUserId = getLoggedInUserId();
  if (!myUserId) throw new Error('not authenticated');
  const cacheKey = `${myUserId}:${otherUserId}`;
  const cached = dmIDsCache.get(cacheKey);
  if (cached) return cached;
  let conversationId: string;
  try {
    conversationId = await getConversationsClient().resolveDirect(otherUserId);
  } catch (error) {
    if (!(error instanceof DOMException) || error.name !== 'TimeoutError')
      throw error;
    // ponytail: resolve-direct is idempotent; one retry covers a cold Worker.
    conversationId = await getConversationsClient().resolveDirect(otherUserId);
  }
  dmIDsCache.set(cacheKey, conversationId);
  return conversationId;
}
