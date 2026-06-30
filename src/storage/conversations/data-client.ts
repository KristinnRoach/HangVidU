// HTTPS client for the consolidated Cloudflare API's D1 conversation core.
// Boundary-clean: storage may not import `auth`, so the bearer token is injected
// via a `getToken` provider supplied by the wiring layer (src/stores).
// Surface: /me, /conversations/resolve-direct, /conversations,
// /conversations/:id, and the message endpoints (/conversations/:id/messages).

import type {
  WireMessage,
  WireReactionSummary,
} from '../../../shared/conversation-channel/protocol';
import { reportApiAuthFailure } from '../../infra/api-auth-failure.js';

/** Input for sending a message. `messageId` is client-reserved (optimistic id). */
export interface SendMessageInput {
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

export interface ConversationMember {
  user_id: string;
  display_name: string | null;
  joined_at: number;
}

export interface Conversation {
  id: string;
  kind: 'direct' | 'group';
  dm_key: string | null;
  title: string | null;
  created_at: number;
  updated_at: number;
  // Latest-message meta for the conversation list (present on `list()`); null
  // when the conversation has no messages yet.
  latest_sent_at?: number | null;
  latest_sender_id?: string | null;
  // Caller's own server-owned read marker (present on `list()`); drives the
  // cross-device unread badge. 0 = never read.
  last_read_at?: number;
}

export interface ConversationsClient {
  /** Resolve-or-create the direct conversation with `otherUserId`; returns its opaque id. */
  resolveDirect(otherUserId: string): Promise<string>;
  list(): Promise<
    Array<Conversation & { members: ConversationMember[] }>
  >;
  get(
    conversationId: string,
  ): Promise<{ conversation: Conversation; members: ConversationMember[] }>;
  me(): Promise<{ userId: string }>;
  /** Recent messages for a conversation, oldest-first. */
  loadMessages(conversationId: string): Promise<WireMessage[]>;
  /** Send a message; resolves with the server-stored wire message. */
  sendMessage(
    conversationId: string,
    input: SendMessageInput,
  ): Promise<WireMessage>;
  setMyReaction(
    conversationId: string,
    messageId: string,
    reactionKey: string | null,
  ): Promise<WireReactionSummary[]>;
  /** Advance the caller's server-owned read marker; resolves with the new marker. */
  markRead(conversationId: string): Promise<number>;
}

export interface ConversationsClientOptions {
  /** Base URL of the data worker, e.g. http://localhost:8788. */
  baseUrl: string;
  /** Returns the current bearer token (Firebase ID token), or null if logged out. */
  getToken: () => Promise<string | null>;
}

export function createConversationsClient(
  options: ConversationsClientOptions,
): ConversationsClient {
  const base = options.baseUrl.replace(/\/$/, '');
  // Bound every request so callers with a fallback path (e.g. call setup)
  // degrade quickly instead of hanging on an unreachable worker.
  const REQUEST_TIMEOUT_MS = 8_000;

  async function request<T>(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<T> {
    const token = await options.getToken();
    if (!token) throw new Error('not authenticated');

    const res = await fetch(`${base}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      if (res.status === 401) {
        reportApiAuthFailure(`data:${method} ${path}`, res.status, detail);
      }
      const err = new Error(
        `data worker ${method} ${path} -> ${res.status} ${detail}`,
      ) as Error & { status?: number };
      err.status = res.status;
      throw err;
    }
    return res.json() as Promise<T>;
  }

  return {
    async resolveDirect(otherUserId) {
      const { conversationId } = await request<{ conversationId: string }>(
        'POST',
        '/conversations/resolve-direct',
        { otherUserId },
      );
      return conversationId;
    },
    list() {
      return request<{
        conversations: Array<Conversation & { members: ConversationMember[] }>;
      }>('GET', '/conversations').then((r) => r.conversations);
    },
    get(conversationId) {
      return request(
        'GET',
        `/conversations/${encodeURIComponent(conversationId)}`,
      );
    },
    me() {
      return request<{ userId: string }>('GET', '/me');
    },
    loadMessages(conversationId) {
      return request<{ messages: WireMessage[] }>(
        'GET',
        `/conversations/${encodeURIComponent(conversationId)}/messages`,
      ).then((r) => r.messages);
    },
    sendMessage(conversationId, input) {
      return request<{ message: WireMessage }>(
        'POST',
        `/conversations/${encodeURIComponent(conversationId)}/messages`,
        input,
      ).then((r) => r.message);
    },
    setMyReaction(conversationId, messageId, reactionKey) {
      return request<{
        messageId: string;
        reactions: WireReactionSummary[];
      }>(
        'PUT',
        `/conversations/${encodeURIComponent(conversationId)}/messages/${encodeURIComponent(messageId)}/reaction`,
        { reactionKey },
      ).then((r) => r.reactions);
    },
    markRead(conversationId) {
      return request<{ lastReadAt: number }>(
        'PUT',
        `/conversations/${encodeURIComponent(conversationId)}/read`,
      ).then((r) => r.lastReadAt);
    },
  };
}
