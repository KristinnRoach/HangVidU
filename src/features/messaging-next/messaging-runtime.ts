import {
  createRTDBConversationRepository,
  createRTDBMessageRepository,
} from './adapters/rtdb.js';
import { createD1MessageRepositoryFromEnv } from '../../stores/message-repository';
import { rtdb } from '../../infra/firebase-rtdb.js';
import type { MessageRepository } from './interfaces.js';

// `d1` (default) routes message persistence + live push to the data worker;
// `rtdb` keeps the legacy Firebase path. Conversation metadata stays on RTDB
// for now. Mirrors the VITE_SIGNALING_BACKEND selector. The code default is
// `d1` now that the path is proven in prod (decision 2026-06-15 #8); the
// legacy `rtdb` path is pending retirement (see RTDB_MESSAGES_RETIREMENT.md).
function selectMessageRepository(): MessageRepository {
  const backend =
    (import.meta.env.VITE_MESSAGE_BACKEND as string | undefined) ?? 'd1';
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
