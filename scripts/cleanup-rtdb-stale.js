#!/usr/bin/env node

/**
 * Targeted RTDB cleanup tasks. Dry-run by default.
 *
 * Usage:
 *   node scripts/cleanup-rtdb-stale.js <task> [--delete]
 *
 * Tasks:
 *   rooms-legacy        Delete rooms that have legacy sub-keys (offer,
 *                       answer, *Candidates, watch, members) or no
 *                       meta.createdAt. These were written by the archived
 *                       pre-Solid call code.
 *   rooms-expired       Delete rooms whose meta.expiresAt is in the past.
 *                       Catches abandoned new-flow rooms not cleaned by
 *                       their owner.
 *   convo-members       Delete conversations/*​/members. Orphan data from
 *                       the reverted membership-index rollout (commits
 *                       36fe7b3c / 1fa8130c). Rule still works via the
 *                       substring fallback.
 *   user-convo-index    Delete users/*​/conversations. Same abandoned
 *                       reverse-index rollout.
 *   notifications       Delete all notifications/*. The path is dead —
 *                       no client reads or writes it.
 *   all                 Run every task above in order.
 *
 * Flags:
 *   --delete            Apply changes. Without this flag, prints what
 *                       would be deleted.
 *   --yes               Skip the interactive confirmation prompt
 *                       (for CI / scripted use). Requires --delete.
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DATABASE_URL =
  'https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app';

const shouldDelete = process.argv.includes('--delete');
const skipPrompt = process.argv.includes('--yes');
const taskArg = process.argv[2];

const TASKS = [
  'rooms-legacy',
  'rooms-expired',
  'convo-members',
  'user-convo-index',
  'notifications',
];
const VALID = new Set([...TASKS, 'all']);

if (!taskArg || !VALID.has(taskArg)) {
  console.error(`Usage: node ${path.basename(process.argv[1])} <task> [--delete] [--yes]`);
  console.error(`Tasks: ${[...VALID].join(', ')}`);
  process.exit(1);
}

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

const LEGACY_ROOM_SUBKEYS = new Set([
  'offer',
  'answer',
  'offerCandidates',
  'answerCandidates',
  'dataOffer',
  'dataAnswer',
  'dataOfferCandidates',
  'dataAnswerCandidates',
  'watch',
  'members',
  'mediaSyncSignaling',
]);

function promptConfirmation(message) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

async function confirmAndApply(label, updates) {
  const paths = Object.keys(updates);
  console.log(`\n[${label}] Paths queued for deletion: ${paths.length}`);
  if (paths.length === 0) return 0;

  if (paths.length <= 30) {
    paths.forEach((p) => console.log(`  - ${p}`));
  } else {
    paths.slice(0, 15).forEach((p) => console.log(`  - ${p}`));
    console.log(`  ... and ${paths.length - 15} more`);
  }

  if (!shouldDelete) {
    console.log(`[${label}] Dry run only. Re-run with --delete to apply.`);
    return 0;
  }

  if (!skipPrompt) {
    const confirmed = await promptConfirmation(
      `[${label}] Apply ${paths.length} deletions? Type "yes" to confirm: `,
    );
    if (!confirmed) {
      console.log(`[${label}] Skipped by user.`);
      return 0;
    }
  }

  await db.ref().update(updates);
  console.log(`[${label}] Deleted ${paths.length} paths.`);
  return paths.length;
}

async function taskRoomsLegacy() {
  console.log('\n=== rooms-legacy ===');
  const snap = await db.ref('rooms').once('value');
  if (!snap.exists()) {
    console.log('No rooms.');
    return 0;
  }
  const rooms = snap.val();
  const updates = {};
  let legacyKeyHits = 0;
  let noMetaHits = 0;

  for (const [roomId, room] of Object.entries(rooms)) {
    if (!room || typeof room !== 'object') continue;
    const childKeys = Object.keys(room);
    const hasLegacyKey = childKeys.some((k) => LEGACY_ROOM_SUBKEYS.has(k));
    const hasMetaCreatedAt = typeof room?.meta?.createdAt === 'number';

    if (hasLegacyKey) {
      updates[`rooms/${roomId}`] = null;
      legacyKeyHits += 1;
    } else if (!hasMetaCreatedAt) {
      updates[`rooms/${roomId}`] = null;
      noMetaHits += 1;
    }
  }

  console.log(`Total rooms: ${Object.keys(rooms).length}`);
  console.log(`Rooms with legacy sub-keys: ${legacyKeyHits}`);
  console.log(`Rooms without meta.createdAt: ${noMetaHits}`);
  return confirmAndApply('rooms-legacy', updates);
}

async function taskRoomsExpired() {
  console.log('\n=== rooms-expired ===');
  const now = Date.now();
  const snap = await db.ref('rooms').once('value');
  if (!snap.exists()) {
    console.log('No rooms.');
    return 0;
  }
  const rooms = snap.val();
  const updates = {};
  let kept = 0;

  for (const [roomId, room] of Object.entries(rooms)) {
    if (!room || typeof room !== 'object') continue;
    const expiresAt = room?.meta?.expiresAt;
    if (typeof expiresAt === 'number' && expiresAt < now) {
      updates[`rooms/${roomId}`] = null;
    } else if (typeof expiresAt === 'number') {
      kept += 1;
    }
  }

  console.log(`Total rooms: ${Object.keys(rooms).length}`);
  console.log(`Rooms with valid meta.expiresAt: ${kept + Object.keys(updates).length}`);
  console.log(`Expired (meta.expiresAt < now): ${Object.keys(updates).length}`);
  return confirmAndApply('rooms-expired', updates);
}

async function taskConvoMembers() {
  console.log('\n=== convo-members ===');
  const snap = await db.ref('conversations').once('value');
  if (!snap.exists()) {
    console.log('No conversations.');
    return 0;
  }
  const convos = snap.val();
  const updates = {};
  for (const [convId, convo] of Object.entries(convos)) {
    if (convo?.members && typeof convo.members === 'object') {
      updates[`conversations/${convId}/members`] = null;
    }
  }
  console.log(`Conversations with members/: ${Object.keys(updates).length}`);
  return confirmAndApply('convo-members', updates);
}

async function taskUserConvoIndex() {
  console.log('\n=== user-convo-index ===');
  const snap = await db.ref('users').once('value');
  if (!snap.exists()) {
    console.log('No users.');
    return 0;
  }
  const users = snap.val();
  const updates = {};
  for (const [uid, user] of Object.entries(users)) {
    if (user?.conversations) {
      updates[`users/${uid}/conversations`] = null;
    }
  }
  console.log(`Users with /conversations index: ${Object.keys(updates).length}`);
  return confirmAndApply('user-convo-index', updates);
}

async function taskNotifications() {
  console.log('\n=== notifications ===');
  const snap = await db.ref('notifications').once('value');
  if (!snap.exists()) {
    console.log('No notifications.');
    return 0;
  }
  const entries = snap.val() || {};
  const updates = {};
  for (const uid of Object.keys(entries)) {
    updates[`notifications/${uid}`] = null;
  }
  console.log(`notifications/* entries: ${Object.keys(updates).length}`);
  return confirmAndApply('notifications', updates);
}

const TASK_FNS = {
  'rooms-legacy': taskRoomsLegacy,
  'rooms-expired': taskRoomsExpired,
  'convo-members': taskConvoMembers,
  'user-convo-index': taskUserConvoIndex,
  notifications: taskNotifications,
};

async function main() {
  console.log(`RTDB cleanup — ${DATABASE_URL}`);
  console.log(`Mode: ${shouldDelete ? 'DELETE' : 'dry run'}`);

  const tasks = taskArg === 'all' ? TASKS : [taskArg];
  let total = 0;
  for (const t of tasks) {
    total += await TASK_FNS[t]();
  }
  console.log(`\nTotal paths deleted: ${total}`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
