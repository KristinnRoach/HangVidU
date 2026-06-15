import {
  createRTDBConversationRepository,
  createRTDBMessageRepository,
} from './adapters/rtdb.js';
import { createD1MessageRepositoryFromEnv } from '../../stores/message-repository';
import { rtdb } from '../../infra/firebase-rtdb.js';
import type { MessageRepository } from './interfaces.js';

// `d1` routes message persistence + live push to the data worker; `rtdb`
// (default) keeps the legacy Firebase path. Conversation metadata stays on
// RTDB for now. Mirrors the VITE_SIGNALING_BACKEND selector. The code default
// stays `rtdb` until the d1 path is proven in prod (decision 2026-06-15 #8);
// flip via VITE_MESSAGE_BACKEND=d1 in env to exercise it.
function selectMessageRepository(): MessageRepository {
  const backend =
    (import.meta.env.VITE_MESSAGE_BACKEND as string | undefined) ?? 'rtdb';
  return backend === 'd1'
    ? createD1MessageRepositoryFromEnv()
    : createRTDBMessageRepository({ database: rtdb });
}

export function createMessagingRuntime() {
  return {
    messageRepository: selectMessageRepository(),
    conversationRepository: createRTDBConversationRepository({
      database: rtdb,
    }),
  };
}
