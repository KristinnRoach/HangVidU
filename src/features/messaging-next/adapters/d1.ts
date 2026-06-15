// D1-backed MessageRepository with Durable Object live push.
//
// Persistence is the data worker (D1); live cross-client delivery is the
// per-conversation Durable Object. loadMessages/watchRecentMessages read the
// recent window over HTTP, then watch* subscribes to the DO channel and folds
// each broadcast into the window (deduped by the server-honored message id).
//
// Boundary note: `feature` may not import `storage`, so this adapter depends on
// the structural `D1MessageClient` interface below. The `stores` layer (which
// may import storage, auth, and realtime) injects a concrete implementation
// that wires the HTTP client + the live channel.
//
// Scope (decision 2026-06-15 #5): text messages + live push. File mapping and
// the reaction/read methods land with the file + fast-follow work; until then
// file rows are skipped and the deferred methods are inert.

import type { IncomingMessage, MessageRepository, ReactionMap } from '../interfaces.js';
import type { ConversationId, MessageEnvelope, UserId } from '../types.js';
import type { WireMessage } from '../../../realtime/conversation-protocol';

/** Input the adapter hands the client for a send (mirrors the worker body). */
export interface D1SendInput {
  messageId: string;
  kind: 'text' | 'file';
  body?: string | null;
}

/**
 * The slice of the data-worker client + live channel this adapter needs.
 * Declared here (not imported from storage/realtime) to keep the feature
 * boundary intact; `stores` supplies a concrete implementation.
 */
export interface D1MessageClient {
  loadMessages(conversationId: string): Promise<WireMessage[]>;
  sendMessage(conversationId: string, input: D1SendInput): Promise<WireMessage>;
  /** Subscribe to live broadcasts for a conversation. Returns unsubscribe. */
  subscribe(
    conversationId: string,
    onMessage: (message: WireMessage) => void,
  ): () => void;
}

const noop = () => {};
const EMPTY_REACTIONS: ReactionMap = {};

function toIncoming(m: WireMessage): IncomingMessage | null {
  // File mapping lands with the file sub-slice; skip non-text for now.
  if (m.kind !== 'text' || typeof m.body !== 'string') return null;
  return {
    messageId: m.id,
    conversationId: m.conversationId as ConversationId,
    senderId: m.senderId as UserId,
    senderName: m.senderName ?? undefined,
    sentAt: m.sentAt,
    delivery: 'persistent',
    payload: { type: 'text', text: m.body },
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
      .map(toIncoming)
      .filter((m): m is IncomingMessage => m !== null);
  }

  return {
    // Client-reserved id: the worker persists under this same id, so the live
    // broadcast echo reconciles with the optimistic row (decision #6).
    createMessageId() {
      return crypto.randomUUID();
    },

    loadMessages(conversationId) {
      return snapshot(conversationId);
    },

    async watchRecentMessages(conversationId, onMessages, onError) {
      // Window keyed by id so the live echo dedupes against the snapshot.
      const window = new Map<string, IncomingMessage>();
      const emit = () =>
        onMessages(
          [...window.values()].sort((a, b) => a.sentAt - b.sentAt),
        );

      try {
        for (const m of await snapshot(conversationId)) {
          window.set(m.messageId, m);
        }
        emit();
      } catch (error) {
        onError?.(error);
      }

      return client.subscribe(conversationId, (wire) => {
        const incoming = toIncoming(wire);
        if (!incoming) return;
        window.set(incoming.messageId, incoming);
        emit();
      });
    },

    async send(message) {
      const payload = requireTextPayload(message);
      const stored = await client.sendMessage(message.conversationId, {
        messageId: message.messageId,
        kind: 'text',
        body: payload.text,
      });
      return { id: stored.id, sentAt: stored.sentAt };
    },

    // Read receipts are deferred (decision #5); marking is a no-op for now.
    markConversationRead() {},

    // No live activity feed yet. Emit a one-shot snapshot with lastReadAt at
    // the latest message so open conversations don't show false unread badges
    // until read receipts land in the fast-follow.
    async watchConversationActivity(conversationId, _userId, onChange, onError) {
      try {
        const rows = await snapshot(conversationId);
        const latest = rows[rows.length - 1];
        onChange({
          latestSentAt: latest?.sentAt ?? 0,
          latestSenderId: latest?.senderId ?? null,
          lastReadAt: latest?.sentAt ?? 0,
        });
      } catch (error) {
        onError?.(error);
      }
      return noop;
    },

    // Reactions are deferred (decision #5).
    setReaction() {},
    subscribeReactions() {
      void EMPTY_REACTIONS;
      return noop;
    },
  };
}
