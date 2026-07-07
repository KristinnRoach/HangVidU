// Wiring layer: assembles the D1 message adapter from the data-worker HTTP
// client (storage) + the live-push channel (realtime), both authenticated with
// the logged-in user's token (auth). `stores` is the only layer permitted to
// import storage, realtime, and auth together, so the boundary-clean pieces are
// composed here and handed to the feature adapter.

import { getLoggedInUserId, getLoggedInUserToken } from '../auth/index.js';
import { getConversationsClient } from './conversations-client.js';
import { createConversationChannel } from '../realtime/conversation-channel.js';
import {
  createD1MessageRepository,
  type D1MessageClient,
} from '../features/conversations/adapters/d1.js';
import type { MessageRepository } from '../features/conversations/interfaces.js';
import { getHangViduApiBaseUrl } from '../infra/hangvidu-api-url.js';

export function createD1MessageRepositoryFromEnv(): MessageRepository {
  const http = getConversationsClient();
  const baseUrl = getHangViduApiBaseUrl();

  const client: D1MessageClient = {
    loadMessages: (conversationId) => http.loadMessages(conversationId),
    sendMessage: (conversationId, input) =>
      http.sendMessage(conversationId, input),
    setMyReaction: (conversationId, messageId, reactionKey) =>
      http.setMyReaction(conversationId, messageId, reactionKey),
    markRead: async (conversationId) => {
      await http.markRead(conversationId);
    },
    getUserId: getLoggedInUserId,
    subscribe: (conversationId, onEvent) => {
      const channel = createConversationChannel({
        baseUrl,
        conversationId,
        getToken: getLoggedInUserToken,
      });
      const off = channel.onEvent(onEvent);
      return () => {
        off();
        channel.close();
      };
    },
  };

  return createD1MessageRepository(client);
}
