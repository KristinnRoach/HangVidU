import { DurableObject } from 'cloudflare:workers';
import {
  isClientMessage,
  type ClientMessage,
  type PeerId,
  type PresenceData,
  type PresenceMember,
  type ServerMessage,
} from '../../../../shared/signaling/protocol';

/** Survives hibernation via ws.serializeAttachment(). */
interface SocketState {
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

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket upgrade', { status: 426 });
    }

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];

    // Accept first, then attach state (serializeAttachment requires an
    // already-accepted hibernatable socket). peerId is unknown until `join`.
    this.ctx.acceptWebSocket(server);
    this.setSocketState(server, { peerId: null });

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

    const message = parsed as ClientMessage;
    switch (message.t) {
      case 'join':
        this.replaceExistingPeerSocket(ws, message.peerId);
        this.setSocketState(ws, {
          peerId: message.peerId,
          data: message.data,
          joinedAt: this.nextJoinOrder(),
        });
        this.broadcastPeers();
        return;
      case 'leave':
        this.clearPeerPresence(this.getSocketState(ws).peerId);
        this.broadcastPeers();
        return;
      case 'presence': {
        // Update self-asserted presence data; ignore until joined (no identity
        // to attach it to). Re-broadcast so a data-only change (e.g. mute
        // toggle) reaches every member, including the sender.
        const { peerId } = this.getSocketState(ws);
        if (!peerId) return this.sendError(ws, 'join before setting presence');
        this.setSocketState(ws, {
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
    this.clearPeerPresence(this.getSocketState(ws).peerId);
    this.broadcastPeers();
  }

  async webSocketError(ws: WebSocket): Promise<void> {
    this.clearPeerPresence(this.getSocketState(ws).peerId);
    this.broadcastPeers();
  }

  // --- internals ---

  private relay(
    from: WebSocket,
    to: PeerId,
    channel: 'sdp' | 'ice',
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

  private broadcastPeers(): void {
    const payload: ServerMessage = {
      t: 'peers',
      peers: this.presenceMembers(),
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

  private replaceExistingPeerSocket(current: WebSocket, peerId: PeerId): void {
    for (const ws of this.ctx.getWebSockets()) {
      if (ws === current) continue;
      if (this.getSocketState(ws).peerId !== peerId) continue;
      this.setSocketState(ws, { peerId: null });
      try {
        ws.close(4000, 'replaced by newer connection');
      } catch {
        // Socket is already closing; clearing attachment above is enough to
        // keep subsequent relay routing away from the stale connection.
      }
    }
  }

  private clearPeerPresence(peerId: PeerId | null): void {
    if (!peerId) return;
    for (const ws of this.ctx.getWebSockets()) {
      if (this.getSocketState(ws).peerId === peerId) {
        this.setSocketState(ws, { peerId: null });
      }
    }
  }

  private send(ws: WebSocket, message: ServerMessage): void {
    try {
      ws.send(JSON.stringify(message));
    } catch {
      // Socket closing; presence rebroadcast on close handles cleanup.
    }
  }

  private sendError(ws: WebSocket, message: string): void {
    this.send(ws, { t: 'error', message });
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
