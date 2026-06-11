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
  PRIMARY KEY (conversation_id, user_id)
);
CREATE INDEX idx_members_user ON conversation_members(user_id);
