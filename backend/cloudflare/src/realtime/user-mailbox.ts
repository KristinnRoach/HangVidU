import { DurableObject } from 'cloudflare:workers';
import type {
  MailboxEnvelope,
  MailboxInvite,
  MailboxResponse,
} from '../../../../shared/user-mailbox/protocol';

// One stored key per pending invite, keyed by roomId (= conversationId). Using a
// key per invite (rather than one blob) lets concurrent deliver() calls from
// different callers each write their own key without a read-modify-write race,
// and makes a re-invite to the same room a natural overwrite.
const PENDING_INVITE_PREFIX = 'invite:';
const inviteKey = (roomId: string): string => PENDING_INVITE_PREFIX + roomId;
const PENDING_RESPONSE_PREFIX = 'response:';
const responseKey = (roomId: string): string =>
  PENDING_RESPONSE_PREFIX + roomId;

/**
 * One instance per userId (keyed via getByName). Broadcast-only fan-out across
 * that user's connected sockets (multiple tabs/devices). The worker authenticates
 * the upgrade (you can only open your OWN mailbox) and authorizes each delivery
 * against D1 conversation membership before calling `deliver`.
 *
 * Keeps the set of currently-pending invites (one per room) with their TTLs, so
 * opening, refreshing, or reconnecting the app while a caller is still ringing
 * resurfaces every incoming-call dialog. This is not a queue/history model: a new
 * invite for a room replaces that room's pending invite, and cancel/response
 * clear the matching one. Accepted responses are retained until acknowledged.
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
    for (const invite of await this.getFreshPendingInvites()) {
      server.send(
        JSON.stringify({
          t: 'invite',
          invite,
        } satisfies MailboxEnvelope),
      );
    }
    for (const response of await this.getFreshPendingResponses()) {
      server.send(
        JSON.stringify({ t: 'response', response } satisfies MailboxEnvelope),
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
    } else if (
      envelope.t === 'response' &&
      envelope.response.responseType === 'accepted'
    ) {
      await this.ctx.storage.put(
        responseKey(envelope.response.roomId),
        envelope.response,
      );
    }

    this.broadcast(envelope);
  }

  async handlePendingCallInvite(
    roomId: string,
    callInviteId: string | undefined,
    callerId: string,
    by: string,
  ): Promise<MailboxInvite | null> {
    const invite = await this.takePendingCallInvite(
      roomId,
      callInviteId,
      callerId,
    );
    if (!invite) return null;
    this.broadcast({
      t: 'handled',
      callInviteId: invite.callInviteId,
      roomId,
      by,
    });
    return invite;
  }

  async cancelPendingCallInvite(
    roomId: string,
    callInviteId: string | undefined,
    callerId: string,
  ): Promise<void> {
    const invite = await this.takePendingCallInvite(
      roomId,
      callInviteId,
      callerId,
    );
    if (!invite) return;
    this.broadcast({
      t: 'cancel',
      callInviteId: invite.callInviteId,
      roomId,
      by: callerId,
    });
  }

  async hasPendingAcceptedResponse(
    roomId: string,
    callInviteId: string | undefined,
    calleeId: string,
  ): Promise<boolean> {
    const response = await this.ctx.storage.get<MailboxResponse>(
      responseKey(roomId),
    );
    return (
      response?.responseType === 'accepted' &&
      response.by === calleeId &&
      (callInviteId == null || response.callInviteId === callInviteId) &&
      (response.expiresAt == null || response.expiresAt > Date.now())
    );
  }

  private broadcast(envelope: MailboxEnvelope): void {
    const payload = JSON.stringify(envelope);
    for (const ws of this.ctx.getWebSockets()) {
      try {
        ws.send(payload);
      } catch {
        // Socket closing; hibernation/eviction handles cleanup.
      }
    }
  }

  async clearPendingResponse(
    roomId: string,
    callInviteId?: string,
  ): Promise<void> {
    const key = responseKey(roomId);
    if (callInviteId == null) {
      await this.ctx.storage.delete(key);
      return;
    }
    await this.ctx.storage.transaction(async (storage) => {
      const response = await storage.get<MailboxResponse>(key);
      if (response?.callInviteId !== callInviteId) return;
      await storage.delete(key);
    });
  }

  private async storePendingInvite(invite: MailboxInvite): Promise<void> {
    const key = inviteKey(invite.roomId);
    if (invite.expiresAt != null && invite.expiresAt <= Date.now()) {
      await this.ctx.storage.delete(key);
      return;
    }
    await this.ctx.storage.put(key, invite);
  }

  private async takePendingCallInvite(
    roomId: string,
    callInviteId: string | undefined,
    callerId: string,
  ): Promise<MailboxInvite | null> {
    const key = inviteKey(roomId);
    return this.ctx.storage.transaction(async (storage) => {
      const invite = await storage.get<MailboxInvite>(key);
      if (
        !invite ||
        invite.callerId !== callerId ||
        (callInviteId != null && invite.callInviteId !== callInviteId)
      )
        return null;
      if (invite.expiresAt != null && invite.expiresAt <= Date.now()) {
        await storage.delete(key);
        return null;
      }
      await storage.delete(key);
      return invite;
    });
  }

  /** All non-expired pending invites; sweeps any expired keys it encounters. */
  private async getFreshPendingInvites(): Promise<MailboxInvite[]> {
    const stored = await this.ctx.storage.list<MailboxInvite>({
      prefix: PENDING_INVITE_PREFIX,
    });
    const now = Date.now();
    const fresh: MailboxInvite[] = [];
    const expiredKeys: string[] = [];
    for (const [key, invite] of stored) {
      if (invite.expiresAt != null && invite.expiresAt <= now) {
        expiredKeys.push(key);
      } else {
        fresh.push(invite);
      }
    }
    if (expiredKeys.length) await this.ctx.storage.delete(expiredKeys);
    return fresh;
  }

  private async getFreshPendingResponses(): Promise<MailboxResponse[]> {
    const stored = await this.ctx.storage.list<MailboxResponse>({
      prefix: PENDING_RESPONSE_PREFIX,
    });
    const now = Date.now();
    const fresh: MailboxResponse[] = [];
    const expiredKeys: string[] = [];
    for (const [key, response] of stored) {
      if (response.expiresAt != null && response.expiresAt <= now)
        expiredKeys.push(key);
      else fresh.push(response);
    }
    if (expiredKeys.length) await this.ctx.storage.delete(expiredKeys);
    return fresh;
  }
}
