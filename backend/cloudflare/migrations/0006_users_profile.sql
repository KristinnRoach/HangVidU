-- Users → D1 slice: extend the `users` table from a conversation side-effect stub
-- into the profile + directory of record, and add the contacts / contact-requests
-- tables that replace the RTDB user-scoped nodes.
--
-- Handle stays SOFT this pass: `username` gets a PLAIN index, NOT a UNIQUE
-- constraint. Uniqueness is a best-effort app-level check at claim time so the
-- identifier model can change after real usage with one follow-up migration.
-- `email_hash` IS unique (it's a stable derived key, not a user-chosen handle).

ALTER TABLE users ADD COLUMN photo_url     TEXT;
ALTER TABLE users ADD COLUMN username      TEXT;
ALTER TABLE users ADD COLUMN email_hash    TEXT;
ALTER TABLE users ADD COLUMN discoverable  INTEGER NOT NULL DEFAULT 1;
ALTER TABLE users ADD COLUMN registered_at INTEGER;

-- Plain (non-unique) index: directory lookup by handle, soft on purpose.
CREATE INDEX idx_users_username ON users(username);
-- Unique: email-hash is the one-account-per-email key (replaces usersByEmail/{hash}).
CREATE UNIQUE INDEX idx_users_email_hash ON users(email_hash);

-- Saved contacts. Columns mirror ContactRecordSchema in
-- src/storage/contacts/contact-schema.js (contactId → contact_id, etc.).
CREATE TABLE contacts (
  owner_id            TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  contact_id          TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  nickname            TEXT NOT NULL DEFAULT '',
  conversation_id     TEXT,
  saved_at            INTEGER NOT NULL,
  last_interaction_at INTEGER NOT NULL,
  PRIMARY KEY (owner_id, contact_id)
);

-- The request/accept handshake, collapsed from the RTDB
-- incomingInvites/acceptedInvites fan-out into one row per directed pair.
CREATE TABLE contact_requests (
  from_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status     TEXT NOT NULL DEFAULT 'pending'
               CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at INTEGER NOT NULL,
  PRIMARY KEY (from_id, to_id)
);
-- Recipient's incoming-request query (WHERE to_id = ? AND status = 'pending').
CREATE INDEX idx_contact_requests_to ON contact_requests(to_id, status);
