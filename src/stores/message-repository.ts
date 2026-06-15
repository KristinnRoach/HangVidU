// Wiring layer: assembles the D1 message adapter from the data-worker HTTP
// client (storage) + the live-push channel (realtime), both authenticated with
// the logged-in user's token (auth). `stores` is the only layer permitted to
// import storage, realtime, and auth together, so the boundary-clean pieces are
// composed here and handed to the feature adapter.

import { getLoggedInUserToken } from '../auth/index.js';
import { getConversationsClient } from './conversations-client';
import { createConversationChannel } from '../realtime/conversation-channel';
import {
  createD1MessageRepository,
  type D1MessageClient,
} from '../features/messaging-next/adapters/d1';
import type { MessageRepository } from '../features/messaging-next/interfaces.js';

function dataBaseUrl(): string {
  return (
    (import.meta.env.VITE_DATA_URL as string | undefined) ??
    'http://localhost:8788'
  );
}

export function createD1MessageRepositoryFromEnv(): MessageRepository {
  const http = getConversationsClient();
  const baseUrl = dataBaseUrl();

  const client: D1MessageClient = {
    loadMessages: (conversationId) => http.loadMessages(conversationId),
    sendMessage: (conversationId, input) =>
      http.sendMessage(conversationId, input),
    subscribe: (conversationId, onMessage) => {
      const channel = createConversationChannel({
        baseUrl,
        conversationId,
        getToken: getLoggedInUserToken,
      });
      const off = channel.onMessage(onMessage);
      return () => {
        off();
        channel.close();
      };
    },
  };

  return createD1MessageRepository(client);
}
