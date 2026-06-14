import {
  createRTDBConversationRepository,
  createRTDBMessageRepository,
} from './adapters/rtdb.js';
import { rtdb } from '../../infra/firebase-rtdb.js';

export function createMessagingRuntime() {
  return {
    messageRepository: createRTDBMessageRepository({ database: rtdb }),
    conversationRepository: createRTDBConversationRepository({
      database: rtdb,
    }),
  };
}
