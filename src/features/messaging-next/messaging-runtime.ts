import {
  createRTDBConversationRepository,
  createRTDBMessageRepository,
} from './adapters/rtdb.js';
import { createD1MessageRepositoryFromEnv } from '../../stores/message-repository';
import type { MessageRepository } from './interfaces.js';

// `d1` routes message persistence to the data worker (Slice B); `rtdb` (default)
// keeps the legacy Firebase path. Conversation metadata stays on RTDB until
// Slice C. Mirrors the VITE_SIGNALING_BACKEND selector.
function selectMessageRepository(): MessageRepository {
  const backend =
    (import.meta.env.VITE_MESSAGE_BACKEND as string | undefined) ?? 'rtdb';
  return backend === 'd1'
    ? createD1MessageRepositoryFromEnv()
    : createRTDBMessageRepository();
}

export function createMessagingRuntime() {
  return {
    messageRepository: selectMessageRepository(),
    conversationRepository: createRTDBConversationRepository(),
  };
}
