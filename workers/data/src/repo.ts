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
  role: string;
  status: string;
  joined_at: number;
  last_read_at: number;
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
      `INSERT INTO conversation_members (conversation_id, user_id, role, status, joined_at, last_read_at)
       VALUES (?, ?, 'member', 'active', ?, 0)
       ON CONFLICT(conversation_id, user_id) DO NOTHING`,
    )
    .bind(conversationId, userId, now);
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
      `SELECT m.user_id, u.display_name, m.role, m.status, m.joined_at, m.last_read_at
       FROM conversation_members m
       JOIN users u ON u.id = m.user_id
       WHERE m.conversation_id = ?
       ORDER BY m.joined_at ASC`,
    )
    .bind(conversationId)
    .all<MemberRow>();
  return results ?? [];
}

// ─── Messages ──────────────────────────────────────────────────────────────

export interface MessageRow {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string | null;
  kind: string;
  body: string | null;
  created_at: number;
}

/** emoji -> userId -> true (matches the client ReactionMap wire shape). */
export type ReactionMap = Record<string, Record<string, true>>;

/** Default recent-window size; mirrors the RTDB adapter's window intent. */
export const RECENT_MESSAGES_WINDOW = 50;

/**
 * Recent messages for a conversation, oldest-first (newest last), capped at
 * `limit`. Each row carries the sender's current display_name (joined) and its
 * reaction map (batched lookup), so the client renders without extra round-trips.
 */
export async function loadMessages(
  db: D1Database,
  conversationId: string,
  limit: number,
): Promise<(MessageRow & { reactions: ReactionMap })[]> {
  // Newest `limit` by created_at, then re-sorted ascending for display.
  const { results } = await db
    .prepare(
      `SELECT m.id, m.conversation_id, m.sender_id, u.display_name AS sender_name,
              m.kind, m.body, m.created_at
       FROM messages m
       JOIN users u ON u.id = m.sender_id
       WHERE m.conversation_id = ?
       ORDER BY m.created_at DESC
       LIMIT ?`,
    )
    .bind(conversationId, limit)
    .all<MessageRow>();

  const rows = (results ?? []).reverse();
  if (rows.length === 0) return [];

  const reactionsByMessage = await loadReactions(
    db,
    rows.map((r) => r.id),
  );
  return rows.map((r) => ({ ...r, reactions: reactionsByMessage[r.id] ?? {} }));
}

/** Insert a message. Server allocates the canonical id and timestamp. */
export async function insertMessage(
  db: D1Database,
  conversationId: string,
  senderId: string,
  kind: string,
  body: string | null,
  now: number,
): Promise<{ id: string; sentAt: number }> {
  const id = crypto.randomUUID();
  await db.batch([
    db
      .prepare(
        `INSERT INTO messages (id, conversation_id, sender_id, kind, body, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .bind(id, conversationId, senderId, kind, body, now),
    // Bump conversation ordering so listConversations reflects recency.
    db
      .prepare(`UPDATE conversations SET updated_at = ? WHERE id = ?`)
      .bind(now, conversationId),
  ]);
  return { id, sentAt: now };
}

/** Set the caller's read marker for a conversation to `now`. */
export async function markConversationRead(
  db: D1Database,
  conversationId: string,
  userId: string,
  now: number,
): Promise<void> {
  await db
    .prepare(
      `UPDATE conversation_members SET last_read_at = ?
       WHERE conversation_id = ? AND user_id = ?`,
    )
    .bind(now, conversationId, userId)
    .run();
}

export interface ConversationActivity {
  latestSentAt: number;
  latestSenderId: string | null;
  lastReadAt: number;
}

/**
 * Activity snapshot for the unread badge + list ordering: latest message
 * timestamp/sender plus the caller's last_read_at. Zeroes mean "no data yet."
 */
export async function getConversationActivity(
  db: D1Database,
  conversationId: string,
  userId: string,
): Promise<ConversationActivity> {
  const latest = await db
    .prepare(
      `SELECT sender_id, created_at FROM messages
       WHERE conversation_id = ?
       ORDER BY created_at DESC LIMIT 1`,
    )
    .bind(conversationId)
    .first<{ sender_id: string; created_at: number }>();

  const member = await db
    .prepare(
      `SELECT last_read_at FROM conversation_members
       WHERE conversation_id = ? AND user_id = ?`,
    )
    .bind(conversationId, userId)
    .first<{ last_read_at: number }>();

  return {
    latestSentAt: latest?.created_at ?? 0,
    latestSenderId: latest?.sender_id ?? null,
    lastReadAt: member?.last_read_at ?? 0,
  };
}

/** Add or remove a single (message, user, emoji) reaction. */
export async function setReaction(
  db: D1Database,
  messageId: string,
  userId: string,
  emoji: string,
  active: boolean,
): Promise<void> {
  if (active) {
    await db
      .prepare(
        `INSERT INTO message_reactions (message_id, user_id, emoji)
         VALUES (?, ?, ?) ON CONFLICT DO NOTHING`,
      )
      .bind(messageId, userId, emoji)
      .run();
  } else {
    await db
      .prepare(
        `DELETE FROM message_reactions
         WHERE message_id = ? AND user_id = ? AND emoji = ?`,
      )
      .bind(messageId, userId, emoji)
      .run();
  }
}

/** Reaction maps for a set of message ids, keyed by message id. */
async function loadReactions(
  db: D1Database,
  messageIds: string[],
): Promise<Record<string, ReactionMap>> {
  if (messageIds.length === 0) return {};
  const placeholders = messageIds.map(() => '?').join(',');
  const { results } = await db
    .prepare(
      `SELECT message_id, user_id, emoji FROM message_reactions
       WHERE message_id IN (${placeholders})`,
    )
    .bind(...messageIds)
    .all<{ message_id: string; user_id: string; emoji: string }>();

  const out: Record<string, ReactionMap> = {};
  for (const r of results ?? []) {
    const byEmoji = (out[r.message_id] ??= {});
    (byEmoji[r.emoji] ??= {})[r.user_id] = true;
  }
  return out;
}

/** Conversations the user belongs to, each with its full member list. */
/** Conversation row joined with the caller's read marker + latest-message info. */
interface ConversationListRow extends ConversationRow {
  last_read_at: number;
  latest_sent_at: number | null;
  latest_sender_id: string | null;
}

export async function listConversations(
  db: D1Database,
  userId: string,
): Promise<
  (ConversationRow & { members: MemberRow[]; activity: ConversationActivity })[]
> {
  // One query per list: conversation + the caller's last_read_at + the latest
  // message's timestamp/sender (correlated subqueries). The unread badge and
  // list ordering derive from `activity` alone. (Members are still fetched
  // per-conversation below — acceptable for the PoC; revisit if it bites.)
  const { results } = await db
    .prepare(
      `SELECT c.*,
              m.last_read_at AS last_read_at,
              (SELECT created_at FROM messages
                 WHERE conversation_id = c.id
                 ORDER BY created_at DESC LIMIT 1) AS latest_sent_at,
              (SELECT sender_id FROM messages
                 WHERE conversation_id = c.id
                 ORDER BY created_at DESC LIMIT 1) AS latest_sender_id
       FROM conversations c
       JOIN conversation_members m
         ON m.conversation_id = c.id AND m.user_id = ?
       ORDER BY c.updated_at DESC`,
    )
    .bind(userId)
    .all<ConversationListRow>();

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
      activity: {
        latestSentAt: c.latest_sent_at ?? 0,
        latestSenderId: c.latest_sender_id ?? null,
        lastReadAt: c.last_read_at ?? 0,
      },
    })),
  );
}
