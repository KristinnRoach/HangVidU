import {
  REPLACED_CLOSE_CODE,
  type ClientMessage,
  type ServerMessage,
} from './protocol';
import { isBrowserOffline, subscribeToWakeSignals } from './wake-signals';

/**
 * Thin reconnecting WebSocket client to the signaling worker. Transport only —
 * it knows nothing about rooms, peers, SDP, or ICE. Outgoing messages are
 * queued until the socket is open; consumers re-establish room state via the
 * `onOpen` hook (fired on every (re)connect, before queued sends are flushed).
 */
export interface SignalingSocket {
  send(message: ClientMessage): void;
  isOpen(): boolean;
  /** Drops queued sends, optionally only those matching `match`. */
  clearQueue(match?: (message: ClientMessage) => boolean): void;
  onMessage(handler: (message: ServerMessage) => void): () => void;
  onOpen(handler: () => void): () => void;
  /** The server handed this socket's role to a newer connection. The socket
   * stays closed; reconnecting would displace that connection in turn. */
  onReplaced(handler: () => void): () => void;
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
  const replacedHandlers = new Set<() => void>();
  const sendQueue: ClientMessage[] = [];

  let ws: WebSocket | null = null;
  let closed = false;
  let waitingForOnline = false;
  let backoff = 500;
  let reconnectTimer: ReturnType<typeof setTimeout> | undefined;

  async function connect(): Promise<void> {
    if (closed) return;
    if (isBrowserOffline()) {
      waitingForOnline = true;
      return;
    }
    waitingForOnline = false;
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
      openHandlers.forEach((h) => h());
      for (const message of sendQueue.splice(0))
        socket.send(JSON.stringify(message));
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
    socket.addEventListener('close', (event) => {
      if (ws === socket) ws = null;
      if (event.code === REPLACED_CLOSE_CODE) {
        replacedHandlers.forEach((h) => h());
        close();
        return;
      }
      scheduleReconnect();
    });
    socket.addEventListener('error', () => socket.close());
  }

  function scheduleReconnect(): void {
    if (closed || reconnectTimer) return;
    if (isBrowserOffline()) {
      waitingForOnline = true;
      return;
    }
    waitingForOnline = false;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = undefined;
      void connect();
    }, backoff);
    backoff = Math.min(backoff * 2, maxBackoff);
  }

  // Foreground/online: if we're sitting out a backoff wait (or paused while
  // offline), reconnect now. Only fires mid-wait — an existing socket (even a
  // dying one) is left alone; its close event re-enters scheduleReconnect.
  const unsubscribeWake = subscribeToWakeSignals(() => {
    if (closed || (!reconnectTimer && !waitingForOnline) || isBrowserOffline())
      return;
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = undefined;
    }
    waitingForOnline = false;
    backoff = 500;
    void connect();
  });

  function close(): void {
    if (closed) return;
    closed = true;
    unsubscribeWake();
    if (reconnectTimer) clearTimeout(reconnectTimer);
    sendQueue.length = 0;
    messageHandlers.clear();
    openHandlers.clear();
    replacedHandlers.clear();
    ws?.close();
    ws = null;
  }

  void connect();

  return {
    send(message) {
      if (ws && ws.readyState === WebSocket.OPEN)
        ws.send(JSON.stringify(message));
      else sendQueue.push(message);
    },
    isOpen: () => ws?.readyState === WebSocket.OPEN,
    clearQueue(match = () => true) {
      const kept = sendQueue.filter((message) => !match(message));
      sendQueue.splice(0, sendQueue.length, ...kept);
    },
    onMessage(handler) {
      messageHandlers.add(handler);
      return () => messageHandlers.delete(handler);
    },
    onOpen(handler) {
      openHandlers.add(handler);
      return () => openHandlers.delete(handler);
    },
    onReplaced(handler) {
      replacedHandlers.add(handler);
      return () => replacedHandlers.delete(handler);
    },
    close,
  };
}
