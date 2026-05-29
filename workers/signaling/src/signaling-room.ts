import { DurableObject } from 'cloudflare:workers';
import {
  isClientMessage,
  type ClientMessage,
  type PeerId,
  type ServerMessage,
} from '../../../shared/signaling/protocol';
import type { Env } from './index';

/** Survives hibernation via ws.serializeAttachment(). */
interface SocketState {
  peerId: PeerId | null;
}

/**
 * One instance per room (keyed by roomId). A dumb relay:
 *   - tracks presence (joined peers)
 *   - forwards `relay` messages to the addressed peer
 * It never inspects SDP/ICE contents. State is derived from the live socket
 * set, so nothing is persisted — an empty room simply hibernates and evicts.
 */
export class SignalingRoom extends DurableObject<Env> {
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

    // Echo the auth subprotocol; browsers abort the handshake if the server
    // does not confirm one of the offered subprotocols.
    const headers: HeadersInit = {};
    if ((request.headers.get('Sec-WebSocket-Protocol') ?? '').includes('bearer')) {
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
        this.setSocketState(ws, { peerId: message.peerId });
        this.broadcastPeers();
        return;
      case 'leave':
        this.setSocketState(ws, { peerId: null });
        this.broadcastPeers();
        return;
      case 'relay':
        return this.relay(ws, message.to, message.channel, message.data);
    }
  }

  async webSocketClose(ws: WebSocket): Promise<void> {
    // The socket is gone from getWebSockets() by the time presence recomputes.
    this.broadcastPeers();
  }

  async webSocketError(ws: WebSocket): Promise<void> {
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
    const peers = this.peerIds();
    const payload: ServerMessage = { t: 'peers', peers };
    for (const ws of this.ctx.getWebSockets()) {
      if (this.getSocketState(ws).peerId) this.send(ws, payload);
    }
  }

  private peerIds(): PeerId[] {
    const ids: PeerId[] = [];
    for (const ws of this.ctx.getWebSockets()) {
      const { peerId } = this.getSocketState(ws);
      if (peerId) ids.push(peerId);
    }
    return ids;
  }

  private findSocket(peerId: PeerId): WebSocket | null {
    for (const ws of this.ctx.getWebSockets()) {
      if (this.getSocketState(ws).peerId === peerId) return ws;
    }
    return null;
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
    return (ws.deserializeAttachment() as SocketState | null) ?? { peerId: null };
  }

  private setSocketState(ws: WebSocket, state: SocketState): void {
    ws.serializeAttachment(state);
  }
}
