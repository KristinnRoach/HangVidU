// Receive-only live channel for the logged-in user's own call-invite mailbox.
// Connects to the data worker's `GET /users/me/mailbox/ws` Durable Object
// endpoint and emits each delivered envelope. Reconnects with backoff (mirrors
// conversation-channel); auth rides in the WebSocket subprotocol since browsers
// can't set headers on the handshake. Transport only — it validates the envelope
// shape but does not interpret it.

import {
  isMailboxEnvelope,
  type MailboxEnvelope,
} from '../../shared/user-mailbox/protocol';
import { buildHangViduWebSocketUrl } from '../infra/hangvidu-api-url';
import { subscribeToWakeSignals } from './wake-signals';

export interface MailboxChannelOptions {
  /** Data worker base URL, e.g. https://localhost:8788 (http(s) → ws(s)). */
  baseUrl: string;
  /** Fresh bearer token per (re)connect, or null if logged out. */
  getToken: () => Promise<string | null>;
  maxBackoffMs?: number;
}

export interface MailboxChannel {
  onEnvelope(handler: (envelope: MailboxEnvelope) => void): () => void;
  close(): void;
}

function toWsUrl(baseUrl: string): string {
  return buildHangViduWebSocketUrl('/users/me/mailbox/ws', baseUrl);
}

export function createMailboxChannel(
  options: MailboxChannelOptions,
): MailboxChannel {
  const url = toWsUrl(options.baseUrl);
  const maxBackoff = options.maxBackoffMs ?? 10_000;
  const handlers = new Set<(e: MailboxEnvelope) => void>();

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
      console.warn('[mailbox-channel] token resolve failed:', error);
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
      if (!isMailboxEnvelope(parsed)) return;
      handlers.forEach((h) => h(parsed));
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

  // Foreground/online: if we're sitting out a backoff wait, reconnect now.
  // Only fires mid-wait — an existing socket (even a dying one) is left alone;
  // its close event re-enters scheduleReconnect with the reset backoff.
  const unsubscribeWake = subscribeToWakeSignals(() => {
    if (closed || !reconnectTimer) return;
    clearTimeout(reconnectTimer);
    reconnectTimer = undefined;
    backoff = 500;
    void connect();
  });

  void connect();

  return {
    onEnvelope(handler) {
      handlers.add(handler);
      return () => handlers.delete(handler);
    },
    close() {
      closed = true;
      unsubscribeWake();
      if (reconnectTimer) clearTimeout(reconnectTimer);
      handlers.clear();
      ws?.close();
      ws = null;
    },
  };
}
