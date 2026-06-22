#!/usr/bin/env node
// One-off: eagerly mint each contact pair's DM conversationId and write it
// onto both users' RTDB contact records.
//
// Why this is needed: contact.conversationId used to hold the legacy
// composite key `<uidA>_<uidB>` (retired in #564), then got reused for the
// real opaque D1 id (#568). Contacts saved before #564 still carry the old
// value; the app already discards it at read-time and falls back to
// resolving lazily on first open, so this script is a pure optimization
// (skip that one-time round trip) — not required for correctness.
//
// For each (uid, contactId) pair whose stored conversationId isn't a valid
// UUID, this script:
//   1. Resolves-or-creates the D1 conversation via the exact SQL
//      `resolveOrCreateDirect` runs (backend/cloudflare/src/data/repo.ts),
//      so a pair that already has a conversation (most do — created by the
//      lazy path) gets that same id, not a duplicate.
//   2. Writes the resolved id onto both sides' RTDB contact record.
//
// D1 goes through the already-authenticated wrangler CLI (same as
// scripts/migrate-d1-attachment-keys.mjs). RTDB goes through firebase-admin
// (same as scripts/migrate-contact-name-to-contact-nickname.js).
//
// Usage:
//   node scripts/backfill-contact-conversation-ids.mjs           # dry run
//   node scripts/backfill-contact-conversation-ids.mjs --apply

import admin from 'firebase-admin';
import { randomUUID } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APPLY = process.argv.includes('--apply');

const RTDB_URL =
  process.env.RTDB_URL ||
  'https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app';

const D1_DATABASE = 'hangvidu-data';
const D1_CONFIG = 'backend/cloudflare/wrangler.jsonc';

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

initFirebase();
const db = admin.database();

async function main() {
  console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY RUN (pass --apply to write)'}`);

  const usersSnap = await db.ref('users').once('value');
  const users = usersSnap.val() || {};

  // dmKey -> { a, b } for every contact pair still missing a valid id.
  const pairs = new Map();
  for (const [uid, userData] of Object.entries(users)) {
    const contacts = userData?.contacts;
    if (!contacts || typeof contacts !== 'object') continue;
    for (const [contactId, contact] of Object.entries(contacts)) {
      if (!contact || typeof contact !== 'object') continue;
      if (typeof contact.conversationId === 'string' && UUID_RE.test(contact.conversationId)) {
        continue;
      }
      pairs.set(directDmKey(uid, contactId), { a: uid, b: contactId });
    }
  }

  console.log(`Contact pairs needing a conversationId: ${pairs.size}`);
  if (pairs.size === 0) {
    console.log('Nothing to do.');
    process.exit(0);
  }

  const dmKeyToId = resolveOrCreateConversations(pairs);

  const updates = {};
  for (const [dmKey, { a, b }] of pairs) {
    const conversationId = dmKeyToId.get(dmKey);
    if (!conversationId) {
      console.warn(`[skip] no conversation resolved for ${dmKey}`);
      continue;
    }
    updates[`users/${a}/contacts/${b}/conversationId`] = conversationId;
    updates[`users/${b}/contacts/${a}/conversationId`] = conversationId;
    console.log(`[set] ${dmKey} -> ${conversationId}`);
  }

  console.log(`\nRTDB writes: ${Object.keys(updates).length}`);
  if (!APPLY) {
    console.log('Dry run complete. Run with --apply to write changes.');
    process.exit(0);
  }

  await db.ref().update(updates);
  console.log('Done.');
  process.exit(0);
}

// --- D1 (via wrangler), mirrors repo.ts#resolveOrCreateDirect exactly ----

