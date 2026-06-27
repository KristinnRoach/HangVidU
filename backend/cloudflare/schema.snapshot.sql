-- HangVidU — Cloudflare D1 target schema after 0006_users_profile.sql
-- (production database: hangvidu-data,
-- id cfac7c1c-cb3c-430d-b33d-6fd12aac48d0). SQLite dialect, served by D1.
-- Schema only, no data. Generated locally after applying migrations:
--   0001_init.sql, 0002_messages.sql, 0003_drop_member_status.sql, 0004_drop_member_role.sql, 0005_message_reactions.sql, 0006_users_profile.sql
-- D1 enforces FOREIGN KEY constraints. Engine pragmas/AUTOINCREMENT are D1-managed.

CREATE TABLE contact_requests (
  from_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status      TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at  INTEGER NOT NULL,
  resolved_at INTEGER,
  CHECK (from_id != to_id),
  PRIMARY KEY (from_id, to_id)
);
CREATE INDEX idx_contact_requests_from
  ON contact_requests(from_id, status, created_at DESC);
CREATE INDEX idx_contact_requests_to
  ON contact_requests(to_id, status, created_at DESC);

CREATE TABLE contacts (
  owner_id            TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  contact_id          TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  nickname            TEXT NOT NULL DEFAULT '',
  conversation_id     TEXT REFERENCES conversations(id) ON DELETE SET NULL,
  saved_at            INTEGER NOT NULL,
  last_interaction_at INTEGER NOT NULL,
  CHECK (owner_id != contact_id),
  PRIMARY KEY (owner_id, contact_id)
);

CREATE TABLE conversation_members (
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id         TEXT NOT NULL REFERENCES users(id)         ON DELETE CASCADE,
  joined_at       INTEGER NOT NULL,
  PRIMARY KEY (conversation_id, user_id)
);
CREATE INDEX idx_members_user ON conversation_members(user_id);

CREATE TABLE conversations (
  id         TEXT PRIMARY KEY,
  kind       TEXT NOT NULL CHECK (kind IN ('direct', 'group')),
  dm_key     TEXT UNIQUE,
  title      TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

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

CREATE TABLE message_reactions (
  message_id   TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reaction_key TEXT NOT NULL CHECK (length(reaction_key) BETWEEN 1 AND 64),
  PRIMARY KEY (message_id, user_id)
);
CREATE INDEX idx_message_reactions_user ON message_reactions(user_id);

CREATE TABLE messages (
  id              TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id       TEXT NOT NULL REFERENCES users(id),
  kind            TEXT NOT NULL CHECK (kind IN ('text', 'file')),
  body            TEXT,
  created_at      INTEGER NOT NULL,
  
  CHECK (kind <> 'text' OR body IS NOT NULL)
);
CREATE INDEX idx_messages_convo_time ON messages(conversation_id, created_at);

CREATE TABLE users (
  id           TEXT PRIMARY KEY,
  display_name TEXT,
  created_at   INTEGER NOT NULL
, photo_url     TEXT, username      TEXT, email_hash    TEXT, discoverable  INTEGER NOT NULL DEFAULT 1
  CHECK (discoverable IN (0, 1)), registered_at INTEGER);
CREATE UNIQUE INDEX idx_users_email_hash ON users(email_hash);
CREATE UNIQUE INDEX idx_users_username
  ON users(username)
  WHERE username IS NOT NULL;
