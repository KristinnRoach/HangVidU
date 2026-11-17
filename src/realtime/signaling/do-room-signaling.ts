import {
  RoomFullError,
  type CreateRoomSignalingOptions,
  type P2PRoomPeerSignalingOptions,
  type P2PRoomPresenceData,
  type P2PRoomPresenceMember,
  type P2PRoomPresenceSnapshot,
  type P2PRoomSignaling,
  type RtcSignalingSource,
} from '@kidlib/p2p';
import { getLoggedInUserToken } from '@auth';
import {
  createSignalingSocket,
  type SignalingSocket,
} from '../signaling-socket';
import {
  ROOM_FULL_ERROR,
  type RelayChannel,
  type ServerMessage,
} from '../protocol';
import { buildHangViduWebSocketUrl } from '../../infra/hangvidu-api-url';

/**
 * Durable Object `P2PRoomSignaling`. Talks to the signaling worker over one
 * WebSocket per room and maps the port's offer/answer/ICE calls onto the
 * generic `relay` protocol. The DO is a dumb relay; the SDP offer-vs-answer
 * distinction is an adapter-owned convention carried in the relay payload.
 */

/** Offer and answer share the `sdp` channel; this disambiguates them. */
interface SdpEnvelope {
  kind: 'offer' | 'answer';
  payload: RTCSessionDescriptionInit;
}

interface RoomRegistration {
  peerId: string;
  requestId: string;
  data?: P2PRoomPresenceData;
}

interface RelaySubscription {
  from: string;
  channel: RelayChannel;
  handler: (data: unknown) => void;
}

const membershipLostHandlers = new Set<(roomId: string) => void>();

/** Called when this endpoint loses its room for good: another endpoint of the
 * same account replaced it, or the server refused to readmit it after a
 * reconnect. */
