import { DurableObject } from 'cloudflare:workers';
import {
  isClientMessage,
  type ClientMessage,
  type PeerId,
  type PresenceData,
  type PresenceMember,
  type RelayChannel,
  type ServerMessage,
} from '../../../../shared/signaling/protocol';

/** Survives hibernation via ws.serializeAttachment(). */
interface SocketState {
  ownerUid?: string;
  peerId: PeerId | null;
  data?: PresenceData;
  joinedAt?: number;
}

/**
 * One instance per room (keyed by roomId). A dumb relay:
 *   - tracks presence (joined peers + their self-asserted presence data)
 *   - forwards `relay` messages to the addressed peer
 * It never inspects SDP/ICE contents, and treats presence `data` as opaque.
 * State is derived from the live socket set, so nothing is persisted — an empty
 * room simply hibernates and evicts.
 */
export class SignalingRoom extends DurableObject<Env> {
  private joinSequence = 0;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    // Hibernating sockets can survive a code upgrade. Retire legacy sockets
    // before any snapshot, routing lookup or ownership check can trust them.
    let removedLegacyPeer = false;
    for (const ws of this.ctx.getWebSockets()) {
      if (this.getSocketState(ws).ownerUid) continue;
      removedLegacyPeer = this.clearSocketPresence(ws) || removedLegacyPeer;
      ws.close(4001, 'reconnect to authenticate');
    }
    if (removedLegacyPeer) this.broadcastPeers();
  }

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket upgrade', { status: 426 });
    }

    const ownerUid = request.headers.get('X-Hangvidu-Signaling-Uid');
    if (!ownerUid) return new Response('Unauthorized', { status: 401 });

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];

    // Accept first, then attach state (serializeAttachment requires an
    // already-accepted hibernatable socket). peerId is unknown until `join`.
    this.ctx.acceptWebSocket(server);
    this.setSocketState(server, { ownerUid, peerId: null });

    // Presence snapshot on connect. The P2PRoomSignaling contract requires
    // watchers (connected, not joined) to know current occupancy — the client
    // room checks capacity against it before and after joining.
    this.send(server, { t: 'peers', peers: this.presenceMembers() });

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

  async webSocketMessage(
    ws: WebSocket,
    raw: string | ArrayBuffer,
  ): Promise<void> {
    let parsed: unknown;
    try {
      parsed = JSON.parse(typeof raw === 'string' ? raw : '');
    } catch {
      return this.sendError(ws, 'invalid JSON');
    }
    if (!isClientMessage(parsed)) {
      return this.sendError(ws, 'unknown message');
    }

    const state = this.getSocketState(ws);
    // Pre-upgrade sockets have no verified owner. Do not infer one from an ID.
    if (!state.ownerUid) {
      this.setSocketState(ws, { peerId: null });
      ws.close(4001, 'reconnect to authenticate');
      return;
    }
    const message = parsed as ClientMessage;
    switch (message.t) {
      case 'join': {
        // Contact calls use the UID; guest tabs use UID:UUID. Check even when
        // the ID is vacant, so first registration cannot squat another UID.
        const suffix = message.peerId.slice(state.ownerUid.length + 1);
        const ownsId =
          message.peerId === state.ownerUid ||
          (message.peerId.startsWith(`${state.ownerUid}:`) &&
            /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
              suffix,
            ));
        if (!ownsId)
          return this.sendError(ws, 'unauthorized peerId', message.requestId);
        if (!this.replaceExistingPeerSocket(ws, message.peerId)) {
          return this.sendError(ws, 'peerId in use', message.requestId);
        }
        this.setSocketState(ws, {
          ownerUid: state.ownerUid,
          peerId: message.peerId,
          data: message.data,
          joinedAt: this.nextJoinOrder(),
        });
        this.broadcastPeers();
        this.send(ws, {
          t: 'joined',
          peerId: message.peerId,
          ...(message.requestId ? { requestId: message.requestId } : {}),
        });
        return;
      }
      case 'leave': {
        // Explicit leave: tag the departing peer as `left` on the same snapshot
        // where it drops out of presence, so the client can distinguish an
        // intentional hangup from a silent drop (socket close/error → dropped).
        const { peerId } = this.getSocketState(ws);
        this.clearPeerPresence(peerId);
        this.broadcastPeers(peerId ? [peerId] : undefined);
        return;
      }
      case 'presence': {
        // Update self-asserted presence data; ignore until joined (no identity
        // to attach it to). Re-broadcast so a data-only change (e.g. mute
        // toggle) reaches every member, including the sender.
        const { peerId } = this.getSocketState(ws);
        if (!peerId) return this.sendError(ws, 'join before setting presence');
        this.setSocketState(ws, {
          ownerUid: state.ownerUid,
          peerId,
          data: message.data,
          joinedAt: this.getSocketState(ws).joinedAt,
        });
        this.broadcastPeers();
        return;
      }
      case 'relay':
        return this.relay(ws, message.to, message.channel, message.data);
    }
  }

  async webSocketClose(ws: WebSocket): Promise<void> {
    if (this.clearSocketPresence(ws)) this.broadcastPeers();
  }

  async webSocketError(ws: WebSocket): Promise<void> {
    if (this.clearSocketPresence(ws)) this.broadcastPeers();
  }

  // --- internals ---

  private relay(
    from: WebSocket,
    to: PeerId,
    channel: RelayChannel,
    data: unknown,
  ): void {
    const fromPeerId = this.getSocketState(from).peerId;
    if (!fromPeerId) return this.sendError(from, 'join before relaying');

    const target = this.findSocket(to);
    if (!target) return; // peer not present; drop silently (ephemeral)

    this.send(target, {
      t: 'relay',
      from: fromPeerId,
      channel,
      data,
    });
  }

  private broadcastPeers(departed?: PeerId[]): void {
    const payload: ServerMessage = {
      t: 'peers',
      peers: this.presenceMembers(),
      ...(departed && departed.length ? { departed } : {}),
    };
    // All sockets, including watchers — see the connect-time snapshot note.
    for (const ws of this.ctx.getWebSockets()) {
      this.send(ws, payload);
    }
  }

  /** Joined peers with their presence data; the local peer is included (its own
   * socket is in getWebSockets()), so self mute toggles round-trip back. */
  private presenceMembers(): PresenceMember[] {
    const byPeerId = new Map<
      PeerId,
      { member: PresenceMember; joinedAt: number }
    >();
    for (const ws of this.ctx.getWebSockets()) {
      const { peerId, data, joinedAt = 0 } = this.getSocketState(ws);
      if (!peerId) continue;
      const existing = byPeerId.get(peerId);
      if (existing && existing.joinedAt > joinedAt) continue;
      byPeerId.set(peerId, {
        member: data ? { peerId, data } : { peerId },
        joinedAt,
      });
    }
    return [...byPeerId.values()].map(({ member }) => member);
  }

  private findSocket(peerId: PeerId): WebSocket | null {
    let target: WebSocket | null = null;
    let targetJoinedAt = -1;
    for (const ws of this.ctx.getWebSockets()) {
      const state = this.getSocketState(ws);
      if (state.peerId !== peerId) continue;
      const joinedAt = state.joinedAt ?? 0;
      if (target && targetJoinedAt > joinedAt) continue;
      target = ws;
      targetJoinedAt = joinedAt;
    }
    return target;
  }

  private replaceExistingPeerSocket(
    current: WebSocket,
    peerId: PeerId,
  ): boolean {
    const ownerUid = this.getSocketState(current).ownerUid;
    const existing = this.ctx
      .getWebSockets()
      .filter(
        (ws) => ws !== current && this.getSocketState(ws).peerId === peerId,
      );
    if (existing.some((ws) => this.getSocketState(ws).ownerUid !== ownerUid)) {
      return false;
    }
    for (const ws of existing) {
      this.clearSocketPresence(ws);
      try {
        ws.close(4000, 'replaced by newer connection');
      } catch {
        // Attachment is already detached from routing.
      }
    }
    return true;
  }

  private clearPeerPresence(peerId: PeerId | null): void {
    if (!peerId) return;
    for (const ws of this.ctx.getWebSockets()) {
      if (this.getSocketState(ws).peerId === peerId) {
        this.setSocketState(ws, {
          ownerUid: this.getSocketState(ws).ownerUid,
          peerId: null,
        });
      }
    }
  }

  /** Clear only this socket's ownership. A replaced socket has already been
   * detached and must not emit a stale presence snapshot when its delayed
   * close/error callback arrives. */
  private clearSocketPresence(ws: WebSocket): boolean {
    if (!this.getSocketState(ws).peerId) return false;
    this.setSocketState(ws, {
      ownerUid: this.getSocketState(ws).ownerUid,
      peerId: null,
    });
    return true;
  }

  private send(ws: WebSocket, message: ServerMessage): void {
    try {
      ws.send(JSON.stringify(message));
    } catch {
      // Socket closing; presence rebroadcast on close handles cleanup.
    }
  }

  private sendError(ws: WebSocket, message: string, requestId?: string): void {
    this.send(ws, { t: 'error', message, ...(requestId ? { requestId } : {}) });
  }

  private getSocketState(ws: WebSocket): SocketState {
    return (
      (ws.deserializeAttachment() as SocketState | null) ?? { peerId: null }
    );
  }

  private setSocketState(ws: WebSocket, state: SocketState): void {
    ws.serializeAttachment(state);
  }

  private nextJoinOrder(): number {
    this.joinSequence = (this.joinSequence + 1) % 1000;
    return Date.now() * 1000 + this.joinSequence;
  }
}
