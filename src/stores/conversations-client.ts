// Lazy singleton for the data-worker client. `stores` is the only layer allowed
// to import both storage (the client) and auth (the token provider), so the
// concrete wiring lives here and is shared by every consumer (message repo,
// conversation opener).

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
