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

export interface ConversationsClient {
  resolveDirect(otherUserId: string): Promise<string>;
  list(): Promise<(Conversation & { members: ConversationMember[] })[]>;
  get(
    conversationId: string,
  ): Promise<{ conversation: Conversation; members: ConversationMember[] }>;
  me(): Promise<{ userId: string }>;
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
      return request<{
        conversations: (Conversation & { members: ConversationMember[] })[];
      }>('GET', '/conversations').then((r) => r.conversations);
    },
    get(conversationId) {
      return request('GET', `/conversations/${encodeURIComponent(conversationId)}`);
    },
    me() {
      return request<{ userId: string }>('GET', '/me');
    },
  };
}
