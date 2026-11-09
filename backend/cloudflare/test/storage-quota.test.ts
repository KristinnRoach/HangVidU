import { env } from 'cloudflare:test';
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';
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
      env.DB.prepare('DELETE FROM file_storage_quota_inventory'),
      env.DB.prepare('DELETE FROM file_storage_pending_deletions'),
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

  it('resumes bounded pages and publishes readiness only after the final page', async () => {
    await Promise.all(
      Array.from({ length: 101 }, (_, i) =>
        env.FILES_BUCKET.put(`inventory/${String(i).padStart(3, '0')}`, 'x'),
      ),
    );
    const bucket = {
      list: vi.fn((options?: R2ListOptions) => env.FILES_BUCKET.list(options)),
    };
    expect(await initializeStorageQuota(env.DB, bucket)).toBe(false);
    expect(bucket.list).toHaveBeenCalledExactlyOnceWith({
      cursor: undefined,
      limit: 100,
    });
    expect(await reserveFileStorage(env.DB, 'too-early', 1)).toBe(false);
    const progress = await env.DB.prepare(
      'SELECT cursor, version FROM file_storage_quota_inventory',
    ).first();
    expect(progress).toMatchObject({ cursor: expect.any(String), version: 1 });

    // A fresh call resumes persisted state, without retaining the first page.
    expect(await initializeStorageQuota(env.DB, bucket)).toBe(true);
    expect(bucket.list).toHaveBeenLastCalledWith({
      cursor: progress!.cursor,
      limit: 100,
    });
    expect(
      await reserveFileStorage(env.DB, 'fits', TOTAL_FILE_STORAGE_BYTES - 101),
    ).toBe(true);
    expect(await reserveFileStorage(env.DB, 'overflow', 1)).toBe(false);
  });

  it('does not replay a stale page after a concurrent initializer finishes and a file is deleted', async () => {
    await env.FILES_BUCKET.put('existing', 'hello');
    let resume!: () => void;
    let captured!: () => void;
    const gate = new Promise<void>((resolve) => {
      resume = resolve;
    });
    const listed = new Promise<void>((resolve) => {
      captured = resolve;
    });
    const slow = initializeStorageQuota(env.DB, {
      async list(options) {
        const page = await env.FILES_BUCKET.list(options);
        captured();
        await gate;
        return page;
      },
    });
    await listed;
    try {
      expect(await initializeStorageQuota(env.DB, env.FILES_BUCKET)).toBe(true);
      await env.FILES_BUCKET.delete('existing');
      await releaseFileStorage(env.DB, 'existing');
    } finally {
      resume();
      await slow;
    }
    expect(
      await env.DB.prepare(
        'SELECT version FROM file_storage_quota_inventory',
      ).first('version'),
    ).toBe(1);
    expect(
      await reserveFileStorage(env.DB, 'fits', TOTAL_FILE_STORAGE_BYTES),
    ).toBe(true);
  });

  it('rolls back a failed inventory page and resumes from the same cursor', async () => {
    await env.FILES_BUCKET.put('existing', 'hello');
    await env.DB.prepare(`CREATE TRIGGER fail_inventory BEFORE INSERT ON file_storage_quota_state
      BEGIN SELECT RAISE(ABORT, 'test inventory failure'); END`).run();
    try {
      await expect(
        initializeStorageQuota(env.DB, env.FILES_BUCKET),
      ).rejects.toThrow();
      expect(
        await env.DB.prepare(
          'SELECT COUNT(*) AS count FROM file_storage_usage',
        ).first('count'),
      ).toBe(0);
      expect(
        await env.DB.prepare(
          'SELECT cursor, version FROM file_storage_quota_inventory',
        ).first(),
      ).toEqual({ cursor: null, version: 0 });
      expect(await reserveFileStorage(env.DB, 'too-early', 1)).toBe(false);
    } finally {
      await env.DB.prepare('DROP TRIGGER fail_inventory').run();
    }
    expect(await initializeStorageQuota(env.DB, env.FILES_BUCKET)).toBe(true);
    expect(
      await reserveFileStorage(env.DB, 'fits', TOTAL_FILE_STORAGE_BYTES - 5),
    ).toBe(true);
    expect(await reserveFileStorage(env.DB, 'overflow', 1)).toBe(false);
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
