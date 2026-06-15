// D1 data access for the conversation-centric core. Pure SQL behind small typed
// functions; the worker router (index.ts) is the only caller.

export interface ConversationRow {
  id: string;
  kind: 'direct' | 'group';
  dm_key: string | null;
  title: string | null;
  created_at: number;
  updated_at: number;
}

export interface MemberRow {
  user_id: string;
  display_name: string | null;
  joined_at: number;
}

/** Insert the user if absent; refresh display_name when a non-null one is given. */
export async function upsertUser(
  db: D1Database,
  userId: string,
  displayName: string | null,
  now: number,
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO users (id, display_name, created_at)
       VALUES (?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         display_name = COALESCE(excluded.display_name, users.display_name)`,
    )
    .bind(userId, displayName, now)
    .run();
}

/** Sorted pair key — the DM-dedup rule, demoted from identity to a lookup key. */
export function directDmKey(a: string, b: string): string {
  return [a, b].sort().join(':');
}

/**
 * Resolve-or-create the canonical direct conversation between two users.
 * Idempotent and race-safe via the `dm_key` UNIQUE constraint. The other user
 * gets a stub `users` row if absent (display_name backfilled on their login).
 */
export async function resolveOrCreateDirect(
  db: D1Database,
  callerId: string,
  otherUserId: string,
  now: number,
): Promise<string> {
  const dmKey = directDmKey(callerId, otherUserId);

  // Ensure both user rows exist (caller already upserted by the request path,
  // but harmless; the other user may be brand new to this worker).
  await db.batch([
    db
      .prepare(
        `INSERT INTO users (id, display_name, created_at) VALUES (?, NULL, ?)
         ON CONFLICT(id) DO NOTHING`,
      )
      .bind(callerId, now),
    db
      .prepare(
        `INSERT INTO users (id, display_name, created_at) VALUES (?, NULL, ?)
         ON CONFLICT(id) DO NOTHING`,
      )
      .bind(otherUserId, now),
  ]);

  // Insert the conversation if this pair has none; UNIQUE(dm_key) dedups races.
  const newId = crypto.randomUUID();
  await db
    .prepare(
      `INSERT INTO conversations (id, kind, dm_key, created_at, updated_at)
       VALUES (?, 'direct', ?, ?, ?)
       ON CONFLICT(dm_key) DO NOTHING`,
    )
    .bind(newId, dmKey, now, now)
    .run();

  const row = await db
    .prepare(`SELECT id FROM conversations WHERE dm_key = ?`)
    .bind(dmKey)
    .first<{ id: string }>();
  if (!row) throw new Error('resolveOrCreateDirect: conversation not found after upsert');
  const conversationId = row.id;

  // Ensure both membership rows.
  await db.batch([
    memberInsert(db, conversationId, callerId, now),
    memberInsert(db, conversationId, otherUserId, now),
  ]);

  return conversationId;
}

function memberInsert(
  db: D1Database,
  conversationId: string,
  userId: string,
  now: number,
): D1PreparedStatement {
  return db
    .prepare(
      `INSERT INTO conversation_members (conversation_id, user_id, joined_at)
       VALUES (?, ?, ?)
       ON CONFLICT(conversation_id, user_id) DO NOTHING`,
    )
    .bind(conversationId, userId, now);
}

// --- messages (text + file) -------------------------------------------------

export interface MessageRow {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string | null;
  kind: 'text' | 'file';
  body: string | null;
  created_at: number;
}

export interface AttachmentRow {
  id: string;
  message_id: string;
  r2_key: string;
  bucket: string;
  file_name: string;
  mime_type: string;
  file_size: number;
  width: number | null;
  height: number | null;
}

export type MessageWithAttachments = MessageRow & {
  attachments: AttachmentRow[];
};

/** Recent-window size; mirrors the RTDB adapter's RECENT_MESSAGES_WINDOW intent. */
export const RECENT_MESSAGES_WINDOW = 50;

export interface NewAttachment {
  r2Key: string;
  bucket: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  width: number | null;
  height: number | null;
}

/**
 * Recent messages for a conversation, oldest-first (newest last), capped at
 * `limit`. Each row carries the sender's current display_name (joined) and its
 * attachments (batched lookup), so the client renders without extra round-trips.
 */
export async function loadMessages(
  db: D1Database,
  conversationId: string,
  limit: number,
): Promise<MessageWithAttachments[]> {
  const { results } = await db
    .prepare(
      `SELECT m.id, m.conversation_id, m.sender_id, u.display_name AS sender_name,
              m.kind, m.body, m.created_at
       FROM messages m
       JOIN users u ON u.id = m.sender_id
       WHERE m.conversation_id = ?
       ORDER BY m.created_at DESC, m.id DESC
       LIMIT ?`,
    )
    .bind(conversationId, limit)
    .all<MessageRow>();

  const rows = (results ?? []).reverse();
  if (rows.length === 0) return [];

  const attachmentsByMessage = await loadAttachments(
    db,
    rows.map((r) => r.id),
  );
  return rows.map((r) => ({
    ...r,
    attachments: attachmentsByMessage[r.id] ?? [],
  }));
}

/**
 * Insert a message at the client-reserved `messageId` (the client allocates it
 * before optimistic render so the broadcast echo reconciles with the optimistic
 * row instead of creating a duplicate). The server still owns `created_at`.
 * Optionally writes one attachment row (file-messages) and bumps the
 * conversation's updated_at so listConversations reflects recency. Returns the
 * full stored message so the caller can broadcast it.
 */
export async function insertMessage(
  db: D1Database,
  conversationId: string,
  messageId: string,
  senderId: string,
  kind: 'text' | 'file',
  body: string | null,
  attachment: NewAttachment | null,
  now: number,
): Promise<MessageWithAttachments | null> {
  const id = messageId;
  const statements: D1PreparedStatement[] = [
    db
      .prepare(
        `INSERT INTO messages (id, conversation_id, sender_id, kind, body, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .bind(id, conversationId, senderId, kind, body, now),
    db
      .prepare(`UPDATE conversations SET updated_at = ? WHERE id = ?`)
      .bind(now, conversationId),
  ];
  if (attachment) {
    statements.push(
      db
        .prepare(
          `INSERT INTO message_attachments
             (id, message_id, r2_key, bucket, file_name, mime_type, file_size, width, height)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          crypto.randomUUID(),
          id,
          attachment.r2Key,
          attachment.bucket,
          attachment.fileName,
          attachment.mimeType,
          attachment.fileSize,
          attachment.width,
          attachment.height,
        ),
    );
  }
  await db.batch(statements);
  return getMessage(db, id);
}

/** A single message with sender name + attachments (for post-insert broadcast). */
export async function getMessage(
  db: D1Database,
  messageId: string,
): Promise<MessageWithAttachments | null> {
  const row = await db
    .prepare(
      `SELECT m.id, m.conversation_id, m.sender_id, u.display_name AS sender_name,
              m.kind, m.body, m.created_at
       FROM messages m
       JOIN users u ON u.id = m.sender_id
       WHERE m.id = ?`,
    )
    .bind(messageId)
    .first<MessageRow>();
  if (!row) return null;
  const attachmentsByMessage = await loadAttachments(db, [messageId]);
  return { ...row, attachments: attachmentsByMessage[messageId] ?? [] };
}

/** Attachment rows for a set of message ids, keyed by message id. */
async function loadAttachments(
  db: D1Database,
  messageIds: string[],
): Promise<Record<string, AttachmentRow[]>> {
  if (messageIds.length === 0) return {};
  const placeholders = messageIds.map(() => '?').join(',');
  const { results } = await db
    .prepare(
      `SELECT id, message_id, r2_key, bucket, file_name, mime_type, file_size, width, height
       FROM message_attachments
       WHERE message_id IN (${placeholders})`,
    )
    .bind(...messageIds)
    .all<AttachmentRow>();

  const out: Record<string, AttachmentRow[]> = {};
  for (const a of results ?? []) {
    (out[a.message_id] ??= []).push(a);
  }
  return out;
}

export async function isMember(
  db: D1Database,
  conversationId: string,
  userId: string,
): Promise<boolean> {
  const row = await db
    .prepare(
      `SELECT 1 FROM conversation_members WHERE conversation_id = ? AND user_id = ?`,
    )
    .bind(conversationId, userId)
    .first();
  return row != null;
}

export async function getConversation(
  db: D1Database,
  conversationId: string,
): Promise<ConversationRow | null> {
  return db
    .prepare(`SELECT * FROM conversations WHERE id = ?`)
    .bind(conversationId)
    .first<ConversationRow>();
}

export async function getMembers(
  db: D1Database,
  conversationId: string,
): Promise<MemberRow[]> {
  const { results } = await db
    .prepare(
      `SELECT m.user_id, u.display_name, m.joined_at
       FROM conversation_members m
       JOIN users u ON u.id = m.user_id
       WHERE m.conversation_id = ?
       ORDER BY m.joined_at ASC`,
    )
    .bind(conversationId)
    .all<MemberRow>();
  return results ?? [];
}

/** Conversations the user belongs to, each with its full member list. */
export async function listConversations(
  db: D1Database,
  userId: string,
): Promise<(ConversationRow & { members: MemberRow[] })[]> {
  const { results } = await db
    .prepare(
      `SELECT c.*
       FROM conversations c
       JOIN conversation_members m
         ON m.conversation_id = c.id AND m.user_id = ?
       ORDER BY c.updated_at DESC`,
    )
    .bind(userId)
    .all<ConversationRow>();

  const conversations = results ?? [];
  return Promise.all(
    conversations.map(async (c) => ({
      id: c.id,
      kind: c.kind,
      dm_key: c.dm_key,
      title: c.title,
      created_at: c.created_at,
      updated_at: c.updated_at,
      members: await getMembers(db, c.id),
    })),
  );
}
