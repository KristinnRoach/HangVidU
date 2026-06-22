import { DurableObject } from 'cloudflare:workers';
import type { ConversationServerEvent } from '../../../../shared/conversation-channel/protocol';

/**
 * One instance per conversationId (keyed via getByName). Broadcast-only fan-out:
 * the worker authenticates the upgrade and verifies D1 membership before
 * forwarding here, so every connected socket is an authorized member. The DO
 * holds no authoritative state — persistence stays in D1; an idle channel
 * hibernates and evicts.
 *
 * ## RPC contract (worker → DO notification)
 *
 * The worker calls `broadcast(event)` after a successful write (message/reaction/read).
 * The DO fans the event to all connected WebSockets — no re-authentication or payload
 * validation, as the worker is the trusted authority within the same process.
 *
 * ## Broadcast scope
 *
 * All connected sockets receive all events, including the sender. The client deduplicates
 * messages against its optimistic local state using the server-allocated id. Optional
 * origin filtering (skip echoing to the originating socket) is NOT implemented — if
 * needed later, the worker can pass an `originSocketId` in the event envelope and this
 * DO can tag sockets with connection metadata (`acceptWebSocket(ws, tags)`) to filter
 * the broadcast.
 */
export class ConversationChannel extends DurableObject<Env> {
  async fetch(request: Request): Promise<Response> {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket upgrade', { status: 426 });
    }

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];
    // Accept the socket with no tags (no per-connection metadata needed yet).
    // Future: to support origin filtering, pass tags here and check in broadcast().
    this.ctx.acceptWebSocket(server);

    // Echo the auth subprotocol; browsers abort the handshake if the server
    // does not confirm one of the offered subprotocols.
    const headers: HeadersInit = {};
    if ((request.headers.get('Sec-WebSocket-Protocol') ?? '').includes('bearer')) {
      headers['Sec-WebSocket-Protocol'] = 'bearer';
    }
    return new Response(null, { status: 101, webSocket: client, headers });
  }

  /** Clients are receive-only; ignore anything they send. */
  async webSocketMessage(): Promise<void> {}

  webSocketClose(
    ws: WebSocket,
    code: number,
    reason: string,
    _wasClean: boolean,
  ): void | Promise<void> {
    if (code === 1005) ws.close();
    else ws.close(code, reason);
  }

  /**
   * Fan an event out to every connected member. Called by the worker (RPC) after
   * a successful write. Broadcasts to all sockets — no origin filtering (see class
   * doc for rationale).
   */
  broadcast(event: ConversationServerEvent): void {
    const payload = JSON.stringify(event);
    for (const ws of this.ctx.getWebSockets()) {
      try {
        ws.send(payload);
      } catch {
        // Socket closing; hibernation/eviction handles cleanup.
      }
    }
  }
}
