-- Slice A — conversation-centric core schema.
-- Tables plural, columns singular. IDs are opaque UUID v4 (crypto.randomUUID()).
-- D1 enforces foreign keys by default (no PRAGMA needed); use
-- `PRAGMA defer_foreign_keys = on` only inside a migration txn that would
-- temporarily violate constraints.

CREATE TABLE users (
  id           TEXT PRIMARY KEY,
  display_name TEXT,
  created_at   INTEGER NOT NULL
);

-- The opaque conversation id is the spine. `dm_key` carries the DM-dedup rule
-- (sorted "a:b") demoted from identity to a lookup key; UNIQUE enforces one
-- canonical direct conversation per pair. NULL for groups (NULLs don't collide).
CREATE TABLE conversations (
  id         TEXT PRIMARY KEY,
  kind       TEXT NOT NULL CHECK (kind IN ('direct', 'group')),
  dm_key     TEXT UNIQUE,
  title      TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE conversation_members (
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id         TEXT NOT NULL REFERENCES users(id)         ON DELETE CASCADE,
  role            TEXT NOT NULL DEFAULT 'member',  -- owner | admin | member
  status          TEXT NOT NULL DEFAULT 'active',  -- active | left | removed
  joined_at       INTEGER NOT NULL,
  last_read_at    INTEGER NOT NULL DEFAULT 0,      -- unread-badge source
  PRIMARY KEY (conversation_id, user_id)
);
CREATE INDEX idx_members_user ON conversation_members(user_id);

CREATE TABLE messages (
  id              TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id       TEXT NOT NULL REFERENCES users(id),
  kind            TEXT NOT NULL,                   -- text | file | event | system
  body            TEXT,
  created_at      INTEGER NOT NULL
);
CREATE INDEX idx_messages_convo_time ON messages(conversation_id, created_at);

CREATE TABLE message_attachments (
  id         TEXT PRIMARY KEY,
  message_id TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  r2_key     TEXT NOT NULL,                        -- "{conversation_id}/{file_id}"
  file_name  TEXT NOT NULL,
  mime_type  TEXT NOT NULL,
  file_size  INTEGER NOT NULL
);
CREATE INDEX idx_attachments_message ON message_attachments(message_id);

CREATE TABLE message_reactions (
  message_id TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id    TEXT NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
  emoji      TEXT NOT NULL,
  PRIMARY KEY (message_id, user_id, emoji)
);
