-- Slice "messages + files on opaque ids" — message layer.
-- Builds on 0001 (users, conversations, conversation_members). 0001 is applied
-- to remote D1 and MUST NOT be edited — all new tables/columns live here.
-- Tables plural, columns singular. IDs opaque UUID v4; ordering from created_at.
-- D1 always enforces FKs (no PRAGMA needed).
--
-- Scope: text + file messages with live push. Reactions and read-receipts are
-- deferred; their table/column (message_reactions, last_read_at) are NOT
-- pre-provisioned — adding a table/column is a cheap non-destructive migration,
-- so they land with the fast-follow that actually uses them. CHECK constraints,
-- by contrast, can only be added via a full table rebuild, so they go in at
-- creation here while these tables hold no rows in prod.

CREATE TABLE messages (
  id              TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id       TEXT NOT NULL REFERENCES users(id),
  kind            TEXT NOT NULL CHECK (kind IN ('text', 'file')),
  body            TEXT,
  created_at      INTEGER NOT NULL,
  -- A text message must carry a body; file messages may omit it.
  CHECK (kind <> 'text' OR body IS NOT NULL)
);
CREATE INDEX idx_messages_convo_time ON messages(conversation_id, created_at);

CREATE TABLE message_attachments (
  id         TEXT PRIMARY KEY,
  message_id TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  r2_key     TEXT NOT NULL,                        -- "{conversation_id}/{file_id}"
  bucket     TEXT NOT NULL,                        -- R2 bucket (schema requires non-empty)
  file_name  TEXT NOT NULL,
  mime_type  TEXT NOT NULL,
  file_size  INTEGER NOT NULL CHECK (file_size > 0),
  width      INTEGER CHECK (width IS NULL OR width > 0),   -- natural px, nullable
  height     INTEGER CHECK (height IS NULL OR height > 0)  -- natural px, nullable
);
CREATE INDEX idx_attachments_message ON message_attachments(message_id);
