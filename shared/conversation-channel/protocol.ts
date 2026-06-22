/**
 * Conversation-channel wire protocol — single source of truth shared by the
 * client transport (`src/realtime/`) and the consolidated Cloudflare Worker.
 *
 * Transport-agnostic and side-agnostic: no D1, Firebase, DOM, or Workers types.
 * The channel is broadcast-only: the worker authenticates + membership-guards
 * the WebSocket upgrade, then the DO fans out events to every connected member.
 * Clients subscribe by connecting; they send nothing.
 *
 * ## Event envelope specification
 *
 * The DO broadcasts events using a discriminated union keyed by `t` (type).
 * - `{ t: 'message', message: WireMessage }` — new message (text or file).
 *   Payload fields: id, conversationId, senderId, senderName, kind, body, sentAt,
 *   attachments (each with id, r2Key, bucket, fileName, mimeType, fileSize, width, height).
 * - `{ t: 'reaction', ... }` — authoritative counts after one user's reaction
 *   changed. The actor fields let each receiver derive its viewer-specific
 *   `reactedByMe` value from the shared broadcast.
 *
 * Keep payloads camelCase (wire shape), distinct from snake_case D1 rows.
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

export interface WireReactionCount {
  key: string;
  count: number;
}

export interface WireReactionSummary extends WireReactionCount {
  reactedByMe: boolean;
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
  reactions: WireReactionSummary[];
}

/** Durable Object → client. Broadcast to all connected members of the room. */
export type ConversationServerEvent =
  | { t: 'message'; message: WireMessage }
  | {
      t: 'reaction';
      messageId: string;
      actorUserId: string;
      actorReactionKey: string | null;
      reactions: WireReactionCount[];
    };

export function isConversationServerEvent(
  value: unknown,
): value is ConversationServerEvent {
  if (!value || typeof value !== 'object') return false;
  const e = value as Record<string, unknown>;
  if (e.t === 'reaction') {
    return (
      typeof e.messageId === 'string' &&
      typeof e.actorUserId === 'string' &&
      (e.actorReactionKey === null || typeof e.actorReactionKey === 'string') &&
      isReactionList(e.reactions, false)
    );
  }
  if (e.t !== 'message') return false;
  const m = e.message as Record<string, unknown> | undefined;
  return (
    !!m &&
    typeof m.id === 'string' &&
    typeof m.conversationId === 'string' &&
    typeof m.senderId === 'string' &&
    (m.kind === 'text' || m.kind === 'file') &&
    typeof m.sentAt === 'number' &&
    Array.isArray(m.attachments) &&
    isReactionList(m.reactions, true)
  );
}

function isReactionList(value: unknown, includeViewerState: boolean): boolean {
  return (
    Array.isArray(value) &&
    value.every((item) => {
      if (!item || typeof item !== 'object') return false;
      const reaction = item as Record<string, unknown>;
      return (
        typeof reaction.key === 'string' &&
        typeof reaction.count === 'number' &&
        Number.isInteger(reaction.count) &&
        reaction.count > 0 &&
        (!includeViewerState || typeof reaction.reactedByMe === 'boolean')
      );
    })
  );
}
