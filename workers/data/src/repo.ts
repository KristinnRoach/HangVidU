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
      `INSERT INTO conversation_members (conversation_id, user_id, role, status, joined_at)
       VALUES (?, ?, 'member', 'active', ?)
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
      `SELECT m.user_id, u.display_name, m.role, m.status, m.joined_at
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
