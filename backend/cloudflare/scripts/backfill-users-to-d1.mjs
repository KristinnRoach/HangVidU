#!/usr/bin/env node
// One-off: convert an RTDB `/users` export into an idempotent SQL file that
// backfills the D1 `users` + `contacts` tables (0001 + 0006 schema).
//
// USERS — emits every account with a usable identity:
//   - Google cohort (`userName`, no handle): display_name + photo_url + an
//     auto-assigned handle slugified from display_name (front-loads what login's
//     ensureHandle would claim). On a slug collision: warn and leave username
//     NULL (claimed on next login instead) — never fail the batch.
//   - Handle accounts (`username` present): display_name + username.
//   Deleted (`profile.deleted`) and identity-less nodes are not emitted as rich
//   rows, but DO get a bare stub row if a contact edge references them (FK).
//   `email_hash` stays NULL (not in RTDB; written on next login). `discoverable`
//   -> DB default 1. Fill-only UPSERT: never clobbers data a login already wrote.
//
// CONTACTS — one row per `users/{owner}/contacts/{contactId}` edge. contact_id
//   is the map KEY (some records omit the redundant `contactId` field). Inserted
//   with conversation_id NULL, then a guarded UPDATE preserves the existing
//   canonical link: it sets conversation_id from the RTDB `conversationId` only
//   when that UUID-shaped id has a matching D1 `conversations` row (FK-safe) and
//   the contact is still unlinked. No match -> stays NULL and resolves by
//   `dm_key` on first chat open. Locally (few/no conversations) it no-ops.
//
// EMAIL_HASH — not in /users; sourced from the `/usersByEmail` node, whose KEY is
//   exactly hashEmail(email). Pass it via --emails. Fill-only UPDATE; powers
//   email-based discovery (Google import / invite-by-email) without a re-login.
//
// Input  : firebase database:get /users        > users.json
//          firebase database:get /usersByEmail  > usersByEmail.json   (optional)
// Output : idempotent SQL applied with (run from backend/cloudflare/):
//   local : wrangler d1 execute hangvidu-data --local  --persist-to .wrangler/state --file=<out>
//   remote: wrangler d1 execute hangvidu-data --remote --file=<out>
//
// Usage: node backfill-users-to-d1.mjs --input users.json --emails usersByEmail.json --out backfill-users.sql
//        node backfill-users-to-d1.mjs --selftest

import { readFileSync, writeFileSync } from 'node:fs';

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

/** SQL string literal with single-quote escaping; empty/null/undefined -> NULL. */
function s(value) {
  if (value === null || value === undefined || value === '') return 'NULL';
  return `'${String(value).replaceAll("'", "''")}'`;
}
/** SQL string literal, always non-NULL (empty stays ''). For NOT NULL columns. */
function txt(value) {
  return `'${String(value ?? '').replaceAll("'", "''")}'`;
}
/** SQL integer literal; non-finite -> NULL. */
function n(value) {
  return typeof value === 'number' && Number.isFinite(value)
    ? String(Math.trunc(value))
    : 'NULL';
}

function trimmed(value) {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : null;
}

// Mirror of the client's suggestHandle slug rule (src/stores/userDirectoryStore.js):
// romanize -> lowercase -> [a-z0-9_] -> strip edge underscores -> 3-20 chars ->
// pad to 3 -> 'user' fallback. Backfill front-loads the handle the next login
// would have assigned, so Google accounts are discoverable in prod without each
// user logging in first. KEEP IN SYNC with suggestHandle/transliterate there.
function transliterate(source) {
  return String(source ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // combining diacritics from NFD
    .replace(/[ðÐ]/g, 'd') // ð Ð
    .replace(/[þÞ]/g, 'th') // þ Þ
    .replace(/[æÆ]/g, 'ae') // æ Æ
    .replace(/[øØ]/g, 'o'); // ø Ø
}
function slugifyHandle(source) {
  const base = transliterate(source)
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 20);
  return (base || 'user').padEnd(3, '_').slice(0, 20);
}

// Same UUID-shape guard the client/D1 read paths use: only an opaque-UUID
// conversation id is trusted as a D1 conversations FK; anything else (legacy
// roomId) is ignored and the link resolves lazily by dm_key on first chat open.
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Identity present = something worth a rich user row. Deleted accounts and
// nodes with neither a display name nor a handle are emitted only as FK stubs.
function emitsRichRow(profile) {
  if (!profile || typeof profile !== 'object' || profile.deleted) return false;
  return Boolean(trimmed(profile.userName) || trimmed(profile.username));
}

