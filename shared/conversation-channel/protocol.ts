/**
 * Conversation-channel wire protocol — single source of truth shared by the
 * client transport (`src/realtime/`) and the Durable Object (`workers/data/`).
 *
 * Transport-agnostic and side-agnostic: no D1, Firebase, DOM, or Workers types.
 * The channel is broadcast-only: the worker authenticates + membership-guards
 * the WebSocket upgrade, then the DO fans out events to every connected member.
 * Clients subscribe by connecting; they send nothing.
 *
 * ## Event envelope specification
 *
 * The DO broadcasts events using a discriminated union keyed by `t` (type):
 *
 * - `{ t: 'message', message: WireMessage }` — new message (text or file).
 *   Payload fields: id, conversationId, senderId, senderName, kind, body, sentAt,
 *   attachments (each with id, r2Key, bucket, fileName, mimeType, fileSize, width, height).
 *
 * - `{ t: 'reaction', conversationId: string, reaction: ReactionPayload }` — add/remove
 *   emoji reaction. Payload fields: messageId, userId, emoji, action ('add' | 'remove').
 *   **Deferred to fast-follow PR** — schema + endpoint exist but not wired.
 *
 * - `{ t: 'read', conversationId: string, read: ReadPayload }` — user marked conversation
 *   as read. Payload fields: userId, readAt (timestamp). **Deferred to fast-follow PR**.
 *
 * Extending later = add a new `t` variant. Keep payloads camelCase (wire shape), distinct
 * from the worker's snake_case D1 rows.
 */

export interface WireAttachment {
  id: string;
  r2Key: string;
  bucket: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  width: number | null;
  height: number | null;
}

export interface WireMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string | null;
  kind: 'text' | 'file';
  body: string | null;
  sentAt: number;
  attachments: WireAttachment[];
}

/**
 * Reaction event payload (add/remove emoji reaction on a message).
 * **Not yet implemented** — reserved for fast-follow PR.
 */
export interface ReactionPayload {
  messageId: string;
  userId: string;
  emoji: string;
  action: 'add' | 'remove';
}

/**
 * Read-receipt event payload (user marked conversation as read).
 * **Not yet implemented** — reserved for fast-follow PR.
 */
export interface ReadPayload {
  userId: string;
  readAt: number;
}

/**
 * Durable Object → client. Broadcast to all connected members of the room.
 *
 * Current implementation: only `t: 'message'` is active. Reaction and read events
 * are defined here as extension points for the fast-follow PR.
 */
export type ConversationServerEvent =
  | { t: 'message'; message: WireMessage }
  | { t: 'reaction'; conversationId: string; reaction: ReactionPayload }
  | { t: 'read'; conversationId: string; read: ReadPayload };

export function isConversationServerEvent(
  value: unknown,
): value is ConversationServerEvent {
  if (!value || typeof value !== 'object') return false;
  const e = value as Record<string, unknown>;

  // Message event (currently implemented).
  if (e.t === 'message') {
    const m = e.message as Record<string, unknown> | undefined;
    return (
      !!m &&
      typeof m.id === 'string' &&
      typeof m.conversationId === 'string' &&
      typeof m.senderId === 'string' &&
      (m.kind === 'text' || m.kind === 'file') &&
      typeof m.sentAt === 'number' &&
      Array.isArray(m.attachments)
    );
  }

  // Reaction event (reserved, not yet broadcast by worker).
  if (e.t === 'reaction') {
    const r = e.reaction as Record<string, unknown> | undefined;
    return (
      !!r &&
      typeof e.conversationId === 'string' &&
      typeof r.messageId === 'string' &&
      typeof r.userId === 'string' &&
      typeof r.emoji === 'string' &&
      (r.action === 'add' || r.action === 'remove')
    );
  }

  // Read event (reserved, not yet broadcast by worker).
  if (e.t === 'read') {
    const rd = e.read as Record<string, unknown> | undefined;
    return (
      !!rd &&
      typeof e.conversationId === 'string' &&
      typeof rd.userId === 'string' &&
      typeof rd.readAt === 'number'
    );
  }

  return false;
}
