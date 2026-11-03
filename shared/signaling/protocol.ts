/**
 * Signaling wire protocol — single source of truth shared by the client
 * transport (`src/realtime/`) and the consolidated Cloudflare Worker.
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
export type RelayChannel = 'sdp' | 'ice' | 'ice-restart';

/**
 * Opaque, self-asserted per-peer presence metadata (e.g. displayName, muted,
 * camOff). The relay never inspects it. NEVER trust it for authorization —
 * any peer asserts its own; authz-sensitive facts stay authoritative in D1/DO.
 */
export type PresenceData = Record<string, unknown>;

/** A present peer and its self-asserted presence data. */
export interface PresenceMember {
  peerId: PeerId;
  data?: PresenceData;
}

/**
 * Client → Durable Object.
 *
 * `join.requestId` correlates this socket's admission: the DO echoes it on the
 * `joined` ack or the `error` rejection, and sends `joined` after the current
 * `peers` snapshot. Room-wide presence alone never acknowledges a join. It is
 * optional so older clients that omit it are still accepted.
 */
export type ClientMessage =
  | { t: 'join'; peerId: PeerId; data?: PresenceData; requestId?: string }
  | { t: 'leave' }
  | { t: 'presence'; data: PresenceData }
  | { t: 'relay'; to: PeerId; channel: RelayChannel; data: unknown };

/**
 * Durable Object → client.
 *
 * `departed` lists peers that left explicitly (`{t:'leave'}`) in the same
 * snapshot where they disappear from `peers`. It is populated ONLY on the
 * explicit-leave path — a socket close/error/eviction never sets it, so the
 * client treats any absent member without a `departed` entry as a silent drop.
 */
export type ServerMessage =
  | { t: 'joined'; peerId: PeerId; requestId?: string }
  | { t: 'peers'; peers: PresenceMember[]; departed?: PeerId[] }
  | { t: 'relay'; from: PeerId; channel: RelayChannel; data: unknown }
  | { t: 'error'; message: string; requestId?: string };

export function isClientMessage(value: unknown): value is ClientMessage {
  if (!value || typeof value !== 'object') return false;
  const m = value as Record<string, unknown>;
  switch (m.t) {
    case 'join':
      return (
        typeof m.peerId === 'string' &&
        m.peerId.length > 0 &&
        (m.requestId === undefined ||
          (typeof m.requestId === 'string' &&
            m.requestId.length > 0 &&
            m.requestId.length <= 128)) &&
        isPresenceDataOrAbsent(m.data)
      );
    case 'leave':
      return true;
    case 'presence':
      return isPresenceData(m.data);
    case 'relay':
      return (
        typeof m.to === 'string' &&
        m.to.length > 0 &&
        (m.channel === 'sdp' ||
          m.channel === 'ice' ||
          m.channel === 'ice-restart') &&
        'data' in m
      );
    default:
      return false;
  }
}

/** Presence data must be a plain object (never an array or primitive). */
function isPresenceData(value: unknown): value is PresenceData {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isPresenceDataOrAbsent(value: unknown): boolean {
  return value === undefined || isPresenceData(value);
}
