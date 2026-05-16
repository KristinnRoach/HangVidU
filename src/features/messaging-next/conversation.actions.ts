import type { ConversationStateStore } from './conversation.state.js';
import type {
  ChatMessage,
  MessageAction,
  ReactionMap,
  TransportMode,
} from './interfaces.js';
import type { ConversationId, UserId } from './types.js';

export function createConversationActions(store: ConversationStateStore) {
  const { state, setState } = store;

  function openConversation(conversationId: ConversationId, myUserId: UserId) {
    setState('conversationId', conversationId);
    setState('myUserId', myUserId);
    setState('messages', []);
    setState('unreadCount', 0);
    setState('draft', '');
    setState('isLoading', true);
    setState('transportMode', 'persisted');
    setState('isPendingPrivateResponse', false);
  }

  function setLoading(v: boolean) {
    setState('isLoading', v);
  }

  function setDraft(text: string) {
    setState('draft', text);
  }

  function clearDraft() {
    setState('draft', '');
  }

  function setSending(v: boolean) {
    setState('sending', v);
  }

  function addOptimisticMessage(msg: ChatMessage) {
    setState('messages', (msgs) => [...msgs, msg]);
  }

  function receiveMessage(msg: Omit<ChatMessage, 'status'>) {
    const idx = state.messages.findIndex((m) => m.id === msg.id);
    const next: ChatMessage = { ...msg, status: 'sent' };
    if (idx === -1) {
      setState('messages', (msgs) => [...msgs, next]);
      if (msg.senderId !== state.myUserId) {
        setState('unreadCount', (n) => n + 1);
      }
    } else {
      setState('messages', idx, next);
    }
  }

  function markSent(tempId: string, realId: string) {
    setState('messages', (m) => m.id === tempId, 'id', realId);
    setState('messages', (m) => m.id === realId, 'status', 'sent');
  }

  function markFailed(tempId: string) {
    setState('messages', (m) => m.id === tempId, 'status', 'failed');
  }

  function updateReactions(messageId: string, reactions: ReactionMap) {
    const idx = state.messages.findIndex((m) => m.id === messageId);
    if (idx !== -1) setState('messages', idx, 'reactions', reactions);
  }

  function addSystemMessage(text: string, actions?: MessageAction[]) {
    const id = crypto.randomUUID();
    setState('messages', (msgs) => [
      ...msgs,
      {
        id,
        conversationId: state.conversationId!,
        text,
        senderId: 'system' as UserId,
        createdAt: Date.now(),
        status: 'sent' as const,
        source: 'system' as const,
        delivery: 'persistent' as const,
        reactions: {},
        actions,
      } satisfies ChatMessage,
    ]);
    return id;
  }

  function removeSystemMessage(id: string) {
    setState('messages', (msgs) => msgs.filter((m) => m.id !== id));
  }

  function setTransportMode(mode: TransportMode) {
    setState('transportMode', mode);
  }

  function setIsPendingPrivateResponse(v: boolean) {
    setState('isPendingPrivateResponse', v);
  }

  function markAllRead() {
    setState('unreadCount', 0);
  }

  return {
    openConversation,
    setDraft,
    clearDraft,
    setSending,
    setLoading,
    addOptimisticMessage,
    receiveMessage,
    markSent,
    markFailed,
    updateReactions,
    addSystemMessage,
    removeSystemMessage,
    setTransportMode,
    setIsPendingPrivateResponse,
    markAllRead,
  };
}

export type ConversationActions = ReturnType<typeof createConversationActions>;
