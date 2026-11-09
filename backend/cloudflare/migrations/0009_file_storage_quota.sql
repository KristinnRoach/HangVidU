CREATE TABLE file_storage_usage (
  object_key TEXT PRIMARY KEY,
  size_bytes INTEGER NOT NULL CHECK (size_bytes >= 0)
);
CREATE TABLE file_storage_quota_state (
  id INTEGER PRIMARY KEY CHECK (id = 1)
);
