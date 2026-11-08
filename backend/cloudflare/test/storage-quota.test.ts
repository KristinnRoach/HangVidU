import { env } from 'cloudflare:test';
import { beforeEach, describe, expect, it } from 'vite-plus/test';
import {
  initializeStorageQuota,
  reserveFileStorage,
  releaseFileStorage,
  TOTAL_FILE_STORAGE_BYTES,
} from '../src/files/storage-quota';

describe('app storage quota', () => {
  beforeEach(async () => {
    await env.DB.batch([
      env.DB.prepare('DELETE FROM file_storage_usage'),
      env.DB.prepare('DELETE FROM file_storage_quota_state'),
    ]);
    const page = await env.FILES_BUCKET.list();
    if (page.objects.length)
      await env.FILES_BUCKET.delete(page.objects.map((object) => object.key));
  });
  it('counts existing R2 objects and initializes only once', async () => {
    await env.FILES_BUCKET.put('existing', 'hello');
    await Promise.all([
      initializeStorageQuota(env.DB, env.FILES_BUCKET),
      initializeStorageQuota(env.DB, env.FILES_BUCKET),
    ]);
    expect(
      await reserveFileStorage(env.DB, 'fits', TOTAL_FILE_STORAGE_BYTES - 5),
    ).toBe(true);
    expect(await reserveFileStorage(env.DB, 'overflow', 1)).toBe(false);
    await releaseFileStorage(env.DB, 'existing');
    await initializeStorageQuota(env.DB, env.FILES_BUCKET);
    expect(await reserveFileStorage(env.DB, 'reclaimed', 5)).toBe(true);
  });

  it('fails closed before initialization', async () => {
    expect(await reserveFileStorage(env.DB, 'file', 1)).toBe(false);
  });

  it('reserves atomically and releases idempotently', async () => {
    await initializeStorageQuota(env.DB, env.FILES_BUCKET);
    const results = await Promise.all([
      reserveFileStorage(env.DB, 'a', TOTAL_FILE_STORAGE_BYTES),
      reserveFileStorage(env.DB, 'b', TOTAL_FILE_STORAGE_BYTES),
    ]);
    expect(results.filter(Boolean)).toHaveLength(1);
    const winner = results[0] ? 'a' : 'b';
    await releaseFileStorage(env.DB, winner);
    await releaseFileStorage(env.DB, winner);
    expect(
      await reserveFileStorage(env.DB, 'next', TOTAL_FILE_STORAGE_BYTES),
    ).toBe(true);
  });
});
