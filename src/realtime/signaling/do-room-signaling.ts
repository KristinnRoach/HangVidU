import type {
  CreateRoomSignalingOptions,
  P2PRoomPeerSignalingOptions,
  P2PRoomSignaling,
  RtcSignalingSource,
} from '@kidlib/p2p';
import { getLoggedInUserToken } from '../../auth/index.js';
import {
  createSignalingSocket,
  type SignalingSocket,
} from '../signaling-socket';
import type { RelayChannel, ServerMessage } from '../protocol';

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
  const base = (import.meta.env.VITE_SIGNALING_URL ?? 'ws://localhost:8787')
    .trim()
    .replace(/\/$/, '');
  return `${base}/rooms/${encodeURIComponent(roomId)}/signal`;
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
  const peersHandlers = new Set<(peerIds: string[]) => void>();
  const relaySubs = new Set<RelaySubscription>();

  socket.onMessage((message: ServerMessage) => {
    switch (message.t) {
      case 'peers':
        peersHandlers.forEach((h) => h(message.peers));
        return;
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

  // Restore presence after every (re)connect.
  socket.onOpen(() => {
    if (joinedPeerId) socket.send({ t: 'join', peerId: joinedPeerId });
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
    join(peerId) {
      joinedPeerId = peerId;
      socket.send({ t: 'join', peerId });
    },

    leave(peerId) {
      socket.send({ t: 'leave' });
      if (joinedPeerId === peerId) joinedPeerId = null;
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