function build(users, backfillTs, emailByUid = new Map()) {
  const stats = {
    google: 0,
    handle: 0,
    assigned: 0,
    collisions: 0,
    skippedDeleted: 0,
    skippedNoIdentity: 0,
    stubs: 0,
    contacts: 0,
    convLinks: 0,
    emailHashes: 0,
  };
  const richRows = [];
  const contactRows = [];
  const convRows = []; // guarded conversation_id fills (FK-safe, run after contacts)
  const referenced = new Set(); // every uid that needs to exist for an FK
  const richIds = new Set();

  // Seed the uniqueness set with every handle already present so an auto-assigned
  // Google slug can never collide with a real login handle (kiddi, kalli_kalli, …).
  const taken = new Set();
  for (const node of Object.values(users ?? {})) {
    const u = trimmed(node?.profile?.username);
    if (u) taken.add(u.toLowerCase());
  }

  for (const [uid, node] of Object.entries(users ?? {})) {
    const profile = node?.profile;
    if (emitsRichRow(profile)) {
      const displayName = trimmed(profile.userName);
      let username = trimmed(profile.username);
      if (username) {
        stats.handle += 1;
      } else {
        // Google cohort: front-load the handle login would auto-claim. On a
        // collision, warn and leave username NULL (claimed on next login instead).
        stats.google += 1;
        const slug = slugifyHandle(displayName);
        if (taken.has(slug)) {
          stats.collisions += 1;
          console.error(`WARN collision: ${uid} ("${displayName}") -> "${slug}" already taken; leaving username NULL`);
        } else {
          username = slug;
          taken.add(slug);
          stats.assigned += 1;
        }
      }
      richIds.add(uid);
      richRows.push(
        `INSERT INTO users (id, display_name, photo_url, username, created_at, registered_at)\n` +
          `VALUES (${s(uid)}, ${s(displayName)}, ${s(trimmed(profile.photoURL))}, ${s(username)}, ${n(backfillTs)}, ${n(backfillTs)})\n` +
          `ON CONFLICT(id) DO UPDATE SET\n` +
          `  display_name  = COALESCE(users.display_name, excluded.display_name),\n` +
          `  photo_url     = COALESCE(users.photo_url, excluded.photo_url),\n` +
          `  username      = COALESCE(users.username, excluded.username),\n` +
          `  registered_at = COALESCE(users.registered_at, excluded.registered_at);`,
      );
    } else if (profile?.deleted) {
      stats.skippedDeleted += 1;
    } else {
      stats.skippedNoIdentity += 1;
    }

    const contacts = node?.contacts ?? {};
    for (const [contactId, rec] of Object.entries(contacts)) {
      if (!contactId || contactId === uid) continue; // CHECK (owner != contact)
      const r = rec ?? {};
      const savedAt = typeof r.savedAt === 'number' ? r.savedAt : backfillTs;
      const lastAt =
        typeof r.lastInteractionAt === 'number' ? r.lastInteractionAt : savedAt;
      referenced.add(uid).add(contactId);
      contactRows.push(
        `INSERT OR IGNORE INTO contacts (owner_id, contact_id, nickname, conversation_id, saved_at, last_interaction_at)\n` +
          `VALUES (${s(uid)}, ${s(contactId)}, ${txt(trimmed(r.contactNickName) ?? '')}, NULL, ${n(savedAt)}, ${n(lastAt)});`,
      );
      stats.contacts += 1;

      // Preserve the existing canonical conversation link. Guarded so it is
      // FK-safe and self-correcting: fills only when the D1 conversations row
      // exists and the contact is still unlinked; otherwise stays NULL and
      // resolves by dm_key on first chat open. UUID-shape guard rejects legacy
      // roomIds. Locally (empty conversations) this is a no-op by design.
      const convId = UUID_RE.test(r.conversationId) ? r.conversationId : null;
      if (convId) {
        stats.convLinks += 1;
        convRows.push(
          `UPDATE contacts SET conversation_id = ${s(convId)}\n` +
            `  WHERE owner_id = ${s(uid)} AND contact_id = ${s(contactId)} AND conversation_id IS NULL\n` +
            `    AND EXISTS (SELECT 1 FROM conversations WHERE id = ${s(convId)});`,
        );
      }
    }
  }

  // email_hash: not in /users; the usersByEmail node (key = hashEmail(email)) is
  // the canonical source. Fill-only UPDATE; OR IGNORE in case a hash already
  // landed via a login. Powers email-based discovery without a re-login.
  const emailRows = [];
  for (const [uid, hash] of emailByUid) {
    if (!uid || !hash) continue;
    stats.emailHashes += 1;
    emailRows.push(
      `UPDATE OR IGNORE users SET email_hash = ${s(hash)} WHERE id = ${s(uid)} AND email_hash IS NULL;`,
    );
  }

  // Bare FK stubs for any contact endpoint without a rich row (deleted /
  // identity-less). OR IGNORE so it never overwrites a rich row above.
  const stubRows = [];
  for (const uid of referenced) {
    if (richIds.has(uid)) continue;
    stats.stubs += 1;
    stubRows.push(
      `INSERT OR IGNORE INTO users (id, display_name, created_at) VALUES (${s(uid)}, NULL, ${n(backfillTs)});`,
    );
  }

  return { richRows, stubRows, contactRows, convRows, emailRows, stats };
}

