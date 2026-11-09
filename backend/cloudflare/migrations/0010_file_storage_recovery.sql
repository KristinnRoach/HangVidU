CREATE TABLE file_storage_quota_inventory (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  cursor TEXT,
  version INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE file_storage_pending_deletions (
  object_key TEXT PRIMARY KEY,
  uploaded_by TEXT NOT NULL
);
