import { reconcile } from 'solid-js/store';
import type { ConversationStateStore } from './conversation.state.js';
import type {
  ChatMessage,
  ConversationSelection,
  MessageAction,
  ReactionSummary,
  TransportMode,
} from './interfaces.js';
import type { UserId } from './types.js';
import { sortMessagesBySentAt } from './message-ordering.js';
import { loadLocalDraft } from './local-drafts.js';

export function createConversationActions(store: ConversationStateStore) {
  const { state, setState } = store;

  function resetConversation() {
    setState('conversationId', null);
    setState('myUserId', null);
    setState('messages', []);
    setState('unreadCount', 0);
    setState('draft', '');
    setState('sending', false);
    setState('transportMode', 'persisted');
    setState('isPendingPrivateResponse', false);
  }

  function startConversation(
    selection: ConversationSelection,
    myUserId: UserId,
  ) {
    setState('conversationId', selection.conversationId);
    setState('myUserId', myUserId);
    setState('messages', []);
    setState('unreadCount', 0);
    setState('draft', loadLocalDraft(myUserId, selection.conversationId));
    setState('sending', false);
    setState('transportMode', 'persisted');
    setState('isPendingPrivateResponse', false);
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
    setState('messages', (msgs) => sortMessagesBySentAt([...msgs, msg]));
  }

  function mergeLoadedMessages(messages: ChatMessage[]) {
    const byId = new Map(state.messages.map((msg) => [msg.id, msg]));
    for (const msg of messages) {
      byId.set(msg.id, msg);
    }
    // Reconcile keyed by id so unchanged messages keep their store identity —
    // otherwise every snapshot rebuilds the whole <For> list (and remounts
    // every <img>, collapsing scroll layout).
    setState(
      'messages',
      reconcile(sortMessagesBySentAt([...byId.values()]), { key: 'id' }),
    );
  }

  function receiveMessage(msg: Omit<ChatMessage, 'status'>) {
    const next: ChatMessage = { ...msg, status: 'sent' };
    const isNew = !state.messages.some((m) => m.id === msg.id);

    setState('messages', (msgs) =>
      sortMessagesBySentAt(
        isNew ? [...msgs, next] : msgs.map((m) => (m.id === msg.id ? next : m)),
      ),
    );

    if (isNew) {
      if (msg.senderId !== state.myUserId) {
        setState('unreadCount', (n) => n + 1);
      }
    }
  }

  function markSent(tempId: string, realId: string) {
    setState('messages', (msgs) => {
      const realMessageAlreadyArrived =
        tempId !== realId && msgs.some((msg) => msg.id === realId);

      return sortMessagesBySentAt(
        msgs.flatMap((msg) => {
          if (msg.id === tempId) {
            return realMessageAlreadyArrived
              ? []
              : [{ ...msg, id: realId, status: 'sent' as const }];
          }
          if (msg.id === realId) return [{ ...msg, status: 'sent' as const }];
          return [msg];
        }),
      );
    });
  }

  function markFailed(tempId: string) {
    setState('messages', (m) => m.id === tempId, 'status', 'failed');
  }

  function updateReactions(messageId: string, reactions: ReactionSummary[]) {
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
        sentAt: Date.now(),
        status: 'sent' as const,
        source: 'system' as const,
        delivery: 'persistent' as const,
        reactions: [],
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
    resetConversation,
    startConversation,
    setDraft,
    clearDraft,
    setSending,
    mergeLoadedMessages,
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
