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

/**
 * Stub a `users` row if absent (display_name backfilled on that user's login).
 * Mirrors resolveOrCreateDirect — lets contacts/requests reference a user who
 * hasn't hit this worker yet without tripping the FK.
 */
function ensureUserStub(
  db: D1Database,
  userId: string,
  now: number,
): D1PreparedStatement {
  return db
    .prepare(
      `INSERT INTO users (id, display_name, created_at) VALUES (?, NULL, ?)
       ON CONFLICT(id) DO NOTHING`,
    )
    .bind(userId, now);
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
  if (!row)
    throw new Error(
      'resolveOrCreateDirect: conversation not found after upsert',
    );
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

// --- users: profile + directory ---------------------------------------------

export interface UserProfileRow {
  id: string;
  display_name: string | null;
  photo_url: string | null;
  username: string | null;
  email_hash: string | null;
  discoverable: number; // 0 | 1 (SQLite has no bool)
  registered_at: number | null;
  created_at: number;
}

export async function getProfile(
  db: D1Database,
  userId: string,
): Promise<UserProfileRow | null> {
  return db
    .prepare(`SELECT * FROM users WHERE id = ?`)
    .bind(userId)
    .first<UserProfileRow>();
}

export interface ProfilePatch {
  displayName?: string | null;
  photoUrl?: string | null;
  username?: string | null;
  emailHash?: string | null;
}

/**
 * Update the caller's own profile columns. Only provided fields are touched
 * (COALESCE keeps the existing value when the bind is null-sentinel). The row is
 * guaranteed to exist — handlers upsertUser the caller first. `registered_at` is
 * stamped once on the first profile write (the D1 equivalent of the old RTDB
 * registerUserInDirectory) and preserved thereafter.
 */
export async function updateProfile(
  db: D1Database,
  userId: string,
  patch: ProfilePatch,
  now: number,
): Promise<UserProfileRow | null> {
  await db
    .prepare(
      `UPDATE users SET
         display_name  = COALESCE(?, display_name),
         photo_url     = COALESCE(?, photo_url),
         username      = COALESCE(?, username),
         email_hash    = COALESCE(?, email_hash),
         registered_at = COALESCE(registered_at, ?)
       WHERE id = ?`,
    )
    .bind(
      patch.displayName ?? null,
      patch.photoUrl ?? null,
      patch.username ?? null,
      patch.emailHash ?? null,
      now,
      userId,
    )
    .run();
  return getProfile(db, userId);
}

export async function setDiscoverable(
  db: D1Database,
  userId: string,
  discoverable: boolean,
): Promise<void> {
  await db
    .prepare(`UPDATE users SET discoverable = ? WHERE id = ?`)
    .bind(discoverable ? 1 : 0, userId)
    .run();
}

/**
 * Best-effort handle-collision check (soft, app-level — username has no DB
 * UNIQUE this pass). Returns true if a *different* user already claims it.
 * Tolerates the rare claim race; tighten to a DB UNIQUE after real usage.
 */
export async function isHandleTaken(
  db: D1Database,
  username: string,
  exceptUserId: string,
): Promise<boolean> {
  const row = await db
    .prepare(`SELECT 1 FROM users WHERE username = ? AND id != ? LIMIT 1`)
    .bind(username, exceptUserId)
    .first();
  return row != null;
}

/**
 * Directory lookup. Returns an ARRAY (identifier-agnostic contract — keep it
 * even though the soft-unique handle yields at most one today) of discoverable
 * users matching the exact handle. Email-hash lookup is the parallel path.
 */
export async function lookupByHandle(
  db: D1Database,
  username: string,
): Promise<UserProfileRow[]> {
  const { results } = await db
    .prepare(
      `SELECT * FROM users WHERE username = ? AND discoverable = 1`,
    )
    .bind(username)
    .all<UserProfileRow>();
  return results ?? [];
}

export async function lookupByEmailHash(
  db: D1Database,
  emailHash: string,
): Promise<UserProfileRow[]> {
  const { results } = await db
    .prepare(
      `SELECT * FROM users WHERE email_hash = ? AND discoverable = 1`,
    )
    .bind(emailHash)
    .all<UserProfileRow>();
  return results ?? [];
}

// --- contacts ---------------------------------------------------------------

export interface ContactRow {
  owner_id: string;
  contact_id: string;
  nickname: string;
  conversation_id: string | null;
  saved_at: number;
  last_interaction_at: number;
}

export async function getContact(
  db: D1Database,
  ownerId: string,
  contactId: string,
): Promise<ContactRow | null> {
  return db
    .prepare(`SELECT * FROM contacts WHERE owner_id = ? AND contact_id = ?`)
    .bind(ownerId, contactId)
    .first<ContactRow>();
}

export async function listContacts(
  db: D1Database,
  ownerId: string,
): Promise<ContactRow[]> {
  const { results } = await db
    .prepare(
      `SELECT * FROM contacts WHERE owner_id = ? ORDER BY saved_at ASC`,
    )
    .bind(ownerId)
    .all<ContactRow>();
  return results ?? [];
}

export interface NewContact {
  contactId: string;
  nickname: string;
  conversationId: string | null;
  savedAt: number;
  lastInteractionAt: number;
}

/** Insert-or-replace one contact owned by `ownerId`. */
export function contactUpsert(
  db: D1Database,
  ownerId: string,
  c: NewContact,
): D1PreparedStatement {
  return db
    .prepare(
      `INSERT INTO contacts
         (owner_id, contact_id, nickname, conversation_id, saved_at, last_interaction_at)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(owner_id, contact_id) DO UPDATE SET
         nickname            = excluded.nickname,
         conversation_id     = excluded.conversation_id,
         saved_at            = excluded.saved_at,
         last_interaction_at = excluded.last_interaction_at`,
    )
    .bind(
      ownerId,
      c.contactId,
      c.nickname,
      c.conversationId,
      c.savedAt,
      c.lastInteractionAt,
    );
}

function contactConnectUpsert(
  db: D1Database,
  ownerId: string,
  c: NewContact,
): D1PreparedStatement {
  return db
    .prepare(
      `INSERT INTO contacts
         (owner_id, contact_id, nickname, conversation_id, saved_at, last_interaction_at)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(owner_id, contact_id) DO UPDATE SET
         conversation_id     = excluded.conversation_id,
         last_interaction_at = excluded.last_interaction_at`,
    )
    .bind(
      ownerId,
      c.contactId,
      c.nickname,
      c.conversationId,
      c.savedAt,
      c.lastInteractionAt,
    );
}

export async function putContact(
  db: D1Database,
  ownerId: string,
  c: NewContact,
  now: number,
): Promise<void> {
  await db.batch([ensureUserStub(db, c.contactId, now), contactUpsert(db, ownerId, c)]);
}

export async function connectUsers(
  db: D1Database,
  a: string,
  b: string,
  now: number,
): Promise<string> {
  // ponytail: eager create now; switch to lazy-on-first-message if contact counts ever grow.
  const conversationId = await resolveOrCreateDirect(db, a, b, now);
  await db.batch([
    contactConnectUpsert(db, a, {
      contactId: b,
      nickname: '',
      conversationId,
      savedAt: now,
      lastInteractionAt: now,
    }),
    contactConnectUpsert(db, b, {
      contactId: a,
      nickname: '',
      conversationId,
      savedAt: now,
      lastInteractionAt: now,
    }),
  ]);
  return conversationId;
}

export interface ContactPatch {
  nickname?: string;
  conversationId?: string | null;
  lastInteractionAt?: number;
}

/** Partial update; null sentinel via COALESCE leaves unprovided fields intact. */
export async function patchContact(
  db: D1Database,
  ownerId: string,
  contactId: string,
  patch: ContactPatch,
): Promise<ContactRow | null> {
  const exists = await db
    .prepare(`SELECT 1 FROM contacts WHERE owner_id = ? AND contact_id = ?`)
    .bind(ownerId, contactId)
    .first();
  if (!exists) return null;
  await db
    .prepare(
      `UPDATE contacts SET
         nickname            = COALESCE(?, nickname),
         conversation_id     = COALESCE(?, conversation_id),
         last_interaction_at = COALESCE(?, last_interaction_at)
       WHERE owner_id = ? AND contact_id = ?`,
    )
    .bind(
      patch.nickname ?? null,
      patch.conversationId ?? null,
      patch.lastInteractionAt ?? null,
      ownerId,
      contactId,
    )
    .run();
  return db
    .prepare(`SELECT * FROM contacts WHERE owner_id = ? AND contact_id = ?`)
    .bind(ownerId, contactId)
    .first<ContactRow>();
}

export async function removeContact(
  db: D1Database,
  ownerId: string,
  contactId: string,
): Promise<void> {
  await db
    .prepare(`DELETE FROM contacts WHERE owner_id = ? AND contact_id = ?`)
    .bind(ownerId, contactId)
    .run();
}

// --- contact requests (the request/accept handshake) ------------------------

export interface ContactRequestRow {
  from_id: string;
  to_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: number;
  from_name?: string | null; // joined in list queries
}

/**
 * Create (or re-open) a pending request. ON CONFLICT resets to pending so a
 * re-send after a decline works; an already-accepted pair is left accepted.
 */
export async function createRequest(
  db: D1Database,
  fromId: string,
  toId: string,
  now: number,
): Promise<void> {
  await db.batch([
    ensureUserStub(db, toId, now),
    db
      .prepare(
        `INSERT INTO contact_requests (from_id, to_id, status, created_at)
         VALUES (?, ?, 'pending', ?)
         ON CONFLICT(from_id, to_id) DO UPDATE SET
           status     = CASE WHEN contact_requests.status = 'accepted'
                             THEN 'accepted' ELSE 'pending' END,
           created_at = excluded.created_at`,
      )
      .bind(fromId, toId, now),
  ]);
}

/** Pending requests addressed to `toId`, newest first, with sender name. */
export async function listIncomingRequests(
  db: D1Database,
  toId: string,
): Promise<ContactRequestRow[]> {
  const { results } = await db
    .prepare(
      `SELECT r.from_id, r.to_id, r.status, r.created_at,
              u.display_name AS from_name
       FROM contact_requests r
       JOIN users u ON u.id = r.from_id
       WHERE r.to_id = ? AND r.status = 'pending'
       ORDER BY r.created_at DESC`,
    )
    .bind(toId)
    .all<ContactRequestRow>();
  return results ?? [];
}

/**
 * Accept the request `fromId → toId`: mark it accepted and save the contact on
 * BOTH sides in one batch (the handshake's whole point). Idempotent re-accept is
 * a no-op overwrite. Returns false if no such pending/accepted request exists.
 */
export async function acceptRequest(
  db: D1Database,
  toId: string,
  fromId: string,
  now: number,
): Promise<string | null> {
  const req = await db
    .prepare(
      `SELECT 1 FROM contact_requests WHERE from_id = ? AND to_id = ? AND status = 'pending'`,
    )
    .bind(fromId, toId)
    .first();
  if (!req) return null;

  const conversationId = await connectUsers(db, toId, fromId, now);
  await db
    .prepare(
      `UPDATE contact_requests SET status = 'accepted'
       WHERE from_id = ? AND to_id = ?`,
    )
    .bind(fromId, toId)
    .run();
  return conversationId;
}

export async function declineRequest(
  db: D1Database,
  toId: string,
  fromId: string,
): Promise<boolean> {
  const res = await db
    .prepare(
      `UPDATE contact_requests SET status = 'declined'
       WHERE from_id = ? AND to_id = ? AND status = 'pending'`,
    )
    .bind(fromId, toId)
    .run();
  return (res.meta.changes ?? 0) > 0;
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

export interface ReactionSummary {
  key: string;
  count: number;
  reactedByMe: boolean;
}

export type MessageWithAttachments = MessageRow & {
  attachments: AttachmentRow[];
  reactions: ReactionSummary[];
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
  myUserId: string,
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
  const reactionsByMessage = await loadReactionSummaries(
    db,
    rows.map((r) => r.id),
    myUserId,
  );
  return rows.map((r) => ({
    ...r,
    attachments: attachmentsByMessage[r.id] ?? [],
    reactions: reactionsByMessage[r.id] ?? [],
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
async function getMessage(
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
  return {
    ...row,
    attachments: attachmentsByMessage[messageId] ?? [],
    reactions: [],
  };
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

// --- reactions --------------------------------------------------------------

export async function setMyReaction(
  db: D1Database,
  conversationId: string,
  messageId: string,
  userId: string,
  reactionKey: string | null,
): Promise<ReactionSummary[] | null> {
  const message = await db
    .prepare(`SELECT 1 FROM messages WHERE id = ? AND conversation_id = ?`)
    .bind(messageId, conversationId)
    .first();
  if (!message) return null;

  if (reactionKey === null) {
    await db
      .prepare(`DELETE FROM message_reactions WHERE message_id = ? AND user_id = ?`)
      .bind(messageId, userId)
      .run();
  } else {
    await db
      .prepare(
        `INSERT INTO message_reactions (message_id, user_id, reaction_key)
         VALUES (?, ?, ?)
         ON CONFLICT(message_id, user_id) DO UPDATE SET
           reaction_key = excluded.reaction_key`,
      )
      .bind(messageId, userId, reactionKey)
      .run();
  }

  return getReactionSummaries(db, messageId, userId);
}

export async function getReactionSummaries(
  db: D1Database,
  messageId: string,
  myUserId: string,
): Promise<ReactionSummary[]> {
  const { results } = await db
    .prepare(
      `SELECT reaction_key AS key,
              COUNT(*) AS count,
              MAX(CASE WHEN user_id = ? THEN 1 ELSE 0 END) AS reacted_by_me
       FROM message_reactions
       WHERE message_id = ?
       GROUP BY reaction_key
       ORDER BY reaction_key`,
    )
    .bind(myUserId, messageId)
    .all<{ key: string; count: number; reacted_by_me: number }>();

  return (results ?? []).map((row) => ({
    key: row.key,
    count: row.count,
    reactedByMe: row.reacted_by_me === 1,
  }));
}

async function loadReactionSummaries(
  db: D1Database,
  messageIds: string[],
  myUserId: string,
): Promise<Record<string, ReactionSummary[]>> {
  if (messageIds.length === 0) return {};
  const placeholders = messageIds.map(() => '?').join(',');
  const { results } = await db
    .prepare(
      `SELECT message_id, reaction_key AS key,
              COUNT(*) AS count,
              MAX(CASE WHEN user_id = ? THEN 1 ELSE 0 END) AS reacted_by_me
       FROM message_reactions
       WHERE message_id IN (${placeholders})
       GROUP BY message_id, reaction_key
       ORDER BY message_id, reaction_key`,
    )
    .bind(myUserId, ...messageIds)
    .all<{
      message_id: string;
      key: string;
      count: number;
      reacted_by_me: number;
    }>();

  const out: Record<string, ReactionSummary[]> = {};
  for (const row of results ?? []) {
    (out[row.message_id] ??= []).push({
      key: row.key,
      count: row.count,
      reactedByMe: row.reacted_by_me === 1,
    });
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
): Promise<
  (ConversationRow & {
    members: MemberRow[];
    latest_sent_at: number | null;
    latest_sender_id: string | null;
  })[]
> {
  // latest_* feed the conversation list's MRU sort + unread badge (last message
  // time + who sent it). ponytail: per-conversation correlated subqueries —
  // fine at current scale; fold into a grouped join if the list grows large.
  const { results } = await db
    .prepare(
      `SELECT c.*,
              (SELECT msg.created_at FROM messages msg
                WHERE msg.conversation_id = c.id
                ORDER BY msg.created_at DESC, msg.id DESC LIMIT 1) AS latest_sent_at,
              (SELECT msg.sender_id FROM messages msg
                WHERE msg.conversation_id = c.id
                ORDER BY msg.created_at DESC, msg.id DESC LIMIT 1) AS latest_sender_id
       FROM conversations c
       JOIN conversation_members m
         ON m.conversation_id = c.id AND m.user_id = ?
       ORDER BY c.updated_at DESC`,
    )
    .bind(userId)
    .all<
      ConversationRow & {
        latest_sent_at: number | null;
        latest_sender_id: string | null;
      }
    >();

  const conversations = results ?? [];
  return Promise.all(
    conversations.map(async (c) => ({
      id: c.id,
      kind: c.kind,
      dm_key: c.dm_key,
      title: c.title,
      created_at: c.created_at,
      updated_at: c.updated_at,
      latest_sent_at: c.latest_sent_at,
      latest_sender_id: c.latest_sender_id,
      members: await getMembers(db, c.id),
    })),
  );
}
