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
 *   migrated-legacy     One-time post Users→D1 prune. Deletes verified-dead
 *                       nodes: top-level notifications/, conversations/, rooms/,
 *                       and per-user contacts/incomingInvites/acceptedInvites/
 *                       calls/profile. KEEPS usersByEmail and each user's
 *                       presence + pushSubscriptions (still live). Writes a
 *                       scoped backup of every affected path to scripts/.backups/
 *                       before deleting. Not included in `all`.
 *   all                 Run every routine stale task above in order
 *                       (excludes migrated-legacy).
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
// First non-flag argument after the script path is the task name, so flag
// order doesn't matter (e.g. `--delete rooms-legacy` works).
const taskArg = process.argv.slice(2).find((a) => !a.startsWith('--'));

const TASKS = [
  'rooms-legacy',
  'rooms-expired',
  'convo-members',
  'user-convo-index',
  'notifications',
];
const VALID = new Set([...TASKS, 'all', 'migrated-legacy']);

if (!taskArg || !VALID.has(taskArg)) {
  console.error(
    `Usage: node ${path.basename(process.argv[1])} <task> [--delete] [--yes]`,
  );
  console.error(`Tasks: ${[...VALID].join(', ')}`);
  process.exit(1);
}

const serviceAccountPath = path.join(
  __dirname,
  '../backend/firebase/service-account-key.json',
);

if (!fs.existsSync(serviceAccountPath)) {
  console.error(
    'Error: service-account-key.json not found at',
    serviceAccountPath,
  );
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

// `onConfirmed` (optional) runs after the user confirms but before the delete —
// e.g. to write a backup of exactly what is about to be removed.
async function confirmAndApply(label, updates, onConfirmed) {
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

  if (onConfirmed) await onConfirmed();

  await db.ref().update(updates);
  console.log(`[${label}] Deleted ${paths.length} paths.`);
  return paths.length;
}

// New-flow rooms write meta.createdAt up-front, but the write is not atomic
// with the room being touched for the first time — a room read mid-creation
// could legitimately have no meta yet. Skip no-meta rooms younger than this
// window so we don't race in-flight Solid call handshakes.
const NO_META_MIN_AGE_MS = 60 * 60 * 1000; // 1 hour

async function taskRoomsLegacy() {
  console.log('\n=== rooms-legacy ===');
  const snap = await db.ref('rooms').once('value');
  if (!snap.exists()) {
    console.log('No rooms.');
    return 0;
  }
  const rooms = snap.val();
  const now = Date.now();
  const updates = {};
  let legacyKeyHits = 0;
  let noMetaHits = 0;
  let noMetaSkippedTooNew = 0;

  for (const [roomId, room] of Object.entries(rooms)) {
    if (!room || typeof room !== 'object') continue;
    const childKeys = Object.keys(room);
    const hasLegacyKey = childKeys.some((k) => LEGACY_ROOM_SUBKEYS.has(k));
    const hasMetaCreatedAt = typeof room?.meta?.createdAt === 'number';

    if (hasLegacyKey) {
      updates[`rooms/${roomId}`] = null;
      legacyKeyHits += 1;
    } else if (!hasMetaCreatedAt) {
      // Fallback timestamps that the archive code may have written at the
      // top level. If none exist, treat the room as ancient (legacy).
      const fallbackTs =
        typeof room.createdAt === 'number' ? room.createdAt : null;
      const ageMs = fallbackTs != null ? now - fallbackTs : Infinity;
      if (ageMs >= NO_META_MIN_AGE_MS) {
        updates[`rooms/${roomId}`] = null;
        noMetaHits += 1;
      } else {
        noMetaSkippedTooNew += 1;
      }
    }
  }

  console.log(`Total rooms: ${Object.keys(rooms).length}`);
  console.log(`Rooms with legacy sub-keys: ${legacyKeyHits}`);
  console.log(`Rooms without meta.createdAt (>=1h old): ${noMetaHits}`);
  if (noMetaSkippedTooNew > 0) {
    console.log(
      `Rooms without meta.createdAt but <1h old (skipped — possibly in-flight): ${noMetaSkippedTooNew}`,
    );
  }
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
  console.log(
    `Rooms with valid meta.expiresAt: ${kept + Object.keys(updates).length}`,
  );
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
  console.log(
    `Users with /conversations index: ${Object.keys(updates).length}`,
  );
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

// One-time prune of nodes superseded by the Users→D1 migration. Every path
// here was verified (2026-06-28) to have zero live readers/writers in the app.
// KEEP (intentionally absent): usersByEmail (pre-auth email→handle resolver for
// password accounts), users/*/presence, users/*/pushSubscriptions.
const MIGRATED_DEAD_TOP_LEVEL = ['notifications', 'conversations', 'rooms'];
const MIGRATED_DEAD_USER_KEYS = [
  'contacts',
  'incomingInvites',
  'acceptedInvites',
  'calls',
  'profile',
];

async function taskMigratedLegacy() {
  console.log('\n=== migrated-legacy (post Users→D1 prune) ===');

  const updates = {};
  const backup = {};

  for (const node of MIGRATED_DEAD_TOP_LEVEL) {
    const snap = await db.ref(node).once('value');
    if (snap.exists()) {
      backup[node] = snap.val();
      updates[node] = null;
    }
  }

  const usersSnap = await db.ref('users').once('value');
  const users = usersSnap.exists() ? usersSnap.val() : {};
  let userPaths = 0;
  for (const [uid, user] of Object.entries(users)) {
    if (!user || typeof user !== 'object') continue;
    for (const key of MIGRATED_DEAD_USER_KEYS) {
      if (user[key] !== undefined) {
        backup[`users/${uid}/${key}`] = user[key];
        updates[`users/${uid}/${key}`] = null;
        userPaths += 1;
      }
    }
  }

  const presentTop = MIGRATED_DEAD_TOP_LEVEL.filter((n) => n in backup);
  console.log(
    `Dead top-level nodes present: ${presentTop.join(', ') || '(none)'}`,
  );
  console.log(
    `Dead per-user subnodes: ${userPaths} across ${Object.keys(users).length} users`,
  );
  console.log(
    'KEEP: usersByEmail, users/*/presence, users/*/pushSubscriptions',
  );

  // Scoped backup of exactly what will be removed — written via the onConfirmed
  // hook (after the user confirms, before the delete) so the prune is fully
  // restorable and no backup is left behind on a declined/dry run. Restrictive
  // perms (0700/0600) since the dump contains prod user data.
  return confirmAndApply('migrated-legacy', updates, () => {
    const backupDir = path.join(__dirname, '.backups');
    fs.mkdirSync(backupDir, { recursive: true, mode: 0o700 });
    const backupFile = path.join(
      backupDir,
      `migrated-legacy-${new Date().toISOString().replace(/[:.]/g, '-')}.json`,
    );
    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2), {
      mode: 0o600,
    });
    console.log(`Scoped backup written: ${backupFile}`);
  });
}

const TASK_FNS = {
  'rooms-legacy': taskRoomsLegacy,
  'rooms-expired': taskRoomsExpired,
  'convo-members': taskConvoMembers,
  'user-convo-index': taskUserConvoIndex,
  notifications: taskNotifications,
  'migrated-legacy': taskMigratedLegacy,
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
