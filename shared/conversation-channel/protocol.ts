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
 * The DO broadcasts events using a discriminated union keyed by `t` (type).
 * Only one variant exists today:
 *
 * - `{ t: 'message', message: WireMessage }` — new message (text or file).
 *   Payload fields: id, conversationId, senderId, senderName, kind, body, sentAt,
 *   attachments (each with id, r2Key, bucket, fileName, mimeType, fileSize, width, height).
 *
 * Reactions and read-receipts are deferred to a fast-follow PR; when wired they
 * become additional `t` variants (e.g. `t: 'reaction'`, `t: 'read'`) added to the
 * union below and to `isConversationServerEvent`. Keep payloads camelCase (wire
 * shape), distinct from the worker's snake_case D1 rows.
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

/** Durable Object → client. Broadcast to all connected members of the room. */
export type ConversationServerEvent = { t: 'message'; message: WireMessage };

export function isConversationServerEvent(
  value: unknown,
): value is ConversationServerEvent {
  if (!value || typeof value !== 'object') return false;
  const e = value as Record<string, unknown>;
  if (e.t !== 'message') return false;
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
