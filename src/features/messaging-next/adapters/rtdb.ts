import {
  ref,
  push,
  set,
  get,
  onChildAdded,
  onChildChanged,
  off,
  serverTimestamp,
  type DataSnapshot,
} from 'firebase/database';
import { rtdb } from '../../../shared/storage/fb-rtdb/rtdb.js';
import type {
  IncomingMessage,
  MessageRepository,
  ReactionMap,
} from '../interfaces.js';
import type { ConversationId, UserId } from '../types.js';

// Path: conversations/{conversationId}/messages/{messageId}
// Wire format: { from, text, type, sentAt, reactions? }
// reactions wire format { emoji: { userId: true } } matches ReactionMap directly.

function msgsRef(conversationId: ConversationId) {
  return ref(rtdb, `conversations/${conversationId}/messages`);
}

function toIncoming(
  raw: Record<string, unknown>,
  key: string,
  conversationId: ConversationId,
): IncomingMessage | null {
  if (!raw || typeof raw.text !== 'string' || !raw.from) return null;
  return {
    id: key,
    conversationId,
    senderId: raw.from as UserId,
    text: raw.text,
    // sentAt is a server timestamp (number on read, null briefly after write)
    createdAt: typeof raw.sentAt === 'number' ? raw.sentAt : Date.now(),
    delivery: 'persistent',
  };
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

    async send({ conversationId, senderId, text }) {
      const newRef = push(msgsRef(conversationId));
      await set(newRef, {
        from: senderId,
        text,
        type: 'text',
        sentAt: serverTimestamp(),
      });
      return { id: newRef.key!, createdAt: Date.now() };
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
