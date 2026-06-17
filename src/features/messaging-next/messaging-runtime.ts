import { createRTDBConversationRepository } from './adapters/rtdb.js';
import { createD1MessageRepositoryFromEnv } from '../../stores/message-repository';
import { rtdb } from '../../infra/firebase-rtdb.js';

// Messages persist + live-push through the data worker (D1 + ConversationChannel
// DO). Conversation metadata still lives on RTDB pending its own migration.
export function createMessagingRuntime() {
  return {
    messageRepository: createD1MessageRepositoryFromEnv(),
    conversationRepository: createRTDBConversationRepository({
      database: rtdb,
    }),
  };
}
