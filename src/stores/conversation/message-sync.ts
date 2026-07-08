// Message sync composes storage history with realtime live push.
//
// loadMessages/watchRecentMessages read the recent window from the storage
// repository, then watch* subscribes to the conversation channel and folds each
// broadcast into the window (deduped by the server-honored message id).

import type { Reaction } from '@lib/reactions/solid/solid.js';
import type {
  ConversationServerEvent,
  WireMessage,
} from '@realtime/conversation-protocol';
import {
  toIncomingMessage,
  toSendMessageInput,
  type SendMessageInput,
} from '@storage/conversations/message-mapper.js';

import type {
  ConversationId,
  IncomingMessage,
  MessageRepository,
} from './types.js';

/**
 * The slice of storage + realtime this sync helper needs. The store supplies a
 * concrete implementation because it is allowed to compose storage, auth, and
 * realtime.
 */
export type MessageSyncClient = {
  loadMessages(conversationId: string): Promise<WireMessage[]>;
  sendMessage(
    conversationId: string,
    input: SendMessageInput,
  ): Promise<WireMessage>;
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
};

// Cap the in-memory live window so long-lived sessions don't grow unbounded.
const RECENT_MESSAGES_WINDOW = 40;

export function createMessageSyncRepository(
  client: MessageSyncClient,
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
    // broadcast echo reconciles with the optimistic row.
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

    // Durable cross-device read marker. The store's local optimistic clear
    // covers the in-tab badge; this persists it server-side so other devices
    // clear on their next conversation-list load.
    async markConversationRead(conversationId) {
      await client.markRead(conversationId);
    },

    async setMyReaction(conversationId, messageId, _userId, reactionKey) {
      await client.setMyReaction(conversationId, messageId, reactionKey);
    },
  };
}
