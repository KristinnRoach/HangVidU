import type {
  CreateRoomSignalingOptions,
  P2PRoomPeerSignalingOptions,
  P2PRoomPresenceData,
  P2PRoomPresenceMember,
  P2PRoomSignaling,
  RtcSignalingSource,
} from '@kidlib/p2p';
import { getLoggedInUserToken } from '../../auth/index.js';
import {
  createSignalingSocket,
  type SignalingSocket,
} from '../signaling-socket';
import type { RelayChannel, ServerMessage } from '../protocol';
import { buildHangViduWebSocketUrl } from '../../infra/hangvidu-api-url';

/**
 * Durable Object `P2PRoomSignaling` — drop-in replacement for
 * `createFirebaseRoomSignaling`. Talks to the signaling worker over one
 * WebSocket per room and maps the port's offer/answer/ICE calls onto the
 * generic `relay` protocol. The DO is a dumb relay; the SDP offer-vs-answer
 * distinction is an adapter-owned convention carried in the relay payload.
 */

/** Offer and answer share the `sdp` channel; this disambiguates them. */
interface SdpEnvelope {
  kind: 'offer' | 'answer';
  payload: RTCSessionDescriptionInit;
}

interface RelaySubscription {
  from: string;
  channel: RelayChannel;
  handler: (data: unknown) => void;
}

function signalingUrl(roomId: string): string {
  return buildHangViduWebSocketUrl(
    `/rooms/${encodeURIComponent(roomId)}/signal`,
  );
}

export function createDoRoomSignaling({
  roomId,
}: CreateRoomSignalingOptions): P2PRoomSignaling {
  if (!roomId) throw new Error('createDoRoomSignaling: roomId is required');

  const socket: SignalingSocket = createSignalingSocket({
    url: signalingUrl(roomId),
    getProtocols: async () => {
      const token = await getLoggedInUserToken();
      return token ? ['bearer', token] : [];
    },
  });

  let joinedPeerId: string | null = null;
  let localData: P2PRoomPresenceData | undefined;
  const peersHandlers = new Set<(members: P2PRoomPresenceMember[]) => void>();
  const relaySubs = new Set<RelaySubscription>();

  // Build the join message, omitting `data` when absent so the no-presence
  // wire stays minimal.
  const joinMessage = (peerId: string, data?: P2PRoomPresenceData) =>
    data !== undefined
      ? ({ t: 'join', peerId, data } as const)
      : ({ t: 'join', peerId } as const);

  socket.onMessage((message: ServerMessage) => {
    switch (message.t) {
      case 'peers': {
        // Wire `{ peerId, data }` → port `{ memberId, data }`.
        const members: P2PRoomPresenceMember[] = message.peers.map((p) => ({
          memberId: p.peerId,
          data: p.data,
        }));
        peersHandlers.forEach((h) => h(members));
        return;
      }
      case 'relay':
        for (const sub of relaySubs) {
          if (sub.from === message.from && sub.channel === message.channel) {
            sub.handler(message.data);
          }
        }
        return;
      case 'error':
        console.warn('[signaling] worker error:', message.message);
        return;
    }
  });

  // Restore presence (peerId + latest data) after every (re)connect.
  socket.onOpen(() => {
    if (joinedPeerId) socket.send(joinMessage(joinedPeerId, localData));
  });

  function subscribeRelay(
    from: string,
    channel: RelayChannel,
    handler: (data: unknown) => void,
  ): () => void {
    const sub: RelaySubscription = { from, channel, handler };
    relaySubs.add(sub);
    return () => relaySubs.delete(sub);
  }

  return {
    join(peerId, data) {
      joinedPeerId = peerId;
      localData = data;
      // Resolve once the server echoes a peers list containing us, so the
      // room's post-join capacity check runs against current occupancy
      // instead of a stale snapshot. Timeout fallback keeps a flaky server
      // from hanging the join forever (degrades to pre-ack behavior).
      const ack = new Promise<void>((resolve) => {
        const handler = (members: P2PRoomPresenceMember[]) => {
          if (!members.some((m) => m.memberId === peerId)) return;
          peersHandlers.delete(handler);
          clearTimeout(timeoutId);
          resolve();
        };
        const timeoutId = setTimeout(() => {
          peersHandlers.delete(handler);
          resolve();
        }, 5_000);
        peersHandlers.add(handler);
      });
      socket.send(joinMessage(peerId, data));
      return ack;
    },

    // Leave is socket-scoped — the worker clears presence for this connection
    // regardless of peerId, so the arg is unused. Always reset local join state
    // so a later reconnect doesn't re-assert presence we've already left.
    leave() {
      socket.send({ t: 'leave' });
      joinedPeerId = null;
      localData = undefined;
    },

    // Update our own presence data mid-session (e.g. mute toggle). The worker
    // derives identity from the socket, so peerId is unused on the wire; the
    // change round-trips back through `onPeers` to reach the local Accessor.
    updatePresenceData(_peerId, data) {
      localData = data;
      socket.send({ t: 'presence', data });
    },

    onPeers(callback) {
      peersHandlers.add(callback);
      return () => peersHandlers.delete(callback);
    },

    createPeerSignaling({
      remotePeerId,
    }: P2PRoomPeerSignalingOptions): RtcSignalingSource {
      const sendRelay = (channel: RelayChannel, data: unknown) =>
        socket.send({ t: 'relay', to: remotePeerId, channel, data });

      return {
        sendOffer: (offer) =>
          sendRelay('sdp', { kind: 'offer', payload: offer } as SdpEnvelope),
        sendAnswer: (answer) =>
          sendRelay('sdp', { kind: 'answer', payload: answer } as SdpEnvelope),

        onOffer(callback) {
          return subscribeRelay(remotePeerId, 'sdp', (data) => {
            const env = data as SdpEnvelope;
            if (env?.kind === 'offer') callback(env.payload);
          });
        },
        onAnswer(callback) {
          return subscribeRelay(remotePeerId, 'sdp', (data) => {
            const env = data as SdpEnvelope;
            if (env?.kind === 'answer') callback(env.payload);
          });
        },

        sendCandidate: (candidate) => sendRelay('ice', candidate),
        onRemoteCandidate(callback) {
          return subscribeRelay(remotePeerId, 'ice', (data) => {
            if (data) callback(data as RTCIceCandidateInit);
          });
        },
      };
    },

    cleanupSignaling() {
      if (joinedPeerId) {
        socket.send({ t: 'leave' });
        joinedPeerId = null;
      }
      relaySubs.clear();
      peersHandlers.clear();
      socket.close();
    },
  };
}
