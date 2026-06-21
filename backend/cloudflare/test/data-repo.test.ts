import { env } from 'cloudflare:test';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  directDmKey,
  getConversation,
  insertMessage,
  isMember,
  listConversations,
  loadMessages,
  resolveOrCreateDirect,
  upsertUser,
} from '../src/data/repo';

// These tests exercise the data layer against a real Miniflare D1 with the
// production migrations applied. They cover the invariants that are expensive to
// get wrong (DM dedup, message ordering, membership) and stable across UI churn.

const db = env.DB;

// The test pool has no per-test storage isolation, so reset between tests.
// Children cascade, but delete explicitly in dependency order for clarity.
beforeEach(async () => {
  await db.batch([
    db.prepare('DELETE FROM message_attachments'),
    db.prepare('DELETE FROM messages'),
    db.prepare('DELETE FROM conversation_members'),
    db.prepare('DELETE FROM conversations'),
    db.prepare('DELETE FROM users'),
  ]);
});

describe('directDmKey', () => {
  it('is order-independent and sorted', () => {
    expect(directDmKey('b', 'a')).toBe('a:b');
    expect(directDmKey('a', 'b')).toBe(directDmKey('b', 'a'));
  });
});

describe('resolveOrCreateDirect', () => {
  it('creates a direct conversation with both users as members', async () => {
    const id = await resolveOrCreateDirect(db, 'user-a', 'user-b', 1000);

    const convo = await getConversation(db, id);
    expect(convo).toMatchObject({ kind: 'direct', dm_key: 'user-a:user-b' });
    expect(await isMember(db, id, 'user-a')).toBe(true);
    expect(await isMember(db, id, 'user-b')).toBe(true);
  });

  it('is idempotent and order-independent — one canonical id per pair', async () => {
    const first = await resolveOrCreateDirect(db, 'user-a', 'user-b', 1000);
    const again = await resolveOrCreateDirect(db, 'user-a', 'user-b', 2000);
    const reversed = await resolveOrCreateDirect(db, 'user-b', 'user-a', 3000);

    expect(again).toBe(first);
    expect(reversed).toBe(first);

    const { results } = await db
      .prepare(`SELECT id FROM conversations WHERE dm_key = ?`)
      .bind('user-a:user-b')
      .all();
    expect(results).toHaveLength(1);
  });

  it('creates stub user rows for both participants', async () => {
    await resolveOrCreateDirect(db, 'fresh-a', 'fresh-b', 1000);

    const rows = await db
      .prepare(`SELECT id FROM users WHERE id IN ('fresh-a', 'fresh-b')`)
      .all();
    expect(rows.results).toHaveLength(2);
  });
});

