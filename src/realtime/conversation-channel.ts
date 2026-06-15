// Receive-only live-push channel for one conversation. Connects to the data
// worker's `GET /conversations/:id/ws` Durable Object endpoint and emits each
// broadcast message. Reconnects with backoff (mirrors signaling-socket); auth
// rides in the WebSocket subprotocol since browsers can't set headers on the
// handshake. Transport only — it does not interpret messages beyond validation.

import {
  isConversationServerEvent,
  type WireMessage,
} from './conversation-protocol';

export interface ConversationChannelOptions {
  /** Data worker base URL, e.g. http://localhost:8788 (http(s) → ws(s)). */
  baseUrl: string;
  conversationId: string;
  /** Fresh bearer token per (re)connect, or null if logged out. */
  getToken: () => Promise<string | null>;
  maxBackoffMs?: number;
}

export interface ConversationChannel {
  onMessage(handler: (message: WireMessage) => void): () => void;
  close(): void;
}

function toWsUrl(baseUrl: string, conversationId: string): string {
  const base = baseUrl.replace(/\/$/, '').replace(/^http/, 'ws');
  return `${base}/conversations/${encodeURIComponent(conversationId)}/ws`;
}

export function createConversationChannel(
  options: ConversationChannelOptions,
): ConversationChannel {
  const url = toWsUrl(options.baseUrl, options.conversationId);
  const maxBackoff = options.maxBackoffMs ?? 10_000;
  const handlers = new Set<(m: WireMessage) => void>();

  let ws: WebSocket | null = null;
  let closed = false;
  let backoff = 500;
  let reconnectTimer: ReturnType<typeof setTimeout> | undefined;

  async function connect(): Promise<void> {
    if (closed) return;
    let token: string | null = null;
    try {
      token = await options.getToken();
    } catch (error) {
      console.warn('[conversation-channel] token resolve failed:', error);
    }
    if (closed) return;
    if (!token) {
      scheduleReconnect();
      return;
    }

    const socket = new WebSocket(url, ['bearer', token]);
    ws = socket;

    socket.addEventListener('open', () => {
      backoff = 500;
    });
    socket.addEventListener('message', (event) => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(event.data as string);
      } catch {
        return;
      }
      if (!isConversationServerEvent(parsed)) return;
      handlers.forEach((h) => h(parsed.message));
    });
    socket.addEventListener('close', () => {
      if (ws === socket) ws = null;
      scheduleReconnect();
    });
    socket.addEventListener('error', () => socket.close());
  }

  function scheduleReconnect(): void {
    if (closed || reconnectTimer) return;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = undefined;
      void connect();
    }, backoff);
    backoff = Math.min(backoff * 2, maxBackoff);
  }

  void connect();

  return {
    onMessage(handler) {
      handlers.add(handler);
      return () => handlers.delete(handler);
    },
    close() {
      closed = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      handlers.clear();
      ws?.close();
      ws = null;
    },
  };
}
