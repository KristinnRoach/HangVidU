/**
 * Call-mailbox wire protocol — single source of truth shared by the client
 * transport (`src/realtime/mailbox-channel.ts`) and the Durable Object
 * (`workers/data/src/user-mailbox.ts`).
 *
 * Transport-agnostic and side-agnostic: no D1, Firebase, DOM, or Workers types.
 * The mailbox is per-user and broadcast-only within that user's connections: the
 * worker authenticates the WebSocket upgrade (you can only open your OWN mailbox)
 * and authorizes every delivery against D1 conversation membership, then the DO
 * fans the envelope to every connected socket for that user. Clients receive
 * only; they send invites/responses/cancels over REST.
 *
 * `roomId` is the opaque conversationId — the room to join on accept. All
 * envelopes are addressed by delivery (which user's mailbox), so they carry no
 * recipient field.
 */

export interface MailboxInvite {
  roomId: string;
  callerId: string;
  calleeId: string;
  callerName?: string;
  audioOnly?: boolean;
  startedAt: number;
  expiresAt?: number;
}

export interface MailboxResponse {
  roomId: string;
  responseType: 'accepted' | 'rejected' | 'busy';
  by: string;
  respondedAt: number;
  expiresAt?: number;
}

/**
 * DO → client. Delivered to every socket of the addressed user's mailbox.
 *
 * `cancel` vs `handled` both retire a pending invite and dismiss its dialog, but
 * are distinct on purpose: `cancel` is the caller withdrawing (hang-up/timeout),
 * `handled` is the callee responding on one device, fanned to their OWN other
 * devices so the dialog clears everywhere. `by` is whoever retired it.
 */
export type MailboxEnvelope =
  | { t: 'invite'; invite: MailboxInvite }
  | { t: 'response'; response: MailboxResponse }
  | { t: 'cancel'; roomId: string; by: string }
  | { t: 'handled'; roomId: string; by: string };

export function isMailboxEnvelope(value: unknown): value is MailboxEnvelope {
  if (!value || typeof value !== 'object') return false;
  const e = value as Record<string, unknown>;
  if (e.t === 'invite') {
    const i = e.invite as Record<string, unknown> | undefined;
    return (
      !!i &&
      typeof i.roomId === 'string' &&
      typeof i.callerId === 'string' &&
      typeof i.calleeId === 'string' &&
      typeof i.startedAt === 'number'
    );
  }
  if (e.t === 'response') {
    const r = e.response as Record<string, unknown> | undefined;
    return (
      !!r &&
      typeof r.roomId === 'string' &&
      (r.responseType === 'accepted' ||
        r.responseType === 'rejected' ||
        r.responseType === 'busy') &&
      typeof r.by === 'string' &&
      typeof r.respondedAt === 'number'
    );
  }
  if (e.t === 'cancel' || e.t === 'handled') {
    return typeof e.roomId === 'string' && typeof e.by === 'string';
  }
  return false;
}
