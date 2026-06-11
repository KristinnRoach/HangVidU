// Lazy singleton for the data-worker client. `stores` is the only layer allowed
// to import both storage (the client) and auth (the token provider), so the
// concrete wiring lives here and is shared by every consumer.

import { getLoggedInUserToken } from '../auth/index.js';
import {
  createConversationsClient,
  type ConversationsClient,
} from '../storage/conversations/data-client';

let client: ConversationsClient | null = null;

export function getConversationsClient(): ConversationsClient {
  if (client) return client;
  const baseUrl =
    (import.meta.env.VITE_DATA_URL as string | undefined) ??
    'http://localhost:8788';
  client = createConversationsClient({
    baseUrl,
    getToken: getLoggedInUserToken,
  });
  return client;
}

// In-memory cache of otherUserId -> opaque conversationId. resolve-direct is
// idempotent server-side; caching just skips the round-trip on repeat calls
// within a session. Cleared on reload.
const directConversationIds = new Map<string, string>();

/**
 * Resolve-or-create the direct conversation with `otherUserId` and return its
 * opaque id, cached per session.
 */
export async function resolveDirectConversationId(
  otherUserId: string,
): Promise<string> {
  const cached = directConversationIds.get(otherUserId);
  if (cached) return cached;
  const conversationId =
    await getConversationsClient().resolveDirect(otherUserId);
  directConversationIds.set(otherUserId, conversationId);
  return conversationId;
}
