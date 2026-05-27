#!/usr/bin/env node

/**
 * Read-only scan of the entire RTDB. Surfaces:
 *   - top-level nodes + child counts (hot spots)
 *   - per-user subkey histogram (stale schema fields like the legacy
 *     recentCalls/outgoingCall/callHistory, or unexpected keys)
 *   - rooms age distribution
 *   - conversations: count, message totals, last-activity age
 *   - usersByEmail / notifications counts
 *   - any unexpected top-level keys
 *
 * Usage: node scripts/scan-rtdb.js [--verbose] [--top=N]
 *   --verbose   list individual stale entries (top N per category, default 10)
 *   --top=N     change the listing limit (e.g. --top=25)
 *
 * Never writes. Safe to run against PROD.
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const verbose = process.argv.includes('--verbose');
const topArg = process.argv.find((a) => a.startsWith('--top='));
const TOP_N = topArg ? Number(topArg.split('=')[1]) || 10 : 10;

const DATABASE_URL =
  'https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app';
const PROJECT_ID = 'vidu-aae11';

const KNOWN_TOP_LEVEL = new Set([
  'rooms',
  'users',
  'usersByEmail',
  'conversations',
  'notifications',
]);

const KNOWN_USER_KEYS = new Set([
  'contacts',
  'incomingInvites',
  'acceptedInvites',
  'calls', // new (incoming/response)
  'profile',
  'presence',
  'pushSubscriptions',
]);

const LEGACY_USER_KEYS = new Set([
  'recentCalls',
  'outgoingCall',
  'callHistory',
]);

const KNOWN_ROOM_KEYS = new Set([
  'meta',
  'participants',
  'p2pSignaling',
  // legacy WebRTC + watch-together — flagged if present
]);

const LEGACY_ROOM_KEYS = new Set([
  'watch',
  'mediaSyncSignaling',
  'offerCandidates',
  'answerCandidates',
  'dataOffer',
  'dataAnswer',
  'dataOfferCandidates',
  'dataAnswerCandidates',
  'members', // old call-room members map
  'offer',
  'answer',
]);

const serviceAccountPath = path.join(
  __dirname,
  '../functions/service-account-key.json',
);

if (!fs.existsSync(serviceAccountPath)) {
  console.error('Error: service-account-key.json not found at', serviceAccountPath);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: DATABASE_URL,
});

const db = admin.database();

const NOW = Date.now();
const DAY_MS = 24 * 60 * 60 * 1000;

function fmtBytes(n) {
  if (n < 1024) return `${n}B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)}MB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(2)}GB`;
}

function ageDays(ts) {
  if (typeof ts !== 'number') return null;
  return Math.floor((NOW - ts) / DAY_MS);
}

function ageBucket(days) {
  if (days == null) return 'no-ts';
  if (days < 1) return '<1d';
  if (days < 7) return '1-7d';
  if (days < 30) return '7-30d';
  if (days < 90) return '30-90d';
  if (days < 365) return '90-365d';
  return '>1y';
}

async function shallowList(dbPath) {
  const accessToken = await admin.credential
    .cert(serviceAccount)
    .getAccessToken();
  const url = `${DATABASE_URL}/${dbPath}.json?shallow=true&access_token=${accessToken.access_token}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`shallow read ${dbPath} failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

function approxJsonBytes(obj) {
  try {
    return Buffer.byteLength(JSON.stringify(obj), 'utf8');
  } catch {
    return 0;
  }
}

function printHeader(label) {
  console.log(`\n=== ${label} ===`);
}

function printRow(label, value) {
  console.log(`  ${label.padEnd(28)} ${value}`);
}

async function scanTopLevel() {
  printHeader('Top-level nodes');
  const shallow = await shallowList('');
  const keys = shallow ? Object.keys(shallow) : [];
  const unknown = keys.filter((k) => !KNOWN_TOP_LEVEL.has(k));
  for (const k of keys) {
    const marker = KNOWN_TOP_LEVEL.has(k) ? '' : '  ⚠ unexpected';
    printRow(k, marker || 'known');
  }
  return { keys, unknown };
}

async function scanRooms() {
  printHeader('rooms/');
  const ids = (await shallowList('rooms')) || {};
  const idList = Object.keys(ids);
  printRow('total rooms', idList.length);
  if (idList.length === 0) return;

  // Pull full data for size + age. If this is too heavy, switch to sampling.
  const full = (await db.ref('rooms').once('value')).val() || {};
  const bytes = approxJsonBytes(full);
  printRow('total size (approx)', fmtBytes(bytes));

  const buckets = {};
  const legacyKeys = new Map(); // key -> count of rooms containing it
  const stale = [];
  for (const [roomId, room] of Object.entries(full)) {
    const created =
      room?.meta?.createdAt ??
      room?.createdAt ??
      null;
    const days = ageDays(created);
    const bucket = ageBucket(days);
    buckets[bucket] = (buckets[bucket] || 0) + 1;

    for (const childKey of Object.keys(room || {})) {
      if (LEGACY_ROOM_KEYS.has(childKey)) {
        legacyKeys.set(childKey, (legacyKeys.get(childKey) || 0) + 1);
      }
    }

    if (days != null && days > 7) {
      stale.push({ roomId, days, bytes: approxJsonBytes(room) });
    }
  }

  printHeader('rooms/ age distribution');
  for (const b of ['<1d', '1-7d', '7-30d', '30-90d', '90-365d', '>1y', 'no-ts']) {
    if (buckets[b]) printRow(b, buckets[b]);
  }

  if (legacyKeys.size > 0) {
    printHeader('rooms/ legacy sub-keys present');
    for (const [k, n] of legacyKeys) printRow(k, `${n} room(s)`);
  }

  if (stale.length && verbose) {
    printHeader(`rooms/ stale (>7d) — top ${TOP_N} by size`);
    stale
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, TOP_N)
      .forEach((r) =>
        printRow(r.roomId, `${r.days}d  ${fmtBytes(r.bytes)}`),
      );
  }
}

async function scanUsers() {
  printHeader('users/');
  const shallow = (await shallowList('users')) || {};
  const uids = Object.keys(shallow);
  printRow('total users', uids.length);
  if (uids.length === 0) return;

  const subkeyHist = new Map(); // key -> {count, totalBytes}
  const legacyOwners = { recentCalls: [], outgoingCall: [], callHistory: [] };
  const unknownKeys = new Map();
  let totalBytes = 0;

  // One read per user keeps memory bounded. ~hundreds of users expected.
  for (const uid of uids) {
    const userSnap = await db.ref(`users/${uid}`).once('value');
    const userVal = userSnap.val() || {};
    const userBytes = approxJsonBytes(userVal);
    totalBytes += userBytes;

    for (const [childKey, childVal] of Object.entries(userVal)) {
      const slot =
        subkeyHist.get(childKey) ||
        { count: 0, bytes: 0 };
      slot.count += 1;
      slot.bytes += approxJsonBytes(childVal);
      subkeyHist.set(childKey, slot);

      if (LEGACY_USER_KEYS.has(childKey)) legacyOwners[childKey]?.push(uid);
      else if (!KNOWN_USER_KEYS.has(childKey)) {
        const u = unknownKeys.get(childKey) || [];
        u.push(uid);
        unknownKeys.set(childKey, u);
      }
    }
  }

  printRow('total size (approx)', fmtBytes(totalBytes));

  printHeader('users/* subkey histogram');
  const sorted = [...subkeyHist.entries()].sort((a, b) => b[1].bytes - a[1].bytes);
  for (const [k, { count, bytes }] of sorted) {
    const tag = LEGACY_USER_KEYS.has(k)
      ? ' (LEGACY)'
      : KNOWN_USER_KEYS.has(k)
        ? ''
        : ' (UNEXPECTED)';
    printRow(k, `${count} users · ${fmtBytes(bytes)}${tag}`);
  }

  for (const k of Object.keys(legacyOwners)) {
    const owners = legacyOwners[k];
    if (owners.length > 0 && verbose) {
      printHeader(`users/*/${k} — owners`);
      owners.slice(0, TOP_N).forEach((u) => printRow(u, ''));
      if (owners.length > TOP_N) printRow('...', `${owners.length - TOP_N} more`);
    }
  }

  if (unknownKeys.size && verbose) {
    printHeader('users/* unexpected subkeys');
    for (const [k, owners] of unknownKeys) {
      printRow(k, `${owners.length} owner(s) — first: ${owners[0]}`);
    }
  }
}

async function scanConversations() {
  printHeader('conversations/');
  const shallow = (await shallowList('conversations')) || {};
  const ids = Object.keys(shallow);
  printRow('total conversations', ids.length);
  if (ids.length === 0) return;

  let totalMessages = 0;
  let totalBytes = 0;
  const ageBuckets = {};
  const noMembersCount = { withMembers: 0, withoutMembers: 0 };
  const heavy = [];

  for (const convId of ids) {
    const snap = await db.ref(`conversations/${convId}`).once('value');
    const val = snap.val() || {};
    const bytes = approxJsonBytes(val);
    totalBytes += bytes;

    const msgs = val.messages || {};
    const msgCount = Object.keys(msgs).length;
    totalMessages += msgCount;

    if (val.members && Object.keys(val.members).length > 0) {
      noMembersCount.withMembers += 1;
    } else {
      noMembersCount.withoutMembers += 1;
    }

    let lastSentAt = 0;
    for (const m of Object.values(msgs)) {
      if (typeof m?.sentAt === 'number' && m.sentAt > lastSentAt) {
        lastSentAt = m.sentAt;
      }
    }
    const days = lastSentAt ? ageDays(lastSentAt) : null;
    ageBuckets[ageBucket(days)] = (ageBuckets[ageBucket(days)] || 0) + 1;

    heavy.push({ convId, msgCount, bytes, days });
  }

  printRow('total messages', totalMessages);
  printRow('total size (approx)', fmtBytes(totalBytes));
  printRow('with members/', noMembersCount.withMembers);
  printRow('without members/', noMembersCount.withoutMembers);

  printHeader('conversations/ last-activity age');
  for (const b of ['<1d', '1-7d', '7-30d', '30-90d', '90-365d', '>1y', 'no-ts']) {
    if (ageBuckets[b]) printRow(b, ageBuckets[b]);
  }

  if (verbose) {
    printHeader(`conversations/ — top ${TOP_N} by size`);
    heavy
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, TOP_N)
      .forEach((c) =>
        printRow(
          c.convId,
          `${c.msgCount} msgs · ${fmtBytes(c.bytes)} · ${c.days ?? '?'}d`,
        ),
      );
  }
}

async function scanUsersByEmail() {
  printHeader('usersByEmail/');
  const shallow = (await shallowList('usersByEmail')) || {};
  const ids = Object.keys(shallow);
  printRow('total entries', ids.length);
}

async function scanNotifications() {
  printHeader('notifications/');
  const shallow = (await shallowList('notifications')) || {};
  const ids = Object.keys(shallow);
  printRow('total entries', ids.length);
  if (ids.length > 0) {
    printRow('note', '⚠ dead path — no client reads/writes (see rules TODO)');
  }
}

async function main() {
  console.log(`RTDB scan — project ${PROJECT_ID}\n${DATABASE_URL}`);
  console.log(`Run at ${new Date().toISOString()}`);

  const { keys, unknown } = await scanTopLevel();

  if (keys.includes('rooms')) await scanRooms();
  if (keys.includes('users')) await scanUsers();
  if (keys.includes('conversations')) await scanConversations();
  if (keys.includes('usersByEmail')) await scanUsersByEmail();
  if (keys.includes('notifications')) await scanNotifications();

  for (const k of unknown) {
    printHeader(`Unexpected top-level: ${k}`);
    const sub = (await shallowList(k)) || {};
    printRow('child count', Object.keys(sub).length);
  }

  console.log('\nDone.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
