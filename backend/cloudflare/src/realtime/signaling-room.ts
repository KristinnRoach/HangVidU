import { DurableObject } from 'cloudflare:workers';
import {
  isClientMessage,
  REPLACED_CLOSE_CODE,
  ROOM_FULL_ERROR,
  ROOM_MEMBER_LIMIT,
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

/** How long an explicit leave is replayed to sockets that connect afterwards. */
const DEPARTURE_REPLAY_MS = 30_000;
// Bound storage and snapshot size even under repeated guest-ID join/leave churn.
const MAX_RECENT_DEPARTURES = 256;
const DEPARTURES_KEY = 'recent-departures';
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Endpoints use `uid:uuid`, so the account is bound to the ID. A bare UID is
 * still accepted from clients that predate per-endpoint IDs. */
function ownsPeerId(ownerUid: string, peerId: PeerId): boolean {
  if (peerId === ownerUid) return true;
  const prefix = `${ownerUid}:`;
  return (
    peerId.startsWith(prefix) && UUID_PATTERN.test(peerId.slice(prefix.length))
  );
}

/**
 * One instance per room (keyed by roomId). A dumb relay:
 *   - admits up to ROOM_MEMBER_LIMIT accounts, one joined endpoint each
 *   - tracks presence (joined peers + their self-asserted presence data)
 *   - forwards `relay` messages to the addressed peer
 * It never inspects SDP/ICE contents, and treats presence `data` as opaque.
 * Presence is derived from live sockets. Only recent explicit departures are
 * persisted, so a reconnect can distinguish a missed hangup from a drop.
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
    // Earlier releases let an account join from several endpoints. Keep its
    // newest one, as a fresh join would.
    const owners = new Set<string | undefined>();
    const newestFirst = this.joinedSockets().sort(
      (a, b) =>
        (this.getSocketState(b).joinedAt ?? 0) -
        (this.getSocketState(a).joinedAt ?? 0),
    );
    for (const ws of newestFirst) {
      const { ownerUid } = this.getSocketState(ws);
      if (owners.has(ownerUid)) {
        this.retire(ws);
        removedLegacyPeer = true;
      } else {
        owners.add(ownerUid);
      }
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
    server.serializeAttachment({
      ownerUid,
      peerId: null,
    } satisfies SocketState);

    // Presence snapshot on connect. The P2PRoomSignaling contract requires
    // watchers (connected, not joined) to know current occupancy — the client
    // room checks capacity against it before and after joining.
    const recentDepartures = await this.recentlyDeparted();
    const peers = this.presenceMembers();
    const departed = recentDepartures.filter(
      (peerId) => !peers.some((member) => member.peerId === peerId),
    );
    this.send(server, {
      t: 'peers',
      peers,
      ...(departed.length ? { departed } : {}),
    });

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
      this.setPeerState(ws, { peerId: null });
      ws.close(4001, 'reconnect to authenticate');
      return;
    }
    const message = parsed as ClientMessage;
    switch (message.t) {
      case 'join': {
        // Checked even when the ID is vacant, so a first registration cannot
        // squat another account's ID.
        if (!ownsPeerId(state.ownerUid, message.peerId))
          return this.sendError(ws, 'unauthorized peerId', message.requestId);
        // One endpoint per account: this join takes over the account's slot
        // and join order from its previous socket, whether that is the same
        // endpoint reconnecting or another window or device.
        const previous = this.joinedSockets().filter(
          (other) =>
            other !== ws &&
            this.getSocketState(other).ownerUid === state.ownerUid,
        );
        const others = this.joinedSockets().filter(
          (other) => other !== ws && !previous.includes(other),
        );
        if (others.length >= ROOM_MEMBER_LIMIT)
          return this.sendError(ws, ROOM_FULL_ERROR, message.requestId);
        const heldOrders = [ws, ...previous].flatMap(
          (socket) => this.getSocketState(socket).joinedAt ?? [],
        );
        const joinedAt = heldOrders.length
          ? Math.min(...heldOrders)
          : this.nextJoinOrder();
        for (const other of previous) this.retire(other);
        // Admission is synchronous, so no concurrent join can take this slot.
        this.setPeerState(ws, {
          peerId: message.peerId,
          data: message.data,
          joinedAt,
        });
        this.broadcastPeers();
        await this.recentlyDeparted({ clear: message.peerId });
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
        if (peerId) await this.recentlyDeparted({ record: peerId });
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
        this.setPeerState(ws, {
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

  /** Joined peers in join order, with their presence data. @kidlib/p2p admits
   * the first `memberCapacity` members of this list. The local peer is included
   * (its own socket is in getWebSockets()), so self mute toggles round-trip back. */
  private presenceMembers(): PresenceMember[] {
    return this.ctx
      .getWebSockets()
      .map((ws) => this.getSocketState(ws))
      .filter((state) => state.peerId !== null)
      .sort((a, b) => (a.joinedAt ?? 0) - (b.joinedAt ?? 0))
      .map(({ peerId, data }) =>
        data
          ? { peerId: peerId as PeerId, data }
          : { peerId: peerId as PeerId },
      );
  }

  private joinedSockets(): WebSocket[] {
    return this.ctx
      .getWebSockets()
      .filter((ws) => this.getSocketState(ws).peerId !== null);
  }

  /** Also cleans up rooms that receive no further sockets or messages. */
  async alarm(): Promise<void> {
    await this.recentlyDeparted();
  }

  /** Update the bounded history atomically, including its next expiry alarm.
   * Storage survives hibernation; no socket or in-memory cache owns the history.
   * A rejoin invalidates the previous departure for that ID. */
  private async recentlyDeparted({
    record,
    clear,
  }: { record?: PeerId; clear?: PeerId } = {}): Promise<PeerId[]> {
    return this.ctx.storage.transaction(async (storage) => {
      const stored =
        (await storage.get<[PeerId, number][]>(DEPARTURES_KEY)) ?? [];
      const now = Date.now();
      const fresh = stored.filter(
        ([peerId, leftAt]) =>
          leftAt > now - DEPARTURE_REPLAY_MS &&
          peerId !== clear &&
          peerId !== record,
      );
      if (record) fresh.push([record, now]);
      const departures = fresh.slice(-MAX_RECENT_DEPARTURES);
      if (record || departures.length !== stored.length) {
        if (departures.length) {
          await storage.put(DEPARTURES_KEY, departures);
          await storage.setAlarm(departures[0][1] + DEPARTURE_REPLAY_MS);
        } else {
          await storage.delete(DEPARTURES_KEY);
          await storage.deleteAlarm();
        }
      }
      return departures.map(([peerId]) => peerId);
    });
  }

  private findSocket(peerId: PeerId): WebSocket | undefined {
    return this.joinedSockets().find(
      (ws) => this.getSocketState(ws).peerId === peerId,
    );
  }

  /** Detach first, so the delayed close callback cannot broadcast stale presence. */
  private retire(ws: WebSocket): void {
    this.clearSocketPresence(ws);
    try {
      ws.close(REPLACED_CLOSE_CODE, 'replaced by newer connection');
    } catch {
      // Already closing.
    }
  }

  private clearPeerPresence(peerId: PeerId | null): void {
    if (!peerId) return;
    for (const ws of this.ctx.getWebSockets()) {
      if (this.getSocketState(ws).peerId === peerId) {
        this.clearSocketPresence(ws);
      }
    }
  }

  /** Clear the peer registration while retaining the authenticated owner.
   * A replaced socket is already detached and must not emit a stale presence
   * snapshot when its delayed close/error callback arrives. */
  private clearSocketPresence(ws: WebSocket): boolean {
    if (!this.getSocketState(ws).peerId) return false;
    this.setPeerState(ws, { peerId: null });
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

  private setPeerState(
    ws: WebSocket,
    state: Omit<SocketState, 'ownerUid'>,
  ): void {
    // Authentication is immutable for this socket. Replace peer state entirely
    // so leave/replacement cannot retain old presence data or join ordering.
    ws.serializeAttachment({
      ...state,
      ownerUid: this.getSocketState(ws).ownerUid,
    });
  }

  private nextJoinOrder(): number {
    this.joinSequence = (this.joinSequence + 1) % 1000;
    return Date.now() * 1000 + this.joinSequence;
  }
}
