import {
  createRTDBConversationRepository,
  createRTDBMessageRepository,
} from './adapters/rtdb.js';

export function createMessagingRuntime() {
  return {
    messageRepository: createRTDBMessageRepository(),
    conversationRepository: createRTDBConversationRepository(),
  };
}
