import { DurableObject } from 'cloudflare:workers';
import type { MailboxEnvelope } from '../../../shared/call-mailbox/protocol';
import type { Env } from './index';

/**
 * One instance per userId (keyed via getByName). Broadcast-only fan-out across
 * that user's connected sockets (multiple tabs/devices). The worker authenticates
 * the upgrade (you can only open your OWN mailbox) and authorizes each delivery
 * against D1 conversation membership before calling `deliver`, so the DO holds no
 * authoritative state — an idle mailbox hibernates and evicts.
 *
 * Minimal core: no pending-invite retention. A callee whose socket is connected
 * receives the invite immediately; reconnect-race retention is a deferred
 * refinement (see SLICE_B_CALL_INVITE_MAILBOX.md).
 *
 * ## RPC contract (worker → DO)
 * The worker calls `deliver(envelope)` after authorizing the sender. The DO fans
 * the envelope to all of this user's connected sockets — no re-authentication or
 * payload validation, as the worker is the trusted authority in the same process.
 */
export class UserMailbox extends DurableObject<Env> {
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
    if (
      (request.headers.get('Sec-WebSocket-Protocol') ?? '').includes('bearer')
    ) {
      headers['Sec-WebSocket-Protocol'] = 'bearer';
    }
    return new Response(null, { status: 101, webSocket: client, headers });
  }

  /** Clients are receive-only; ignore anything they send. */
  async webSocketMessage(): Promise<void> {}

  async webSocketClose(): Promise<void> {}

  async webSocketError(): Promise<void> {}

  /** Fan an envelope out to every connected socket of this user. */
  deliver(envelope: MailboxEnvelope): void {
    const payload = JSON.stringify(envelope);
    for (const ws of this.ctx.getWebSockets()) {
      try {
        ws.send(payload);
      } catch {
        // Socket closing; hibernation/eviction handles cleanup.
      }
    }
  }
}
