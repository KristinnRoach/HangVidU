// App-wide quota. All writers must use this ledger; dashboard/S3 uploads bypass it.
export const TOTAL_FILE_STORAGE_BYTES = 5 * 1024 * 1024 * 1024;

// Keep both the R2 response and the D1 transaction bounded per request.
const INVENTORY_PAGE_SIZE = 100;

/** Inventory one page; return false while subsequent requests must resume it. */
export async function initializeStorageQuota(
  db: D1Database,
  bucket: Pick<R2Bucket, 'list'>,
) {
  if (
    await db
      .prepare('SELECT id FROM file_storage_quota_state WHERE id = 1')
      .first()
  )
    return true;

  await db
    .prepare(
      'INSERT OR IGNORE INTO file_storage_quota_inventory (id) VALUES (1)',
    )
    .run();
  const progress = await db
    .prepare(
      'SELECT cursor, version FROM file_storage_quota_inventory WHERE id = 1',
    )
    .first<{ cursor: string | null; version: number }>();
  if (!progress) throw new Error('Storage inventory progress missing');
  const page = await bucket.list({
    cursor: progress.cursor ?? undefined,
    limit: INVENTORY_PAGE_SIZE,
  });

  // The page, readiness flag and cursor commit atomically. Each statement is
  // guarded by the version we read: a stale initializer cannot replay a page
  // after another request finishes initialization and starts deleting files.
  await db.batch([
    db
      .prepare(`
      INSERT OR IGNORE INTO file_storage_usage (object_key, size_bytes)
      SELECT json_extract(value, '$.key'), json_extract(value, '$.size')
      FROM json_each(?)
      WHERE EXISTS (SELECT 1 FROM file_storage_quota_inventory WHERE id = 1 AND version = ?)
        AND NOT EXISTS (SELECT 1 FROM file_storage_quota_state WHERE id = 1)
    `)
      .bind(
        JSON.stringify(page.objects.map(({ key, size }) => ({ key, size }))),
        progress.version,
      ),
    db
      .prepare(`
      INSERT OR IGNORE INTO file_storage_quota_state (id)
      SELECT 1 WHERE ? = 0
        AND EXISTS (SELECT 1 FROM file_storage_quota_inventory WHERE id = 1 AND version = ?)
    `)
      .bind(Number(page.truncated), progress.version),
    db
      .prepare(`
      UPDATE file_storage_quota_inventory SET cursor = ?, version = version + 1
      WHERE id = 1 AND version = ?
    `)
      .bind(page.truncated ? page.cursor : null, progress.version),
  ]);
  return Boolean(
    await db
      .prepare('SELECT id FROM file_storage_quota_state WHERE id = 1')
      .first(),
  );
}

export async function reserveFileStorage(
  db: D1Database,
  key: string,
  size: number,
) {
  // The check and reservation are one statement, serialized by D1 across Workers.
  const result = await db
    .prepare(`
    INSERT INTO file_storage_usage (object_key, size_bytes)
    SELECT ?, ? WHERE EXISTS (SELECT 1 FROM file_storage_quota_state WHERE id = 1)
      AND COALESCE((SELECT SUM(size_bytes) FROM file_storage_usage), 0) + ? <= ?
  `)
    .bind(key, size, size, TOTAL_FILE_STORAGE_BYTES)
    .run();
  return result.meta.changes === 1;
}

export async function releaseFileStorage(db: D1Database, key: string) {
  // Preserve the retry marker if either statement fails.
  await db.batch([
    db.prepare('DELETE FROM file_storage_usage WHERE object_key = ?').bind(key),
    db
      .prepare(
        'DELETE FROM file_storage_pending_deletions WHERE object_key = ?',
      )
      .bind(key),
  ]);
}

export async function beginFileDeletion(
  db: D1Database,
  key: string,
  uploadedBy: string,
) {
  await db
    .prepare(`
    INSERT OR IGNORE INTO file_storage_pending_deletions (object_key, uploaded_by)
    VALUES (?, ?)
  `)
    .bind(key, uploadedBy)
    .run();
}

export async function pendingFileDeletionOwner(db: D1Database, key: string) {
  const pending = await db
    .prepare(
      'SELECT uploaded_by FROM file_storage_pending_deletions WHERE object_key = ?',
    )
    .bind(key)
    .first<{ uploaded_by: string }>();
  return pending?.uploaded_by;
}
