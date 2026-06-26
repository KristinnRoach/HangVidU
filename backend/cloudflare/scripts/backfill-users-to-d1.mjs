#!/usr/bin/env node
// One-off: convert an RTDB `/users` export into an idempotent SQL file that
// backfills the D1 `users` + `contacts` tables (0001 + 0006 schema).
//
// USERS — emits every account with a usable identity:
//   - Google cohort (`userName`, no handle): display_name + photo_url; username
//     stays NULL and is auto-claimed on next login (ensureHandle).
//   - Handle accounts (`username` present): display_name + username.
//   Deleted (`profile.deleted`) and identity-less nodes are not emitted as rich
//   rows, but DO get a bare stub row if a contact edge references them (FK).
//   `email_hash` stays NULL (not in RTDB; written on next login). `discoverable`
//   -> DB default 1. Fill-only UPSERT: never clobbers data a login already wrote.
//
// CONTACTS — one row per `users/{owner}/contacts/{contactId}` edge. contact_id
//   is the map KEY (some records omit the redundant `contactId` field).
//   conversation_id is set NULL on purpose: the canonical id is resolved by
//   `dm_key` on first chat open (the RTDB conversationId is not the D1 id), and
//   a standalone contacts backfill has no `conversations` rows for the FK anyway.
//
// Input  : firebase database:get /users > users.json
// Output : idempotent SQL applied with (run from backend/cloudflare/):
//   local : wrangler d1 execute hangvidu-data --local  --persist-to .wrangler/state --file=<out>
//   remote: wrangler d1 execute hangvidu-data --remote --file=<out>
//
// Usage: node backfill-users-to-d1.mjs --input users.json --out backfill-users.sql
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

// Identity present = something worth a rich user row. Deleted accounts and
// nodes with neither a display name nor a handle are emitted only as FK stubs.
function emitsRichRow(profile) {
  if (!profile || typeof profile !== 'object' || profile.deleted) return false;
  return Boolean(trimmed(profile.userName) || trimmed(profile.username));
}

function build(users, backfillTs) {
  const stats = {
    google: 0,
    handle: 0,
    skippedDeleted: 0,
    skippedNoIdentity: 0,
    stubs: 0,
    contacts: 0,
  };
  const richRows = [];
  const contactRows = [];
  const referenced = new Set(); // every uid that needs to exist for an FK
  const richIds = new Set();

  for (const [uid, node] of Object.entries(users ?? {})) {
    const profile = node?.profile;
    if (emitsRichRow(profile)) {
      const displayName = trimmed(profile.userName);
      const username = trimmed(profile.username);
      if (username) stats.handle += 1;
      else stats.google += 1;
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
    }
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

  return { richRows, stubRows, contactRows, stats };
}

function selftest() {
  const assert = (c, m) => {
    if (!c) throw new Error('selftest: ' + m);
  };
  assert(s("a'b") === "'a''b'" && s('') === 'NULL', 'escape/empty');
  assert(txt('') === "''" && txt(null) === "''", 'txt never NULL');
  assert(emitsRichRow({ userName: 'A' }) && !emitsRichRow({ deleted: true }), 'rich');
  assert(!emitsRichRow({}) && !emitsRichRow(null), 'no identity');
  const { richRows, stubRows, contactRows, stats } = build(
    {
      g: { profile: { userName: 'Aron S', photoURL: 'http://x/p' }, contacts: { h: { contactNickName: 'H', savedAt: 5 } } },
      h: { profile: { username: 'kiddi', userName: 'kiddi' } },
      d: { profile: { deleted: true }, contacts: { g: { conversationId: 'c' } } }, // edge from deleted
      x: { contacts: { z: { savedAt: 9 } } }, // identity-less owner, refs z (stub)
    },
    1700,
  );
  assert(stats.google === 1 && stats.handle === 1, 'cohorts');
  assert(stats.skippedDeleted === 1 && stats.skippedNoIdentity === 1, 'skips');
  assert(stats.contacts === 3 && contactRows.length === 3, 'contact edges');
  // referenced = owners + endpoints = {g,h,d,x,z}. rich = {g,h}.
  // stubs = referenced \ rich = {d,x,z} = 3.
  assert(stats.stubs === 3 && stubRows.length === 3, 'fk stubs');
  assert(richRows[0].includes("'Aron S'") && contactRows[0].includes('conversation_id'), 'shape');
  console.error('selftest OK');
}

if (process.argv.includes('--selftest')) {
  selftest();
  process.exit(0);
}

const inputPath = arg('--input', 'users.json');
const outPath = arg('--out', 'backfill-users.sql');
const backfillTs = Date.now();

const root = JSON.parse(readFileSync(inputPath, 'utf8'));
const users = root?.users ?? root; // tolerate {users:{}} or {}

const { richRows, stubRows, contactRows, stats } = build(users, backfillTs);

const out = [
  '-- Generated by backfill-users-to-d1.mjs. Idempotent; safe to re-run.',
  '-- Users (rich rows + FK stubs), then contacts. conversation_id NULL (resolved on first chat).',
  '',
  '-- users: rich rows',
  ...richRows.flatMap((l) => [l, '']),
  '-- users: FK stubs for deleted / identity-less contact endpoints',
  ...stubRows.flatMap((l) => [l, '']),
  '-- contacts',
  ...contactRows.flatMap((l) => [l, '']),
].join('\n');
writeFileSync(outPath, out);

console.error(
  `Wrote ${outPath}\n` +
    `  users: ${stats.google} google + ${stats.handle} handle = ${stats.google + stats.handle} rich rows\n` +
    `  users: ${stats.stubs} FK stubs (deleted / identity-less endpoints)\n` +
    `  skipped (no contact ref): ${stats.skippedDeleted} deleted, ${stats.skippedNoIdentity} identity-less\n` +
    `  contacts: ${stats.contacts} edges`,
);
