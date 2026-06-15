import { DurableObject } from 'cloudflare:workers';
import type { ConversationServerEvent } from '../../../shared/conversation-channel/protocol';
import type { Env } from './index';

/**
 * One instance per conversationId (keyed via getByName). Broadcast-only fan-out:
 * the worker authenticates the upgrade and verifies D1 membership before
 * forwarding here, so every connected socket is an authorized member. The DO
 * holds no authoritative state — persistence stays in D1; an idle channel
 * hibernates and evicts.
 *
 * `broadcast()` is an RPC method the worker calls after a successful write.
 */
export class ConversationChannel extends DurableObject<Env> {
  async fetch(request: Request): Promise<Response> {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket upgrade', { status: 426 });
    }

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];
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

  /** Fan an event out to every connected member. Called by the worker (RPC). */
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