export function onRoomMembershipLost(
  handler: (roomId: string) => void,
): () => void {
  membershipLostHandlers.add(handler);
  return () => membershipLostHandlers.delete(handler);
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

  // Retained after admission so reconnects restore the same registration.
  let registration: RoomRegistration | null = null;
  // The server can't tell a lost join from an admitted one whose ack was
  // lost, so every retransmission is a resume.
  let joinSent = false;
  let pendingJoin:
    | {
        resolve: () => void;
        reject: (error: Error) => void;
        timer: ReturnType<typeof setTimeout>;
      }
    | undefined;

  function rejectJoin(error: Error) {
    const pending = pendingJoin;
    pendingJoin = undefined;
    registration = null;
    socket.clearQueue();
    if (pending) {
      clearTimeout(pending.timer);
      pending.reject(error);
    }
  }
  const peersHandlers = new Set<(snapshot: P2PRoomPresenceSnapshot) => void>();
  const relaySubs = new Set<RelaySubscription>();

  const joinMessage = (current: RoomRegistration) => ({
    t: 'join' as const,
    ...current,
  });

  socket.onMessage((message: ServerMessage) => {
    switch (message.t) {
      case 'joined':
        if (
          registration &&
          message.peerId === registration.peerId &&
          message.requestId === registration.requestId &&
          pendingJoin
        ) {
          const pending = pendingJoin;
          pendingJoin = undefined;
          clearTimeout(pending.timer);
          pending.resolve();
        }
        return;
      case 'peers': {
        // Wire `{ peerId, data }` → port `{ memberId, data }`.
        const members: P2PRoomPresenceMember[] = message.peers.map((p) => ({
          memberId: p.peerId,
          data: p.data,
        }));
        // The DO tags explicit `{t:'leave'}` departures on the same snapshot
        // where the peer drops out of `members`; anything absent without a
        // `departed` entry defaults to `dropped` in 0.4.0. This is what lets the
        // call controller tell an intentional hangup from a silent drop.
        const departed = message.departed?.map((memberId) => ({
          memberId,
          reason: 'left' as const,
        }));
        const snapshot: P2PRoomPresenceSnapshot = departed
          ? { members, departed }
          : { members };
        peersHandlers.forEach((h) => h(snapshot));
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
        if (registration && message.requestId === registration.requestId) {
          // Without a pending join this was a rejoin after reconnect, so the
          // room already counts this endpoint as a member.
          const wasMember = !pendingJoin;
          rejectJoin(
            message.message === ROOM_FULL_ERROR
              ? new RoomFullError()
              : new Error(message.message),
          );
          if (wasMember) reportMembershipLost();
        }
        console.warn('[signaling] worker error:', message.message);
        return;
    }
  });

  // Restore presence (peerId + latest data) after every (re)connect. Once
  // admitted, the rejoin is a resume, so it can't take the slot back from a
  // newer endpoint of this account.
  socket.onOpen(() => {
    if (!registration) return;
    socket.send({
      ...joinMessage(registration),
      ...(joinSent ? { resume: true } : {}),
    });
    joinSent = true;
  });

  // The empty room drops this room's peers; the owner ends the call even when
  // no peers had connected yet.
  function reportMembershipLost() {
    peersHandlers.forEach((h) => h({ members: [] }));
    membershipLostHandlers.forEach((h) => h(roomId));
  }

  // This account joined the room from another endpoint.
  socket.onReplaced(() => {
    rejectJoin(new Error('signaling replaced by another endpoint'));
    reportMembershipLost();
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
      if (pendingJoin) return Promise.reject(new Error('join already pending'));
      registration = {
        peerId,
        requestId: crypto.randomUUID(),
        ...(data !== undefined ? { data } : {}),
      };
      // Presence is room-wide and may describe a different socket with the
      // same ID. Only this socket's admission acknowledgment proves success.
      const ack = new Promise<void>((resolve, reject) => {
        pendingJoin = {
          resolve,
          reject,
          timer: setTimeout(() => {
            socket.send({ t: 'leave' });
            rejectJoin(new Error('signaling join timed out'));
          }, 5_000),
        };
      });
      // Not queued: onOpen sends it from `registration`, so a cancelled join
      // can't be replayed by a later connect.
      joinSent = false;
      if (socket.isOpen()) {
        socket.send(joinMessage(registration));
        joinSent = true;
      }
      return ack;
    },

    // Leave is socket-scoped — the worker clears presence for this connection
    // regardless of peerId, so the arg is unused. Always reset local join state
    // so a later reconnect doesn't re-assert presence we've already left.
    leave() {
      socket.send({ t: 'leave' });
      rejectJoin(new Error('signaling join cancelled'));
    },

    // Update our own presence data mid-session (e.g. mute toggle). The worker
    // derives identity from the socket, so peerId is unused on the wire; the
    // change round-trips back through `onPeers` to reach the local Accessor.
    updatePresenceData(_peerId, data) {
      if (registration) registration.data = data;
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
        sendOffer: (offer) => {
          // The remote would answer every replayed offer, and the first answer
          // would be applied to this one with stale ICE credentials.
          socket.clearQueue(
            (message) =>
              message.t === 'relay' &&
              message.to === remotePeerId &&
              message.channel === 'sdp' &&
              (message.data as SdpEnvelope).kind === 'offer',
          );
          sendRelay('sdp', { kind: 'offer', payload: offer } as SdpEnvelope);
        },
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
        sendIceRestartRequest: (request) => sendRelay('ice-restart', request),
        onIceRestartRequest(callback) {
          return subscribeRelay(remotePeerId, 'ice-restart', (data) => {
            const request = data as { requestId?: unknown } | null;
            if (
              request &&
              typeof request === 'object' &&
              typeof request.requestId === 'string' &&
              request.requestId.length > 0
            ) {
              callback({ requestId: request.requestId });
            }
          });
        },
      };
    },

    cleanupSignaling() {
      if (registration) socket.send({ t: 'leave' });
      rejectJoin(new Error('signaling closed'));
      relaySubs.clear();
      peersHandlers.clear();
      socket.close();
    },
  };
}
