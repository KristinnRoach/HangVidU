import { createEffect, onCleanup } from 'solid-js';
import type {
  ChatMessage,
  MessageRepository,
  P2PChatEnvelope,
  PrivateMessageTransport,
} from './interfaces.js';
import type {
  ConversationId,
  DeliveryPolicy,
  MessageEnvelope,
} from './types.js';
import type { ConversationStateStore } from './conversation.state.js';
import type { ConversationActions } from './conversation.actions.js';

type UseConversationOptions = {
  repository: MessageRepository;
  store: ConversationStateStore;
  actions: ConversationActions;
  /** Optional datachannel transport for private mode. Without it, private sends fail. */
  privateTransport?: PrivateMessageTransport;
};

function envelopeToChatMessage(
  message: MessageEnvelope,
  source: ChatMessage['source'],
): ChatMessage | null {
  if (message.payload.type !== 'text') {
    return null;
  }

  return {
    id: message.messageId,
    conversationId: message.conversationId,
    senderId: message.senderId,
    text: message.payload.text,
    createdAt: message.createdAt,
    delivery: message.delivery,
    source,
    status: 'sent',
    reactions: {},
  };
}

export async function loadConversationMessages(
  repository: MessageRepository,
  conversationId: ConversationId,
  actions: ConversationActions,
  shouldApply: () => boolean,
) {
  const messages = await repository.loadMessages(conversationId);
  if (!shouldApply()) return;
  for (const msg of messages) {
    const chatMessage = envelopeToChatMessage(msg, 'persisted');
    if (chatMessage) actions.receiveMessage(chatMessage);
  }
}

export function useConversation({
  repository,
  store,
  actions,
  privateTransport,
}: UseConversationOptions) {
  const { state } = store;

  function handleIncomingPrivateData(data: string) {
    let envelope: P2PChatEnvelope;
    try {
      envelope = JSON.parse(data) as P2PChatEnvelope;
    } catch {
      return;
    }
    if (envelope?.protocol !== 'hangvidu.messaging.v1') return;
    if (envelope.type !== 'message') return;
    if (envelope.message.conversationId !== state.conversationId) return;

    const chatMessage = envelopeToChatMessage(envelope.message, 'private');
    if (chatMessage) actions.receiveMessage(chatMessage);
  }

  if (privateTransport) {
    const cleanup = privateTransport.onMessage(handleIncomingPrivateData);
    onCleanup(cleanup);
  }

  createEffect(() => {
    const conversationId = state.conversationId;
    const myUserId = state.myUserId;
    if (!conversationId || !myUserId) return;

    let cleanup: (() => void) | undefined;
    let disposed = false;

    const result = repository.subscribe(conversationId, myUserId, (msg) => {
      const chatMessage = envelopeToChatMessage(msg, 'persisted');
      if (chatMessage) actions.receiveMessage(chatMessage);
    });

    if (typeof result === 'function') {
      cleanup = result;
    } else {
      void result.then((unsub) => {
        if (disposed) unsub();
        else cleanup = unsub;
      });
    }

    onCleanup(() => {
      disposed = true;
      cleanup?.();
    });
  });

  createEffect(() => {
    const conversationId = state.conversationId;
    if (!conversationId) return;

    let cleanup: (() => void) | undefined;
    let disposed = false;

    const result = repository.subscribeReactions(
      conversationId,
      (messageId, reactions) => {
        actions.updateReactions(messageId, reactions);
      },
    );

    if (typeof result === 'function') {
      cleanup = result;
    } else {
      void result.then((unsub) => {
        if (disposed) unsub();
        else cleanup = unsub;
      });
    }

    onCleanup(() => {
      disposed = true;
      cleanup?.();
    });
  });

  async function send() {
    const { conversationId, myUserId, draft, transportMode } = state;
    const text = draft.trim();
    if (!conversationId || !myUserId || !text) return;

    const tempId = crypto.randomUUID();
    const delivery: DeliveryPolicy =
      transportMode === 'private' ? 'private' : 'persistent';

    const source = transportMode === 'private' ? 'private' : 'persisted';
    const createdAt = Date.now();

    actions.addOptimisticMessage({
      id: tempId,
      conversationId,
      text,
      senderId: myUserId,
      createdAt,
      status: 'sending',
      source,
      delivery,
      reactions: {},
    });
    actions.clearDraft();
    actions.setSending(true);

    try {
      if (transportMode === 'private') {
        if (!privateTransport) {
          actions.markFailed(tempId);
          return;
        }
        const envelope: P2PChatEnvelope = {
          protocol: 'hangvidu.messaging.v1',
          type: 'message',
          message: {
            messageId: tempId,
            conversationId,
            senderId: myUserId,
            createdAt,
            delivery,
            payload: {
              type: 'text',
              text,
            },
          },
        };
        privateTransport.send(JSON.stringify(envelope));
        actions.markSent(tempId, tempId);
      } else {
        const saved = await repository.send({
          messageId: tempId,
          conversationId,
          senderId: myUserId,
          createdAt,
          delivery,
          payload: {
            type: 'text',
            text,
          },
        });
        actions.markSent(tempId, saved.id);
      }
    } catch {
      actions.markFailed(tempId);
    } finally {
      actions.setSending(false);
    }
  }

  return { send, handleIncomingPrivateData };
}
