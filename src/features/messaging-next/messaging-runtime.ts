import { createD1MessageRepositoryFromEnv } from '../../stores/message-repository';

// Messages persist + live-push through the data worker (D1 + ConversationChannel
// DO). Conversation registry/membership is resolved through the data worker.
export function createMessagingRuntime() {
  return {
    messageRepository: createD1MessageRepositoryFromEnv(),
  };
}
