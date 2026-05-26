import {
  ref,
  push,
  set,
  get,
  onChildAdded,
  onChildChanged,
  onValue,
  off,
  serverTimestamp,
  update,
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
  MessageEnvelope,
  UserId,
} from '../types.js';

// Path: conversations/{conversationId}/messages/{messageId}
// Legacy wire format: { from, fromName, text, type, sentAt, read, reactions? }
// reactions wire format { emoji: { userId: true } } matches ReactionMap directly.
//
// This adapter translates between the messaging-next envelope contract and the
// existing RTDB row shape so feature-flag testing can use current production
// data. It is not the target canonical persistence format.

function msgsRef(conversationId: ConversationId) {
  return ref(rtdb, `conversations/${conversationId}/messages`);
}

function conversationRef(conversationId: ConversationId) {
  return ref(rtdb, `conversations/${conversationId}`);
}

function toIncoming(
  raw: Record<string, unknown>,
  key: string,
  conversationId: ConversationId,
): IncomingMessage | null {
  if (!raw || typeof raw.text !== 'string' || !raw.from) return null;
  return {
    messageId: key,
    conversationId,
    senderId: raw.from as UserId,
    senderName: typeof raw.fromName === 'string' ? raw.fromName : undefined,
    // sentAt is a server timestamp (number on read, null briefly after write)
    sentAt: typeof raw.sentAt === 'number' ? raw.sentAt : Date.now(),
    delivery: 'persistent',
    payload: {
      type: 'text',
      text: raw.text,
    },
  };
}

function requireTextPayload(message: MessageEnvelope) {
  if (message.payload.type !== 'text') {
    throw new Error('RTDB legacy adapter currently supports text payloads only');
  }
  return message.payload;
}

function toConversationNode(raw: unknown): ConversationNode | null {
  const parsed = ConversationNodeSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
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
    async loadMessages(conversationId) {
      const snapshot = await get(msgsRef(conversationId));
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
    },

    async send(message) {
      const payload = requireTextPayload(message);
      const newRef = push(msgsRef(message.conversationId));
      await set(newRef, {
        from: message.senderId,
        fromName: message.senderName ?? 'Guest User',
        text: payload.text,
        type: 'text',
        sentAt: serverTimestamp(),
        read: false,
      });
      return { id: newRef.key!, sentAt: Date.now() };
    },

    subscribe(conversationId, myUserId, onMessage) {
      const msgRef = msgsRef(conversationId);

      const handler = (snapshot: DataSnapshot) => {
        const raw = snapshot.val() as Record<string, unknown>;
        if (!raw || raw.from === myUserId) return;
        const msg = toIncoming(raw, snapshot.key!, conversationId);
        if (msg) onMessage(msg);
      };

      onChildAdded(msgRef, handler);
      return () => off(msgRef, 'child_added', handler);
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