describe('insertMessage + loadMessages', () => {
  it('round-trips a text message with the sender display name joined', async () => {
    const convoId = await resolveOrCreateDirect(db, 'user-a', 'user-b', 1000);
    await upsertUser(db, 'user-a', 'Alice', 1000);

    const stored = await insertMessage(
      db,
      convoId,
      'msg-1',
      'user-a',
      'text',
      'hello',
      null,
      2000,
    );
    expect(stored).toMatchObject({
      id: 'msg-1',
      sender_id: 'user-a',
      sender_name: 'Alice',
      body: 'hello',
      attachments: [],
    });

    const loaded = await loadMessages(db, convoId, 50);
    expect(loaded.map((m) => m.id)).toEqual(['msg-1']);
  });

  it('returns messages oldest-first (newest last)', async () => {
    const convoId = await resolveOrCreateDirect(db, 'user-a', 'user-b', 1000);
    await insertMessage(db, convoId, 'm1', 'user-a', 'text', 'first', null, 1000);
    await insertMessage(db, convoId, 'm2', 'user-a', 'text', 'second', null, 2000);
    await insertMessage(db, convoId, 'm3', 'user-a', 'text', 'third', null, 3000);

    const loaded = await loadMessages(db, convoId, 50);
    expect(loaded.map((m) => m.id)).toEqual(['m1', 'm2', 'm3']);
  });

  it('caps at the requested limit, keeping the most recent', async () => {
    const convoId = await resolveOrCreateDirect(db, 'user-a', 'user-b', 1000);
    await insertMessage(db, convoId, 'm1', 'user-a', 'text', 'first', null, 1000);
    await insertMessage(db, convoId, 'm2', 'user-a', 'text', 'second', null, 2000);
    await insertMessage(db, convoId, 'm3', 'user-a', 'text', 'third', null, 3000);

    const loaded = await loadMessages(db, convoId, 2);
    expect(loaded.map((m) => m.id)).toEqual(['m2', 'm3']);
  });

  it('bumps the conversation updated_at on send', async () => {
    const convoId = await resolveOrCreateDirect(db, 'user-a', 'user-b', 1000);
    await insertMessage(db, convoId, 'm1', 'user-a', 'text', 'hi', null, 5000);

    const convo = await getConversation(db, convoId);
    expect(convo?.updated_at).toBe(5000);
  });

  it('stores a file message with its attachment joined', async () => {
    const convoId = await resolveOrCreateDirect(db, 'user-a', 'user-b', 1000);
    const stored = await insertMessage(
      db,
      convoId,
      'msg-file',
      'user-a',
      'file',
      null,
      {
        r2Key: 'conversation-files/abc/file-1',
        bucket: 'hangvidu-files',
        fileName: 'photo.png',
        mimeType: 'image/png',
        fileSize: 1234,
        width: 100,
        height: 200,
      },
      2000,
    );

    expect(stored?.attachments).toHaveLength(1);
    expect(stored?.attachments[0]).toMatchObject({
      r2_key: 'conversation-files/abc/file-1',
      file_name: 'photo.png',
      mime_type: 'image/png',
      file_size: 1234,
      width: 100,
      height: 200,
    });
  });
});

describe('isMember', () => {
  it('is true for members and false for non-members', async () => {
    const convoId = await resolveOrCreateDirect(db, 'user-a', 'user-b', 1000);
    expect(await isMember(db, convoId, 'user-a')).toBe(true);
    expect(await isMember(db, convoId, 'user-c')).toBe(false);
  });
});

describe('listConversations', () => {
  it("returns the caller's conversations, most-recently-updated first", async () => {
    const older = await resolveOrCreateDirect(db, 'user-a', 'user-b', 1000);
    const newer = await resolveOrCreateDirect(db, 'user-a', 'user-c', 2000);
    // Bump `older` past `newer` via a later message.
    await insertMessage(db, older, 'm1', 'user-a', 'text', 'hi', null, 3000);

    const list = await listConversations(db, 'user-a');
    expect(list.map((c) => c.id)).toEqual([older, newer]);
  });

  it('excludes conversations the caller is not a member of', async () => {
    await resolveOrCreateDirect(db, 'user-b', 'user-c', 1000);
    const list = await listConversations(db, 'user-a');
    expect(list).toHaveLength(0);
  });

  it('includes the full member list per conversation', async () => {
    const convoId = await resolveOrCreateDirect(db, 'user-a', 'user-b', 1000);
    const list = await listConversations(db, 'user-a');
    const found = list.find((c) => c.id === convoId);
    expect(found?.members.map((m) => m.user_id).sort()).toEqual([
      'user-a',
      'user-b',
    ]);
  });

  it('uses message id to break latest-message timestamp ties', async () => {
    const convoId = await resolveOrCreateDirect(db, 'user-a', 'user-b', 1000);
    await insertMessage(db, convoId, 'm1', 'user-a', 'text', 'first', null, 2000);
    await insertMessage(db, convoId, 'm2', 'user-b', 'text', 'second', null, 2000);

    const [conversation] = await listConversations(db, 'user-a');
    expect(conversation.latest_sent_at).toBe(2000);
    expect(conversation.latest_sender_id).toBe('user-b');
  });
});
