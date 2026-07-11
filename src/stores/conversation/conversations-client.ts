// Lazy singleton for the data-worker client. `stores` is the only layer allowed
// to import both storage (the client) and auth (the token provider), so the
// concrete wiring lives here and is shared by every consumer.

import { getLoggedInUserId, getLoggedInUserToken } from '@auth';
import {
  createConversationsClient,
  type ConversationsClient,
} from '@storage/conversations/data-client';
import { getHangViduApiBaseUrl } from '@infra/hangvidu-api-url';

let client: ConversationsClient | null = null;

export function getConversationsClient(): ConversationsClient {
  if (client) return client;
  client = createConversationsClient({
    baseUrl: getHangViduApiBaseUrl(),
    getToken: getLoggedInUserToken,
  });
  return client;
}

// In-memory cache of `${myUserId}:${otherUserId}` -> opaque conversationId.
// resolve-direct is idempotent server-side; caching just skips the round-trip
// on repeat calls within a session. Keyed by the logged-in user so a cached id
// can never be served to a different account on the same device; also cleared
// on logout (resetConversationsState) and on reload.
const dmIDsCache = new Map<string, string>();

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

/** Clear the resolved-id cache and drop the client singleton. Called on logout. */
export function resetConversationsState(): void {
  dmIDsCache.clear();
  client = null;
}