function resolveOrCreateConversations(pairs) {
  const now = Date.now();
  const statements = [];
  const pregenerated = new Map(); // dmKey -> uuid used if a new row is needed

  for (const [dmKey, { a, b }] of pairs) {
    const newId = randomUUID();
    pregenerated.set(dmKey, newId);
    statements.push(
      `INSERT INTO users (id, display_name, created_at) VALUES ('${sqlEscape(a)}', NULL, ${now}) ON CONFLICT(id) DO NOTHING;`,
      `INSERT INTO users (id, display_name, created_at) VALUES ('${sqlEscape(b)}', NULL, ${now}) ON CONFLICT(id) DO NOTHING;`,
      `INSERT INTO conversations (id, kind, dm_key, created_at, updated_at) VALUES ('${newId}', 'direct', '${sqlEscape(dmKey)}', ${now}, ${now}) ON CONFLICT(dm_key) DO NOTHING;`,
    );
  }

  if (APPLY) {
    runWrangler(['--file', writeTempSql(statements.join('\n'))]);
  } else {
    console.log(`[dry-run] would run ${statements.length} D1 statements (users + conversations upsert)`);
  }

  const dmKeys = [...pairs.keys()];
  const dmKeyToId = new Map();
  if (APPLY) {
    const rows = d1Select(
      `SELECT dm_key, id FROM conversations WHERE dm_key IN (${dmKeys.map((k) => `'${sqlEscape(k)}'`).join(',')})`,
    );
    for (const row of rows) dmKeyToId.set(row.dm_key, row.id);
  } else {
    // Dry run: report the id each pair would get if it doesn't already exist.
    for (const dmKey of dmKeys) dmKeyToId.set(dmKey, pregenerated.get(dmKey));
  }

  const memberStatements = [];
  for (const [dmKey, { a, b }] of pairs) {
    const conversationId = dmKeyToId.get(dmKey);
    if (!conversationId) continue;
    for (const userId of [a, b]) {
      memberStatements.push(
        `INSERT INTO conversation_members (conversation_id, user_id, joined_at) VALUES ('${conversationId}', '${sqlEscape(userId)}', ${now}) ON CONFLICT(conversation_id, user_id) DO NOTHING;`,
      );
    }
  }
  if (APPLY) {
    runWrangler(['--file', writeTempSql(memberStatements.join('\n'))]);
  } else {
    console.log(`[dry-run] would run ${memberStatements.length} conversation_members upserts`);
  }

  return dmKeyToId;
}

function directDmKey(a, b) {
  return [a, b].sort().join(':');
}

function writeTempSql(sql) {
  const file = path.join(tmpdir(), `contact-conversation-backfill-${Date.now()}-${Math.random().toString(36).slice(2)}.sql`);
  writeFileSync(file, sql);
  return file;
}

function runWrangler(extraArgs) {
  const file = extraArgs[extraArgs.indexOf('--file') + 1];
  try {
    const result = spawnSync(
      'npx',
      ['wrangler', 'd1', 'execute', D1_DATABASE, '--remote', '--config', D1_CONFIG, ...extraArgs],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
    );
    if (result.status !== 0) {
      throw new Error(`wrangler failed: ${result.stderr || result.stdout}`);
    }
    return result.stdout;
  } finally {
    if (file) rmSync(file, { force: true });
  }
}

function d1Select(sql) {
  const out = runWranglerCommand(sql);
  const parsed = JSON.parse(out.slice(out.indexOf('[')));
  return parsed?.[0]?.results ?? [];
}

function runWranglerCommand(sql) {
  const result = spawnSync(
    'npx',
    ['wrangler', 'd1', 'execute', D1_DATABASE, '--remote', '--config', D1_CONFIG, '--json', '--command', sql],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
  );
  if (result.status !== 0) {
    throw new Error(`wrangler failed: ${result.stderr || result.stdout}`);
  }
  return result.stdout;
}

function sqlEscape(value) {
  return String(value).replaceAll("'", "''");
}

// --- firebase-admin setup -------------------------------------------------

function initFirebase() {
  const serviceAccountPath = path.join(
    __dirname,
    '../backend/firebase/service-account-key.json',
  );
  const appOptions = { databaseURL: RTDB_URL };
  if (existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'));
    appOptions.credential = admin.credential.cert(serviceAccount);
  }
  admin.initializeApp(appOptions);
}

main().catch((error) => {
  console.error('Backfill failed:', error);
  process.exit(1);
});
