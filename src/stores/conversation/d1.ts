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
// Scope: text + file messages and one reaction per user, all with live push.

import type { IncomingMessage, MessageRepository } from './interfaces.js';
import type { ConversationId } from './types.js';
import type {
  ConversationServerEvent,
  WireMessage,
} from '@realtime/conversation-protocol';
import type { Reaction } from '@lib/reactions/solid/solid.js';
import {
  toIncomingMessage,
  toSendMessageInput,
  type D1SendInput,
} from '@storage/conversations/message-mapper.js';

/**
 * The slice of the data-worker client + live channel this adapter needs.
 * Declared here (not imported from storage/realtime) to keep the feature
 * boundary intact; `stores` supplies a concrete implementation.
 */
export interface D1MessageClient {
  loadMessages(conversationId: string): Promise<WireMessage[]>;
  sendMessage(conversationId: string, input: D1SendInput): Promise<WireMessage>;
  setMyReaction(
    conversationId: string,
    messageId: string,
    reactionKey: string | null,
  ): Promise<Reaction[]>;
  /** Advance the caller's server-owned read marker for a conversation. */
  markRead(conversationId: string): Promise<void>;
  getUserId(): string | null;
  /** Subscribe to live broadcasts for a conversation. Returns unsubscribe. */
  subscribe(
    conversationId: string,
    onEvent: (event: ConversationServerEvent) => void,
  ): () => void;
}

// Cap the in-memory live window so long-lived sessions don't grow unbounded.
const RECENT_MESSAGES_WINDOW = 40;

export function createD1MessageRepository(
  client: D1MessageClient,
): MessageRepository {
  async function snapshot(
    conversationId: ConversationId,
  ): Promise<IncomingMessage[]> {
    const rows = await client.loadMessages(conversationId);
    return rows
      .map(toIncomingMessage)
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
      const emit = () => {
        const ordered = [...window.values()].sort(
          (a, b) => a.sentAt - b.sentAt,
        );
        if (ordered.length > RECENT_MESSAGES_WINDOW) {
          // Evict oldest beyond the window so the Map stays bounded.
          for (const stale of ordered.splice(
            0,
            ordered.length - RECENT_MESSAGES_WINDOW,
          )) {
            window.delete(stale.messageId);
          }
        }
        onMessages(ordered);
      };

      try {
        for (const m of await snapshot(conversationId)) {
          window.set(m.messageId, m);
        }
        emit();
      } catch (error) {
        onError?.(error);
      }

      return client.subscribe(conversationId, (event) => {
        if (event.t === 'message') {
          const incoming = toIncomingMessage(event.message);
          if (!incoming) return;
          window.set(incoming.messageId, incoming);
          emit();
          return;
        }

        const message = window.get(event.messageId);
        if (!message) return;
        const previous = message.reactions;
        const actorIsMe = event.actorUserId === client.getUserId();
        window.set(event.messageId, {
          ...message,
          reactions: event.reactions.map(({ key, count }) => ({
            key,
            count,
            reactedByMe: actorIsMe
              ? event.actorReactionKey === key
              : (previous.find((reaction) => reaction.key === key)
                  ?.reactedByMe ?? false),
          })),
        });
        emit();
      });
    },

    async send(message) {
      const stored = await client.sendMessage(
        message.conversationId,
        toSendMessageInput(message),
      );
      return { id: stored.id, sentAt: stored.sentAt };
    },

    // Durable cross-device read marker (#563). The store's local optimistic
    // clear (conversation-list-state) covers the in-tab badge; this persists it
    // server-side so other devices clear on their next conversation-list load.
    async markConversationRead(conversationId) {
      await client.markRead(conversationId);
    },

    async setMyReaction(conversationId, messageId, _userId, reactionKey) {
      await client.setMyReaction(conversationId, messageId, reactionKey);
    },
  };
}
