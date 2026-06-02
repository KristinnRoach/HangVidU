import { createEffect, onCleanup } from 'solid-js';
import type { Accessor } from 'solid-js';
import type {
  ChatMessage,
  ConversationRepository,
  MessageRepository,
  P2PChatEnvelope,
  PrivateMessageTransport,
} from './interfaces.js';
import type {
  ConversationId,
  DeliveryPolicy,
  FileMessagePayload,
  MessageEnvelope,
  TextMessagePayload,
  UserId,
} from './types.js';
import type { ConversationStateStore } from './conversation.state.js';
import type { ConversationActions } from './conversation.actions.js';
import { sortMessagesBySentAt } from './message-ordering.js';

type UseConversationOptions = {
  repository: MessageRepository;
  store: ConversationStateStore;
  actions: ConversationActions;
  getSenderName?: () => string | null | undefined;
  historyReady?: Accessor<boolean>;
  /** Optional datachannel transport for private mode. Without it, private sends fail. */
  privateTransport?: PrivateMessageTransport;
};

type SendPayload = TextMessagePayload | FileMessagePayload;

export function envelopeToChatMessage(
  message: MessageEnvelope,
  source: ChatMessage['source'],
): ChatMessage | null {
  if (message.payload.type === 'system' || message.payload.type === 'event') {
    return null;
  }

  const text =
    message.payload.type === 'text'
      ? message.payload.text
      : (message.payload.text ?? '');
  const attachment =
    message.payload.type === 'file'
      ? {
          type: 'file' as const,
          fileName: message.payload.fileName,
          mimeType: message.payload.mimeType,
          fileSize: message.payload.fileSize,
          data: message.payload.data,
          url: message.payload.url,
          storage: message.payload.storage,
        }
      : undefined;

  return {
    id: message.messageId,
    conversationId: message.conversationId,
    senderId: message.senderId,
    text,
    attachment,
    sentAt: message.sentAt,
    delivery: message.delivery,
    source,
    status: 'sent',
    reactions: {},
  };
}

export async function loadConversationHistory(
  repository: MessageRepository,
  conversationId: ConversationId,
) {
  return sortMessagesBySentAt(
    (await repository.loadMessages(conversationId))
      .map((msg) => envelopeToChatMessage(msg, 'persisted'))
      .filter((msg): msg is ChatMessage => Boolean(msg)),
  );
}

// export async function ensureDirectConversation(
//   repository: ConversationRepository,
//   conversationId: ConversationId,
//   myUserId: UserId,
//   remoteParticipantIds: UserId[],
// ) {
//   const existing = await repository.loadConversation(conversationId);
//   if (existing || remoteParticipantIds.length !== 1) return existing;

//   const now = Date.now();
//   const remoteUserId = remoteParticipantIds[0];
//   return repository.upsertConversation({
//     conversationId,
//     kind: 'direct',
//     participants: {
//       [myUserId]: {
//         userId: myUserId,
//         joinedAt: now,
//         role: 'member', // "owner" | "admin" | "member"
//         status: 'active', // "active" | "left" | "removed"
//       },
//       [remoteUserId]: {
//         userId: remoteUserId,
//         joinedAt: now,
//         role: 'member', // "owner" | "admin" | "member"
//         // status: 'active' // "active" | "left" | "removed"
//       },
//     },
//     createdAt: now,
//     updatedAt: now,
//   });
// }

export function useConversation({
  repository,
  store,
  actions,
  getSenderName,
  historyReady = () => true,
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
    if (chatMessage) {
      actions.receiveMessage(chatMessage);
    }
  }

  if (privateTransport) {
    const cleanup = privateTransport.onMessage(handleIncomingPrivateData);
    onCleanup(cleanup);
  }

  createEffect(() => {
    const conversationId = state.conversationId;
    if (!conversationId || !historyReady()) return;

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

  async function send(payloadOverride?: SendPayload) {
    const { conversationId, myUserId, draft, transportMode } = state;
    const text = draft.trim();
    const payload: SendPayload = payloadOverride ?? { type: 'text', text };
    if (!conversationId || !myUserId) return;
    if (payload.type === 'text' && !payload.text.trim()) return;

    const delivery: DeliveryPolicy =
      transportMode === 'private' ? 'private' : 'persistent';

    const source = transportMode === 'private' ? 'private' : 'persisted';
    const tempId =
      transportMode === 'private'
        ? crypto.randomUUID()
        : repository.createMessageId(conversationId);
    const sentAt = Date.now();
    const senderName = getSenderName?.() ?? undefined;
    const optimisticText =
      payload.type === 'text' ? payload.text : (payload.text?.trim() ?? '');
    const attachment =
      payload.type === 'file'
        ? {
            type: 'file' as const,
            fileName: payload.fileName,
            mimeType: payload.mimeType,
            fileSize: payload.fileSize,
            data: payload.data,
            url: payload.url,
            storage: payload.storage,
          }
        : undefined;

    actions.addOptimisticMessage({
      id: tempId,
      conversationId,
      text: optimisticText,
      attachment,
      senderId: myUserId,
      sentAt,
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
            senderName,
            sentAt,
            delivery,
            payload,
          },
        };
        privateTransport.send(JSON.stringify(envelope));
        actions.markSent(tempId, tempId);
      } else {
        const saved = await repository.send({
          messageId: tempId,
          conversationId,
          senderId: myUserId,
          senderName,
          sentAt,
          delivery,
          payload,
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
