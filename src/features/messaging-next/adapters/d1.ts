// D1-backed MessageRepository (pure load-on-open; no live push).
//
// Slice B of the D1+R2 migration: D1 is the persistent record. Reads happen on
// conversation open and after each send; the live cross-browser push returns in
// Slice E via the per-conversation Durable Object. Until then the watch* methods
// emit a single current snapshot and return a no-op unsubscribe.
//
// Boundary note: `feature` may not import `storage`, so this adapter depends on
// the minimal `D1MessageClient` structural interface below. The `stores` layer
// (which may import both storage and auth) injects the real data-worker client.

import type {
  IncomingMessage,
  MessageRepository,
  ReactionMap,
} from '../interfaces.js';
import type { ConversationId, MessageEnvelope, UserId } from '../types.js';

/** One persisted message as returned by the data worker. */
export interface D1MessageRecord {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string | null;
  kind: string;
  body: string | null;
  created_at: number;
  reactions: ReactionMap;
}

export interface D1MessageActivity {
  latestSentAt: number;
  latestSenderId: string | null;
  lastReadAt: number;
}

/**
 * The slice of the data-worker client this adapter needs. Declared here (not
 * imported from storage) to keep the feature→storage boundary intact; `stores`
 * supplies a concrete implementation.
 */
export interface D1MessageClient {
  loadMessages(
    conversationId: string,
    limit?: number,
  ): Promise<D1MessageRecord[]>;
  sendMessage(
    conversationId: string,
    body: string,
    kind?: string,
  ): Promise<{ id: string; sentAt: number }>;
  markRead(conversationId: string): Promise<void>;
  activity(conversationId: string): Promise<D1MessageActivity>;
  setReaction(
    conversationId: string,
    messageId: string,
    emoji: string,
    active: boolean,
  ): Promise<void>;
}

const noop = () => {};

function toIncoming(
  row: D1MessageRecord,
  conversationId: ConversationId,
): IncomingMessage | null {
  // Slice B persists text only; other kinds arrive in later slices.
  if (row.kind !== 'text' || typeof row.body !== 'string') return null;
  return {
    messageId: row.id,
    conversationId,
    senderId: row.sender_id as UserId,
    senderName: row.sender_name ?? undefined,
    sentAt: row.created_at,
    delivery: 'persistent',
    payload: { type: 'text', text: row.body },
  };
}

function requireTextPayload(message: MessageEnvelope) {
  if (message.payload.type !== 'text') {
    throw new Error('D1 message adapter currently supports text payloads only');
  }
  return message.payload;
}

export function createD1MessageRepository(
  client: D1MessageClient,
): MessageRepository {
  async function snapshot(
    conversationId: ConversationId,
  ): Promise<IncomingMessage[]> {
    const rows = await client.loadMessages(conversationId);
    return rows
      .map((r) => toIncoming(r, conversationId))
      .filter((m): m is IncomingMessage => m !== null);
  }

  return {
    loadMessages(conversationId) {
      return snapshot(conversationId);
    },

    // Pure D1: deliver the current window once, then nothing. Live updates
    // arrive via the conversation DO in Slice E.
    async watchRecentMessages(conversationId, onMessages, onError) {
      try {
        onMessages(await snapshot(conversationId));
      } catch (error) {
        onError?.(error);
      }
      return noop;
    },

    async send(message) {
      const payload = requireTextPayload(message);
      return client.sendMessage(message.conversationId, payload.text);
    },

    async markConversationRead(conversationId) {
      await client.markRead(conversationId);
    },

    // One-shot activity snapshot (no live push pre-Slice-E).
    async watchConversationActivity(conversationId, _userId, onChange, onError) {
      try {
        const a = await client.activity(conversationId);
        onChange({
          latestSentAt: a.latestSentAt,
          latestSenderId: a.latestSenderId as UserId | null,
          lastReadAt: a.lastReadAt,
        });
      } catch (error) {
        onError?.(error);
      }
      return noop;
    },

    async setReaction(conversationId, messageId, emoji, _userId, active) {
      // The worker derives the reacting user from the auth token, not the arg.
      await client.setReaction(conversationId, messageId, emoji, active);
    },

    // One-shot: emit each message's current reactions, then nothing.
    async subscribeReactions(conversationId, onReactions) {
      const rows = await client.loadMessages(conversationId);
      for (const r of rows) onReactions(r.id, r.reactions);
      return noop;
    },
  };
}
