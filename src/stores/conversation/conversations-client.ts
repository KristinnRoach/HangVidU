// Lazy singleton for the data-worker client. `stores` is the only layer allowed
// to import both storage (the client) and auth (the token provider), so the
// concrete wiring lives here and is shared by every consumer.

import { getLoggedInUserToken } from '@auth/index.js';
import {
  createConversationsClient,
  type ConversationsClient,
} from '@storage/conversations/data-client';
import { getHangViduApiBaseUrl } from '@infra/hangvidu-api-url';
import { clearDmIDsCache } from './dm-ids';

let client: ConversationsClient | null = null;

export function getConversationsClient(): ConversationsClient {
  if (client) return client;
  client = createConversationsClient({
    baseUrl: getHangViduApiBaseUrl(),
    getToken: getLoggedInUserToken,
  });
  return client;
}

/** Clear the resolved-id cache and drop the client singleton. Called on logout. */
export function resetConversationsState(): void {
  clearDmIDsCache();
  client = null;
}
