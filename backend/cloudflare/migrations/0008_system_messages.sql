-- Persist conversation system messages in the same ordered stream as user
-- messages. Rebuild the parent and its two FK children because SQLite cannot
-- widen the existing messages.kind CHECK constraint in place.

CREATE TABLE message_attachments_backup AS SELECT * FROM message_attachments;
CREATE TABLE message_reactions_backup AS SELECT * FROM message_reactions;

DROP TABLE message_attachments;
DROP TABLE message_reactions;
DROP INDEX idx_messages_convo_time;

ALTER TABLE messages RENAME TO messages_legacy;

CREATE TABLE messages (
  id              TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id       TEXT NOT NULL REFERENCES users(id),
  kind            TEXT NOT NULL CHECK (kind IN ('text', 'file', 'system')),
  body            TEXT,
  system_type     TEXT CHECK (system_type IS NULL OR length(system_type) > 0),
  created_at      INTEGER NOT NULL,
  CHECK (kind <> 'text' OR body IS NOT NULL),
  CHECK ((kind = 'system') = (system_type IS NOT NULL))
);
CREATE INDEX idx_messages_convo_time ON messages(conversation_id, created_at);

INSERT INTO messages (id, conversation_id, sender_id, kind, body, system_type, created_at)
SELECT id, conversation_id, sender_id, kind, body, NULL, created_at
FROM messages_legacy;

DROP TABLE messages_legacy;

CREATE TABLE message_attachments (
  id         TEXT PRIMARY KEY,
  message_id TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  r2_key     TEXT NOT NULL,
  bucket     TEXT NOT NULL,
  file_name  TEXT NOT NULL,
  mime_type  TEXT NOT NULL,
  file_size  INTEGER NOT NULL CHECK (file_size > 0),
  width      INTEGER CHECK (width IS NULL OR width > 0),
  height     INTEGER CHECK (height IS NULL OR height > 0)
);
CREATE INDEX idx_attachments_message ON message_attachments(message_id);
INSERT INTO message_attachments SELECT * FROM message_attachments_backup;
DROP TABLE message_attachments_backup;

CREATE TABLE message_reactions (
  message_id   TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reaction_key TEXT NOT NULL CHECK (length(reaction_key) BETWEEN 1 AND 64),
  PRIMARY KEY (message_id, user_id)
);
CREATE INDEX idx_message_reactions_user ON message_reactions(user_id);
INSERT INTO message_reactions SELECT * FROM message_reactions_backup;
DROP TABLE message_reactions_backup;
