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
export type RelayChannel = 'sdp' | 'ice';

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

/** Client → Durable Object. */
export type ClientMessage =
  | { t: 'join'; peerId: PeerId; data?: PresenceData }
  | { t: 'leave' }
  | { t: 'presence'; data: PresenceData }
  | { t: 'relay'; to: PeerId; channel: RelayChannel; data: unknown };

/** Durable Object → client. */
export type ServerMessage =
  | { t: 'peers'; peers: PresenceMember[] }
  | { t: 'relay'; from: PeerId; channel: RelayChannel; data: unknown }
  | { t: 'error'; message: string };

export function isClientMessage(value: unknown): value is ClientMessage {
  if (!value || typeof value !== 'object') return false;
  const m = value as Record<string, unknown>;
  switch (m.t) {
    case 'join':
      return (
        typeof m.peerId === 'string' &&
        m.peerId.length > 0 &&
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
        (m.channel === 'sdp' || m.channel === 'ice') &&
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
