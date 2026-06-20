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

import type {
  ConversationActivity,
  IncomingMessage,
  MessageRepository,
  ReactionMap,
} from '../interfaces.js';
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

// ── Per-device read state ──────────────────────────────────────────────────
// lastReadAt lives in localStorage keyed by conversation. ponytail: per-device,
// not synced across devices — the contract (markConversationRead / lastReadAt)
// is identical to a server-backed version, so swapping to D1 later is internal
// to this adapter, no UI or interface change.
const readKey = (conversationId: string) => `hangvidu:lastRead:${conversationId}`;

function getLastReadAt(conversationId: string): number {
  try {
    return Number(localStorage.getItem(readKey(conversationId))) || 0;
  } catch {
    return 0;
  }
}

function setLastReadAt(conversationId: string, at: number): void {
  try {
    localStorage.setItem(readKey(conversationId), String(at));
  } catch {
    // localStorage unavailable (SSR/private mode): read state is best-effort.
  }
}

// In-process activity subscribers, so markConversationRead re-emits the cleared
// lastReadAt to the contacts list live on the same device without a reload.
interface ActivitySub {
  userId: UserId;
  state: ConversationActivity;
  emit: () => void;
}
const activitySubs = new Map<string, Set<ActivitySub>>();

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

    markConversationRead(conversationId, _userId) {
      const subs = activitySubs.get(conversationId);
      // Clamp past the newest known message so clock skew can't leave a stale
      // badge: a read always wins over a message we've already seen.
      let readAt = Date.now();
      if (subs) for (const s of subs) readAt = Math.max(readAt, s.state.latestSentAt);
      setLastReadAt(conversationId, readAt);
      if (subs)
        for (const s of subs) {
          s.state.lastReadAt = readAt;
          s.emit();
        }
    },

    // Derive activity from the live conversation channel: initial snapshot seeds
    // latest*, each broadcast advances it. lastReadAt comes from localStorage and
    // is updated in-process by markConversationRead. ponytail: one WS + one
    // loadMessages per watched conversation — fine for a small contact list;
    // upgrade path is a single per-user activity stream if lists grow large.
    watchConversationActivity(conversationId, userId, onChange, onError) {
      const state: ConversationActivity = {
        latestSentAt: 0,
        latestSenderId: null,
        lastReadAt: getLastReadAt(conversationId),
      };
      const sub: ActivitySub = {
        userId,
        state,
        emit: () => onChange({ ...state }),
      };
      let subs = activitySubs.get(conversationId);
      if (!subs) activitySubs.set(conversationId, (subs = new Set()));
      subs.add(sub);

      const advance = (m: WireMessage) => {
        if (m.sentAt <= state.latestSentAt) return;
        state.latestSentAt = m.sentAt;
        state.latestSenderId = m.senderId as UserId;
        sub.emit();
      };

      const off = client.subscribe(conversationId, advance);

      sub.emit(); // satisfy the contract: emit current state immediately.
      void client
        .loadMessages(conversationId)
        .then((rows) => {
          for (const m of rows) advance(m); // advance() keeps only the newest.
        })
        .catch((error) => onError?.(error));

      return () => {
        off();
        subs?.delete(sub);
        if (subs && subs.size === 0) activitySubs.delete(conversationId);
      };
    },

    // Reactions are deferred (decision #5).
    setReaction() {},
    subscribeReactions() {
      void EMPTY_REACTIONS;
      return noop;
    },
  };
}
