import {
  ref,
  push,
  set,
  get,
  onChildChanged,
  onValue,
  off,
  query,
  limitToLast,
  serverTimestamp,
  update,
  orderByChild,
  type DataSnapshot,
} from 'firebase/database';
import { rtdb } from '../../../infra/firebase-rtdb.js';
import type {
  ConversationRepository,
  ConversationUpsert,
  IncomingMessage,
  MessageRepository,
  ReactionMap,
} from '../interfaces.js';
import { ConversationNodeSchema } from '../schema.js';
import type {
  ConversationId,
  ConversationNode,
  UserId,
} from '../types.js';

// Path: conversations/{conversationId}/messages/{messageId}
// Legacy wire format: { from, fromName, text, type, sentAt, read, reactions? }
// reactions wire format { emoji: { userId: true } } matches ReactionMap directly.
//
// This adapter translates between the messaging-next envelope contract and the
// existing RTDB row shape so feature-flag testing can use current production
// data. It is not the target canonical persistence format.

const RECENT_MESSAGES_WINDOW = 20;

function msgsRef(conversationId: ConversationId) {
  return ref(rtdb, `conversations/${conversationId}/messages`);
}

function msgRef(conversationId: ConversationId, messageId: string) {
  return ref(rtdb, `conversations/${conversationId}/messages/${messageId}`);
}

function memberRef(conversationId: ConversationId, userId: UserId) {
  return ref(rtdb, `conversations/${conversationId}/members/${userId}`);
}

function recentMsgsQuery(conversationId: ConversationId) {
  return query(
    msgsRef(conversationId),
    orderByChild('sentAt'),
    limitToLast(RECENT_MESSAGES_WINDOW),
  );
}

function conversationRef(conversationId: ConversationId) {
  return ref(rtdb, `conversations/${conversationId}`);
}

function toIncoming(
  raw: Record<string, unknown>,
  key: string,
  conversationId: ConversationId,
): IncomingMessage | null {
  if (!raw || !raw.from) return null;

  const base = {
    messageId: key,
    conversationId,
    senderId: raw.from as UserId,
    senderName: typeof raw.fromName === 'string' ? raw.fromName : undefined,
    // sentAt is a server timestamp (number on read, null briefly after write)
    sentAt: typeof raw.sentAt === 'number' ? raw.sentAt : Date.now(),
    delivery: 'persistent' as const,
  };

  if (raw.type === 'file') {
    const data = typeof raw.data === 'string' ? raw.data : undefined;
    const url = typeof raw.url === 'string' ? raw.url : undefined;
    const storage =
      raw.storage && typeof raw.storage === 'object'
        ? (raw.storage as Record<string, unknown>)
        : undefined;

    if (
      typeof raw.fileName !== 'string' ||
      typeof raw.mimeType !== 'string' ||
      typeof raw.fileSize !== 'number' ||
      (!data && !url && !storage)
    ) {
      return null;
    }

    return {
      ...base,
      payload: {
        type: 'file',
        fileName: raw.fileName,
        mimeType: raw.mimeType,
        fileSize: raw.fileSize,
        data,
        url,
        storage:
          storage?.provider === 'r2' &&
          typeof storage.bucket === 'string' &&
          typeof storage.key === 'string'
            ? {
                provider: 'r2',
                bucket: storage.bucket,
                key: storage.key,
              }
            : undefined,
        text: typeof raw.text === 'string' ? raw.text : undefined,
      },
    };
  }

  if (typeof raw.text !== 'string') return null;

  return {
    ...base,
    payload: {
      type: 'text',
      text: raw.text,
    },
  };
}