function selftest() {
  const assert = (c, m) => {
    if (!c) throw new Error('selftest: ' + m);
  };
  assert(s("a'b") === "'a''b'" && s('') === 'NULL', 'escape/empty');
  assert(txt('') === "''" && txt(null) === "''", 'txt never NULL');
  assert(emitsRichRow({ userName: 'A' }) && !emitsRichRow({ deleted: true }), 'rich');
  assert(!emitsRichRow({}) && !emitsRichRow(null), 'no identity');
  assert(slugifyHandle('Aron S!') === 'aron_s' && slugifyHandle('') === 'user', 'slug');
  assert(slugifyHandle('Davíð') === 'david' && slugifyHandle('Þórður') === 'thordur', 'transliterate');
  const uuid = '11111111-2222-3333-4444-555555555555';
  const { richRows, stubRows, contactRows, convRows, emailRows, stats } = build(
    {
      g: { profile: { userName: 'Aron S', photoURL: 'http://x/p' }, contacts: { h: { contactNickName: 'H', savedAt: 5, conversationId: uuid }, q: { roomId: 'legacy_room_1' } } },
      h: { profile: { username: 'kiddi', userName: 'kiddi' } },
      k: { profile: { userName: 'Kiddi' } }, // Google whose slug collides with handle 'kiddi'
      d: { profile: { deleted: true }, contacts: { g: { conversationId: 'c' } } }, // edge from deleted
      x: { contacts: { z: { savedAt: 9 } } }, // identity-less owner, refs z (stub)
    },
    1700,
    new Map([['g', 'aGFzaA==-']]),
  );
  assert(stats.google === 2 && stats.handle === 1, 'cohorts');
  assert(stats.assigned === 1 && stats.collisions === 1, 'assign + collision skip');
  assert(stats.skippedDeleted === 1 && stats.skippedNoIdentity === 1, 'skips');
  assert(stats.contacts === 4 && contactRows.length === 4, 'contact edges');
  // referenced = owners + endpoints = {g,h,q,d,x,z}. rich = {g,h,k}.
  // stubs = referenced \ rich = {q,d,x,z} = 4.
  assert(stats.stubs === 4 && stubRows.length === 4, 'fk stubs');
  assert(richRows[0].includes("'Aron S'") && richRows[0].includes("'aron_s'"), 'assigned slug emitted');
  assert(contactRows[0].includes('conversation_id'), 'shape');
  // only the UUID conversationId links; the legacy roomId edge does not.
  assert(stats.convLinks === 1 && convRows.length === 1, 'conv link count');
  assert(convRows[0].includes(uuid) && convRows[0].includes('EXISTS (SELECT 1 FROM conversations'), 'conv guard');
  assert(stats.emailHashes === 1 && emailRows[0].includes("'aGFzaA==-'") && emailRows[0].includes("id = 'g'"), 'email hash');
  console.error('selftest OK');
}

if (process.argv.includes('--selftest')) {
  selftest();
  process.exit(0);
}

const inputPath = arg('--input', 'users.json');
const emailsPath = arg('--emails', null); // optional usersByEmail.json (hash->uid)
const outPath = arg('--out', 'backfill-users.sql');
const backfillTs = Date.now();

const root = JSON.parse(readFileSync(inputPath, 'utf8'));
const users = root?.users ?? root; // tolerate {users:{}} or {}

// usersByEmail: { [hashEmail(email)]: { uid, ... } } -> Map<uid, hash>.
const emailByUid = new Map();
if (emailsPath) {
  const e = JSON.parse(readFileSync(emailsPath, 'utf8'));
  for (const [hash, rec] of Object.entries(e?.usersByEmail ?? e ?? {})) {
    if (rec?.uid) emailByUid.set(rec.uid, hash);
  }
}

const { richRows, stubRows, contactRows, convRows, emailRows, stats } = build(
  users,
  backfillTs,
  emailByUid,
);

const out = [
  '-- Generated by backfill-users-to-d1.mjs. Idempotent; safe to re-run.',
  '-- Order: users (rich + FK stubs) -> contacts -> conversation_id links -> email_hash.',
  '',
  '-- users: rich rows',
  ...richRows.flatMap((l) => [l, '']),
  '-- users: FK stubs for deleted / identity-less contact endpoints',
  ...stubRows.flatMap((l) => [l, '']),
  '-- contacts',
  ...contactRows.flatMap((l) => [l, '']),
  '-- contacts: preserve canonical conversation_id (FK-guarded; NULL if conv row absent)',
  ...convRows.flatMap((l) => [l, '']),
  '-- users: email_hash from usersByEmail (powers email discovery)',
  ...emailRows.flatMap((l) => [l, '']),
].join('\n');
writeFileSync(outPath, out);

console.error(
  `Wrote ${outPath}\n` +
    `  users: ${stats.google} google + ${stats.handle} handle = ${stats.google + stats.handle} rich rows\n` +
    `  handles auto-assigned: ${stats.assigned} (collisions skipped -> NULL: ${stats.collisions})\n` +
    `  users: ${stats.stubs} FK stubs (deleted / identity-less endpoints)\n` +
    `  skipped (no contact ref): ${stats.skippedDeleted} deleted, ${stats.skippedNoIdentity} identity-less\n` +
    `  contacts: ${stats.contacts} edges (${stats.convLinks} with a guarded conversation_id link)\n` +
    `  email_hash updates: ${stats.emailHashes}${emailsPath ? '' : ' (no --emails input given)'}`,
);
