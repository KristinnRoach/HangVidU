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
  type Database,
} from 'firebase/database';
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

type RTDBRepositoryOptions = {
  database: Database;
};

function msgsRef(database: Database, conversationId: ConversationId) {
  return ref(database, `conversations/${conversationId}/messages`);
}

function msgRef(
  database: Database,
  conversationId: ConversationId,
  messageId: string,
) {
  return ref(database, `conversations/${conversationId}/messages/${messageId}`);
}

function memberRef(
  database: Database,
  conversationId: ConversationId,
  userId: UserId,
) {
  return ref(database, `conversations/${conversationId}/members/${userId}`);
}

function recentMsgsQuery(database: Database, conversationId: ConversationId) {
  return query(
    msgsRef(database, conversationId),
    orderByChild('sentAt'),
    limitToLast(RECENT_MESSAGES_WINDOW),
  );
}

function conversationRef(database: Database, conversationId: ConversationId) {
  return ref(database, `conversations/${conversationId}`);
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
    const storage =
      raw.storage && typeof raw.storage === 'object'
        ? (raw.storage as Record<string, unknown>)
        : undefined;
    const r2Storage =
      storage?.provider === 'r2' &&
      typeof storage.bucket === 'string' &&
      typeof storage.key === 'string'
        ? {
            provider: 'r2' as const,
            bucket: storage.bucket,
            key: storage.key,
          }
        : undefined;

    // Modern R2-backed file message
    if (r2Storage) {
      if (
        typeof raw.fileName !== 'string' ||
        typeof raw.mimeType !== 'string' ||
        typeof raw.fileSize !== 'number'
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
          storage: r2Storage,
          text: typeof raw.text === 'string' ? raw.text : undefined,
        },
      };
    }

    // Legacy inline file rows were migrated before the R2 cutover. Runtime
    // messaging-next intentionally requires valid R2 storage metadata.
    return null;
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

export function createRTDBMessageRepository({
  database,
}: RTDBRepositoryOptions): MessageRepository {
  return {
    createMessageId(conversationId) {
      return push(msgsRef(database, conversationId)).key!;
    },

    async loadMessages(conversationId) {
      const snapshot = await get(recentMsgsQuery(database, conversationId));
      return messagesFromSnapshot(snapshot, conversationId);
    },

    watchRecentMessages(conversationId, onMessages, onError) {
      return onValue(
        recentMsgsQuery(database, conversationId),
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

      if (message.payload.type !== 'text' && message.payload.type !== 'file') {
        throw new Error('RTDB adapter only supports text and file messages');
      }
      let payload: Record<string, unknown>;
      if (message.payload.type === 'text') {
        payload = {
          ...base,
          text: message.payload.text,
          type: 'text',
        };
      } else {
        const storage = message.payload.storage;
        if (storage?.provider !== 'r2') {
          throw new Error('file message payload requires R2 storage metadata');
        }
        if (
          typeof storage.bucket !== 'string' ||
          storage.bucket.trim() === '' ||
          typeof storage.key !== 'string' ||
          storage.key.trim() === ''
        ) {
          throw new Error('file message payload requires valid R2 bucket and key');
        }
        payload = {
          ...base,
          type: 'file',
          fileName: message.payload.fileName,
          mimeType: message.payload.mimeType,
          fileSize: message.payload.fileSize,
          storage: {
            provider: 'r2',
            bucket: storage.bucket,
            key: storage.key,
          },
          text: message.payload.text ?? '',
        };
      }

      await set(
        msgRef(database, message.conversationId, message.messageId),
        payload,
      );
      return { id: message.messageId, sentAt: Date.now() };
    },

    async markConversationRead(conversationId, userId) {
      await update(memberRef(database, conversationId, userId), {
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
        query(
          msgsRef(database, conversationId),
          orderByChild('sentAt'),
          limitToLast(1),
        ),
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
        memberRef(database, conversationId, userId),
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
      await set(ref(database, path), active ? true : null);
    },

    subscribeReactions(conversationId, onReactions) {
      const msgRef = msgsRef(database, conversationId);

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

export function createRTDBConversationRepository({
  database,
}: RTDBRepositoryOptions): ConversationRepository {
  return {
    async loadConversation(conversationId) {
      const snapshot = await get(conversationRef(database, conversationId));
      if (!snapshot.exists()) return null;
      return toConversationNode(snapshot.val());
    },

    async upsertConversation(input) {
      const existingSnapshot = await get(
        conversationRef(database, input.conversationId),
      );
      const existing = existingSnapshot.exists()
        ? toConversationNode(existingSnapshot.val())
        : null;

      await update(
        conversationRef(database, input.conversationId),
        conversationUpdate(input, existing),
      );

      const snapshot = await get(
        conversationRef(database, input.conversationId),
      );
      const conversation = toConversationNode(snapshot.val());
      if (!conversation) {
        throw new Error(`Invalid conversation node: ${input.conversationId}`);
      }
      return conversation;
    },

    subscribeConversation(conversationId, onConversation) {
      return onValue(conversationRef(database, conversationId), (snapshot) => {
        onConversation(
          snapshot.exists() ? toConversationNode(snapshot.val()) : null,
        );
      });
    },
  };
}