function toConversationNode(raw: unknown): ConversationNode | null {
  const parsed = ConversationNodeSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

function messagesFromSnapshot(
  snapshot: DataSnapshot,
  conversationId: ConversationId,
) {
  if (!snapshot.exists()) return [];
  const messages: IncomingMessage[] = [];
  snapshot.forEach((child) => {
    const msg = toIncoming(
      child.val() as Record<string, unknown>,
      child.key!,
      conversationId,
    );
    if (msg) messages.push(msg);
  });
  return messages;
}

function conversationUpdate(
  input: ConversationUpsert,
  existing: ConversationNode | null,
) {
  const now = Date.now();
  const payload: Record<string, unknown> = {
    conversationId: input.conversationId,
    kind: input.kind,
    title: input.title ?? null,
    participants: input.participants,
    deliveryPolicy: input.deliveryPolicy ?? 'persistent',
    createdAt: input.createdAt ?? existing?.createdAt ?? now,
    updatedAt: input.updatedAt ?? now,
  };
  return payload;
}

export function createRTDBMessageRepository(): MessageRepository {
  return {
    createMessageId(conversationId) {
      return push(msgsRef(conversationId)).key!;
    },

    async loadMessages(conversationId) {
      const snapshot = await get(recentMsgsQuery(conversationId));
      return messagesFromSnapshot(snapshot, conversationId);
    },

    watchRecentMessages(conversationId, onMessages, onError) {
      return onValue(
        recentMsgsQuery(conversationId),
        (snapshot) => {
          onMessages(messagesFromSnapshot(snapshot, conversationId));
        },
        (error) => onError?.(error),
      );
    },

    async send(message) {
      const base = {
        from: message.senderId,
        fromName: message.senderName ?? 'Guest User',
        sentAt: serverTimestamp(),
        read: false,
      };

      const payload: Record<string, unknown> =
        message.payload.type === 'text'
          ? {
              ...base,
              text: message.payload.text,
              type: 'text',
            }
          : message.payload.type === 'file'
            ? {
                ...base,
                type: 'file',
                fileName: message.payload.fileName,
                mimeType: message.payload.mimeType,
                fileSize: message.payload.fileSize,
                storage:
                  message.payload.storage?.provider === 'r2'
                    ? {
                        provider: 'r2',
                        bucket: message.payload.storage.bucket,
                        key: message.payload.storage.key,
                      }
                    : null,
                text: message.payload.text ?? '',
              }
            : {};

      if (message.payload.type !== 'text' && message.payload.type !== 'file') {
        throw new Error('RTDB adapter only supports text and file messages');
      }
      if (message.payload.type === 'file' && !message.payload.storage) {
        throw new Error('file message payload requires R2 storage metadata');
      }

      await set(msgRef(message.conversationId, message.messageId), payload);
      return { id: message.messageId, sentAt: Date.now() };
    },

    async markConversationRead(conversationId, userId) {
      await update(memberRef(conversationId, userId), {
        lastReadAt: serverTimestamp(),
      });
    },

    watchConversationActivity(conversationId, userId, onChange, onError) {
      let latestSenderId: UserId | null = null;
      let latestSentAt = 0;
      let lastReadAt = 0;
      let hasLatest = false;
      let hasRead = false;
      let lastEmittedSentAt = -1;
      let lastEmittedReadAt = -1;
      let lastEmittedSenderId: UserId | null | undefined = undefined;

      function emit() {
        if (!hasLatest || !hasRead) return;
        if (
          latestSentAt === lastEmittedSentAt &&
          lastReadAt === lastEmittedReadAt &&
          latestSenderId === lastEmittedSenderId
        )
          return;

        lastEmittedSentAt = latestSentAt;
        lastEmittedReadAt = lastReadAt;
        lastEmittedSenderId = latestSenderId;
        onChange({ latestSentAt, latestSenderId, lastReadAt });
      }

      const unsubscribeLatest = onValue(
        query(msgsRef(conversationId), orderByChild('sentAt'), limitToLast(1)),
        (snapshot) => {
          latestSenderId = null;
          latestSentAt = 0;
          snapshot.forEach((child) => {
            const raw = child.val() as Record<string, unknown> | null;
            latestSenderId = (raw?.from as UserId) ?? null;
            latestSentAt = typeof raw?.sentAt === 'number' ? raw.sentAt : 0;
          });
          hasLatest = true;
          emit();
        },
        (error) => onError?.(error),
      );

      const unsubscribeRead = onValue(
        memberRef(conversationId, userId),
        (snapshot) => {
          const raw = snapshot.val() as { lastReadAt?: unknown } | null;
          lastReadAt = typeof raw?.lastReadAt === 'number' ? raw.lastReadAt : 0;
          hasRead = true;
          emit();
        },
        (error) => onError?.(error),
      );

      return () => {
        unsubscribeLatest();
        unsubscribeRead();
      };
    },

    async setReaction(conversationId, messageId, emoji, userId, active) {
      const path = `conversations/${conversationId}/messages/${messageId}/reactions/${emoji}/${userId}`;
      await set(ref(rtdb, path), active ? true : null);
    },

    subscribeReactions(conversationId, onReactions) {
      const msgRef = msgsRef(conversationId);

      const handler = (snapshot: DataSnapshot) => {
        const raw = snapshot.val() as Record<string, unknown>;
        if (!raw?.reactions) return;
        onReactions(snapshot.key!, raw.reactions as ReactionMap);
      };

      onChildChanged(msgRef, handler);
      return () => off(msgRef, 'child_changed', handler);
    },
  };
}

export function createRTDBConversationRepository(): ConversationRepository {
  return {
    async loadConversation(conversationId) {
      const snapshot = await get(conversationRef(conversationId));
      if (!snapshot.exists()) return null;
      return toConversationNode(snapshot.val());
    },

    async upsertConversation(input) {
      const existingSnapshot = await get(conversationRef(input.conversationId));
      const existing = existingSnapshot.exists()
        ? toConversationNode(existingSnapshot.val())
        : null;

      await update(
        conversationRef(input.conversationId),
        conversationUpdate(input, existing),
      );

      const snapshot = await get(conversationRef(input.conversationId));
      const conversation = toConversationNode(snapshot.val());
      if (!conversation) {
        throw new Error(`Invalid conversation node: ${input.conversationId}`);
      }
      return conversation;
    },

    subscribeConversation(conversationId, onConversation) {
      return onValue(conversationRef(conversationId), (snapshot) => {
        onConversation(
          snapshot.exists() ? toConversationNode(snapshot.val()) : null,
        );
      });
    },
  };
}
