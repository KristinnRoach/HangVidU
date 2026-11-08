// App-wide quota. All writers must use this ledger; dashboard/S3 uploads bypass it.
export const TOTAL_FILE_STORAGE_BYTES = 1024 * 1024 * 1024;

export async function initializeStorageQuota(db: D1Database, bucket: R2Bucket) {
  if (
    await db
      .prepare('SELECT id FROM file_storage_quota_state WHERE id = 1')
      .first()
  )
    return;

  // Bootstrap from actual objects, including files uploaded before this feature.
  // No upload using this handler can write until initialization commits.
  const objects: { key: string; size: number }[] = [];
  let cursor: string | undefined;
  do {
    const page = await bucket.list({ cursor });
    objects.push(...page.objects.map(({ key, size }) => ({ key, size })));
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);

  // A batch is atomic. A concurrent initializer becomes a no-op once ready.
  await db.batch([
    ...objects.map(({ key, size }) =>
      db
        .prepare(`
      INSERT OR IGNORE INTO file_storage_usage (object_key, size_bytes)
      SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM file_storage_quota_state WHERE id = 1)
    `)
        .bind(key, size),
    ),
    db.prepare(
      'INSERT OR IGNORE INTO file_storage_quota_state (id) VALUES (1)',
    ),
  ]);
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
  await db
    .prepare('DELETE FROM file_storage_usage WHERE object_key = ?')
    .bind(key)
    .run();
}
