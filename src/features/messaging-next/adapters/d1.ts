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
// Scope (decision 2026-06-15 #5): text + file messages with live push. The
// reaction/read methods are inert (deferred to the fast-follow).

import type { IncomingMessage, MessageRepository, ReactionMap } from '../interfaces.js';
import type { ConversationId, MessageEnvelope, UserId } from '../types.js';
import type { WireMessage } from '../../../realtime/conversation-protocol';

/** Input the adapter hands the client for a send (mirrors the worker body). */
export interface D1SendInput {
  messageId: string;
  kind: 'text' | 'file';
  body?: string | null;
  attachment?: {
    r2Key: string;
    bucket: string;
    fileName: string;
    mimeType: string;
    fileSize: number;
    width?: number | null;
    height?: number | null;
  };
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

// Cap the in-memory live window so long-lived sessions don't grow unbounded.
// Matches the rtdb adapter's RECENT_MESSAGES_WINDOW.
const RECENT_MESSAGES_WINDOW = 40;

function toIncoming(m: WireMessage): IncomingMessage | null {
  const base = {
    messageId: m.id,
    conversationId: m.conversationId as ConversationId,
    senderId: m.senderId as UserId,
    senderName: m.senderName ?? undefined,
    sentAt: m.sentAt,
    delivery: 'persistent' as const,
  };

  if (m.kind === 'file') {
    const a = m.attachments[0];
    if (!a) return null;
    return {
      ...base,
      payload: {
        type: 'file',
        fileName: a.fileName,
        mimeType: a.mimeType,
        fileSize: a.fileSize,
        width: a.width ?? undefined,
        height: a.height ?? undefined,
        storage: { provider: 'r2', bucket: a.bucket, key: a.r2Key },
        text: m.body ?? undefined,
      },
    };
  }

  if (typeof m.body !== 'string') return null;
  return { ...base, payload: { type: 'text', text: m.body } };
}

/** Build the worker send input from an outgoing envelope (text or file). */
function toSendInput(message: MessageEnvelope): D1SendInput {
  const { payload } = message;
  if (payload.type === 'text') {
    return { messageId: message.messageId, kind: 'text', body: payload.text };
  }
  if (payload.type === 'file') {
    return {
      messageId: message.messageId,
      kind: 'file',
      body: payload.text ?? null,
      attachment: {
        r2Key: payload.storage.key,
        bucket: payload.storage.bucket,
        fileName: payload.fileName,
        mimeType: payload.mimeType,
        fileSize: payload.fileSize,
        width: payload.width ?? null,
        height: payload.height ?? null,
      },
    };
  }
  throw new Error(`D1 message adapter cannot send payload type: ${payload.type}`);
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
      const emit = () => {
        const ordered = [...window.values()].sort((a, b) => a.sentAt - b.sentAt);
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

      return client.subscribe(conversationId, (wire) => {
        const incoming = toIncoming(wire);
        if (!incoming) return;
        window.set(incoming.messageId, incoming);
        emit();
      });
    },

    async send(message) {
      const stored = await client.sendMessage(
        message.conversationId,
        toSendInput(message),
      );
      return { id: stored.id, sentAt: stored.sentAt };
    },

    // Read receipts are deferred (decision #5); marking is a no-op for now.
    markConversationRead() {},

    // Reactions are deferred (decision #5).
    setReaction() {},
    subscribeReactions() {
      void EMPTY_REACTIONS;
      return noop;
    },
  };
}
