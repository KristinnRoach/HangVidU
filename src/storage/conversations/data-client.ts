// HTTPS client for the `workers/data` persistence worker (D1 conversation core).
// Boundary-clean: storage may not import `auth`, so the bearer token is injected
// via a `getToken` provider supplied by the wiring layer.

export interface ConversationMember {
  user_id: string;
  display_name: string | null;
  role: string;
  status: string;
  joined_at: number;
  last_read_at: number;
}

export interface Conversation {
  id: string;
  kind: 'direct' | 'group';
  dm_key: string | null;
  title: string | null;
  created_at: number;
  updated_at: number;
}

/** emoji -> userId -> true (matches messaging-next ReactionMap). */
export type ReactionMap = Record<string, Record<string, true>>;

export interface MessageRecord {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string | null;
  kind: string;
  body: string | null;
  created_at: number;
  reactions: ReactionMap;
}

export interface ConversationActivity {
  latestSentAt: number;
  latestSenderId: string | null;
  lastReadAt: number;
}

/** A conversation as returned by `list()`: members + activity for the caller. */
export type ConversationListEntry = Conversation & {
  members: ConversationMember[];
  activity: ConversationActivity;
};

export interface ConversationsClient {
  resolveDirect(otherUserId: string): Promise<string>;
  list(): Promise<ConversationListEntry[]>;
  get(
    conversationId: string,
  ): Promise<{ conversation: Conversation; members: ConversationMember[] }>;
  me(): Promise<{ userId: string }>;

  // Messages
  loadMessages(
    conversationId: string,
    limit?: number,
  ): Promise<MessageRecord[]>;
  sendMessage(
    conversationId: string,
    body: string,
    kind?: string,
  ): Promise<{ id: string; sentAt: number }>;
  markRead(conversationId: string): Promise<void>;
  activity(conversationId: string): Promise<ConversationActivity>;
  setReaction(
    conversationId: string,
    messageId: string,
    emoji: string,
    active: boolean,
  ): Promise<void>;
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
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new Error(`data worker ${method} ${path} -> ${res.status} ${detail}`);
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
      return request<{ conversations: ConversationListEntry[] }>(
        'GET',
        '/conversations',
      ).then((r) => r.conversations);
    },
    get(conversationId) {
      return request('GET', `/conversations/${encodeURIComponent(conversationId)}`);
    },
    me() {
      return request<{ userId: string }>('GET', '/me');
    },

    loadMessages(conversationId, limit) {
      const q = limit ? `?limit=${limit}` : '';
      return request<{ messages: MessageRecord[] }>(
        'GET',
        `/conversations/${encodeURIComponent(conversationId)}/messages${q}`,
      ).then((r) => r.messages);
    },
    sendMessage(conversationId, body, kind = 'text') {
      return request<{ id: string; sentAt: number }>(
        'POST',
        `/conversations/${encodeURIComponent(conversationId)}/messages`,
        { kind, body },
      );
    },
    async markRead(conversationId) {
      await request(
        'POST',
        `/conversations/${encodeURIComponent(conversationId)}/read`,
      );
    },
    activity(conversationId) {
      return request<ConversationActivity>(
        'GET',
        `/conversations/${encodeURIComponent(conversationId)}/activity`,
      );
    },
    async setReaction(conversationId, messageId, emoji, active) {
      await request(
        'POST',
        `/conversations/${encodeURIComponent(conversationId)}/messages/${encodeURIComponent(messageId)}/reactions`,
        { emoji, active },
      );
    },
  };
}
