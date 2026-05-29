/**
 * Signaling wire protocol — single source of truth shared by the client
 * transport (`src/realtime/`) and the Durable Object worker (`workers/signaling/`).
 *
 * Transport-agnostic and side-agnostic: no RTDB, Firebase, DOM, or Workers types.
 * The Durable Object is a dumb relay — it understands `join`/`leave`/`relay`
 * for presence and addressed fan-out, and nothing about SDP/ICE contents.
 *
 * Extending later (e.g. media-playback-sync) = add a `RelayChannel` value.
 * Do not add channel-specific message shapes here; keep `relay` generic.
 */

export type PeerId = string;

/** Payload bucket for relayed messages. Add values to extend; never reshape. */
export type RelayChannel = 'sdp' | 'ice';

/** Client → Durable Object. */
export type ClientMessage =
  | { t: 'join'; peerId: PeerId }
  | { t: 'leave' }
  | { t: 'relay'; to: PeerId; channel: RelayChannel; data: unknown };

/** Durable Object → client. */
export type ServerMessage =
  | { t: 'peers'; peers: PeerId[] }
  | { t: 'relay'; from: PeerId; channel: RelayChannel; data: unknown }
  | { t: 'error'; message: string };

export function isClientMessage(value: unknown): value is ClientMessage {
  if (!value || typeof value !== 'object') return false;
  const m = value as Record<string, unknown>;
  switch (m.t) {
    case 'join':
      return typeof m.peerId === 'string' && m.peerId.length > 0;
    case 'leave':
      return true;
    case 'relay':
      return (
        typeof m.to === 'string' &&
        m.to.length > 0 &&
        (m.channel === 'sdp' || m.channel === 'ice') &&
        'data' in m
      );
    default:
      return false;
  }
}
