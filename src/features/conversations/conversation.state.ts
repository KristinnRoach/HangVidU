import { createStore } from 'solid-js/store';
import type { ConversationChatState } from './interfaces.js';

const initial: ConversationChatState = {
  conversationId: null,
  myUserId: null,
  draft: '',
  messages: [],
  sending: false,
  transportMode: 'persisted',
  unreadCount: 0,
  isPendingPrivateResponse: false,
};

export function createConversationState() {
  const [state, setState] = createStore<ConversationChatState>({ ...initial });
  return { state, setState };
}

export type ConversationStateStore = ReturnType<typeof createConversationState>;
