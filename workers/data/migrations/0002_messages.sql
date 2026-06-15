-- Slice "messages + files on opaque ids" — message layer.
-- Builds on 0001 (users, conversations, conversation_members). 0001 is applied
-- to remote D1 and MUST NOT be edited — all new tables/columns live here.
-- Tables plural, columns singular. IDs opaque UUID v4; ordering from created_at.
-- D1 always enforces FKs (no PRAGMA needed).
--
-- Scope note (decision 2026-06-15 #5): `message_reactions` and the
-- `last_read_at` column ship in this migration so the reactions + read-receipt
-- fast-follow needs no further migration, but their endpoints/UI are out of
-- scope for the current PR.

CREATE TABLE messages (
  id              TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id       TEXT NOT NULL REFERENCES users(id),
  kind            TEXT NOT NULL CHECK (kind IN ('text', 'file')),
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
  file_size  INTEGER NOT NULL,
  width      INTEGER,                              -- natural px, nullable (decision #7)
  height     INTEGER                               -- natural px, nullable (decision #7)
);
CREATE INDEX idx_attachments_message ON message_attachments(message_id);

CREATE TABLE message_reactions (
  message_id TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id    TEXT NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
  emoji      TEXT NOT NULL,
  PRIMARY KEY (message_id, user_id, emoji)
);

-- Read receipts (fast-follow consumer). 0 = never read.
ALTER TABLE conversation_members ADD COLUMN last_read_at INTEGER NOT NULL DEFAULT 0;
