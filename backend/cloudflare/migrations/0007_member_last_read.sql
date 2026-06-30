-- Per-member, per-conversation read marker. Drives the conversation-list unread
-- badge cross-device (server-owned, replacing the per-device localStorage value
-- as the durable source). 0 = never read. Compared against message.created_at,
-- so it lives in the same server-clock domain.
ALTER TABLE conversation_members ADD COLUMN last_read_at INTEGER NOT NULL DEFAULT 0;
