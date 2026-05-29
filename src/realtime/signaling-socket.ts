import type { ClientMessage, ServerMessage } from './protocol';

/**
 * Thin reconnecting WebSocket client to the signaling worker. Transport only —
 * it knows nothing about rooms, peers, SDP, or ICE. Outgoing messages are
 * queued until the socket is open; consumers re-establish room state via the
 * `onOpen` hook (fired on every (re)connect).
 */
export interface SignalingSocket {
  send(message: ClientMessage): void;
  onMessage(handler: (message: ServerMessage) => void): () => void;
  onOpen(handler: () => void): () => void;
  close(): void;
}

export interface SignalingSocketOptions {
  url: string;
  /**
   * Resolves the WebSocket subprotocols for each (re)connect — e.g.
   * `['bearer', <freshIdToken>]`. Called per connection so auth can refresh.
   */
  getProtocols?: () => Promise<string[]> | string[];
  maxBackoffMs?: number;
}

export function createSignalingSocket(
  options: SignalingSocketOptions,
): SignalingSocket {
  const maxBackoff = options.maxBackoffMs ?? 10_000;
  const messageHandlers = new Set<(m: ServerMessage) => void>();
  const openHandlers = new Set<() => void>();
  const sendQueue: string[] = [];

  let ws: WebSocket | null = null;
  let closed = false;
  let backoff = 500;
  let reconnectTimer: ReturnType<typeof setTimeout> | undefined;

  async function connect(): Promise<void> {
    if (closed) return;
    let protocols: string[] = [];
    try {
      protocols = (await options.getProtocols?.()) ?? [];
    } catch (error) {
      console.warn('[signaling] failed to resolve protocols:', error);
      scheduleReconnect();
      return;
    }
    if (closed) return;

    const socket = new WebSocket(options.url, protocols);
    ws = socket;

    socket.addEventListener('open', () => {
      backoff = 500;
      for (const data of sendQueue.splice(0)) socket.send(data);
      openHandlers.forEach((h) => h());
    });
    socket.addEventListener('message', (event) => {
      let message: ServerMessage;
      try {
        message = JSON.parse(event.data as string) as ServerMessage;
      } catch {
        return;
      }
      messageHandlers.forEach((h) => h(message));
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
    send(message) {
      const data = JSON.stringify(message);
      if (ws && ws.readyState === WebSocket.OPEN) ws.send(data);
      else sendQueue.push(data);
    },
    onMessage(handler) {
      messageHandlers.add(handler);
      return () => messageHandlers.delete(handler);
    },
    onOpen(handler) {
      openHandlers.add(handler);
      return () => openHandlers.delete(handler);
    },
    close() {
      closed = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      sendQueue.length = 0;
      messageHandlers.clear();
      openHandlers.clear();
      ws?.close();
      ws = null;
    },
  };
}
