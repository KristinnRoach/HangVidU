import { DurableObject } from 'cloudflare:workers';
import type {
  MailboxEnvelope,
  MailboxInvite,
} from '../../../shared/call-mailbox/protocol';
import type { Env } from './index';

const PENDING_INVITE_KEY = 'pendingInvite';

/**
 * One instance per userId (keyed via getByName). Broadcast-only fan-out across
 * that user's connected sockets (multiple tabs/devices). The worker authenticates
 * the upgrade (you can only open your OWN mailbox) and authorizes each delivery
 * against D1 conversation membership before calling `deliver`.
 *
 * Keeps one pending invite with its TTL so opening, refreshing, or reconnecting
 * the app while the caller is still ringing resurfaces the incoming-call dialog.
 * This deliberately is not a queue/history model; a new invite replaces the old
 * one, and cancel/response clear the matching pending invite.
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
    const pendingInvite = await this.getFreshPendingInvite();
    if (pendingInvite) {
      server.send(
        JSON.stringify({
          t: 'invite',
          invite: pendingInvite,
        } satisfies MailboxEnvelope),
      );
    }

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
  async deliver(envelope: MailboxEnvelope): Promise<void> {
    if (envelope.t === 'invite') {
      await this.storePendingInvite(envelope.invite);
    } else if (envelope.t === 'cancel') {
      await this.clearPendingInvite(envelope.roomId);
    }

    const payload = JSON.stringify(envelope);
    for (const ws of this.ctx.getWebSockets()) {
      try {
        ws.send(payload);
      } catch {
        // Socket closing; hibernation/eviction handles cleanup.
      }
    }
  }

  async clearPendingInvite(roomId: string): Promise<void> {
    const pending = await this.ctx.storage.get<MailboxInvite>(
      PENDING_INVITE_KEY,
    );
    if (pending?.roomId === roomId) {
      await this.ctx.storage.delete(PENDING_INVITE_KEY);
    }
  }

  private async storePendingInvite(invite: MailboxInvite): Promise<void> {
    if (invite.expiresAt != null && invite.expiresAt <= Date.now()) {
      await this.ctx.storage.delete(PENDING_INVITE_KEY);
      return;
    }
    await this.ctx.storage.put(PENDING_INVITE_KEY, invite);
  }

  private async getFreshPendingInvite(): Promise<MailboxInvite | null> {
    const pending = await this.ctx.storage.get<MailboxInvite>(
      PENDING_INVITE_KEY,
    );
    if (!pending) return null;
    if (pending.expiresAt != null && pending.expiresAt <= Date.now()) {
      await this.ctx.storage.delete(PENDING_INVITE_KEY);
      return null;
    }
    return pending;
  }
}
