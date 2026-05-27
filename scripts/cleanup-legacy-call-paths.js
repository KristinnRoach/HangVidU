#!/usr/bin/env node

/**
 * Remove legacy per-user call paths from RTDB after the Solid cutover.
 *
 * The new call flow uses `users/{uid}/calls/{incoming,response}`. The legacy
 * `archive-pre-solid-main` code wrote to:
 *   - users/{uid}/recentCalls
 *   - users/{uid}/outgoingCall
 *   - users/{uid}/callHistory
 *
 * Rules for these paths were removed in the same release that deploys this
 * script. Existing data is now orphaned and unreadable; this script deletes
 * it.
 *
 * Usage:
 *   node scripts/cleanup-legacy-call-paths.js          # dry run
 *   node scripts/cleanup-legacy-call-paths.js --delete # actually delete
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const shouldDelete = process.argv.includes('--delete');

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
  databaseURL: 'https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app',
});

const db = admin.database();

const LEGACY_KEYS = ['recentCalls', 'outgoingCall', 'callHistory'];

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

async function main() {
  console.log('=== Legacy call-path cleanup ===\n');
  console.log(`Scanning users/* for: ${LEGACY_KEYS.join(', ')}\n`);

  // Use shallow=true via a single read; user nodes are typically small enough
  // for this. If the user table grows huge, switch to paginated reads.
  const snapshot = await db.ref('users').once('value');

  if (!snapshot.exists()) {
    console.log('No users found.');
    process.exit(0);
  }

  const updates = {};
  const counts = Object.fromEntries(LEGACY_KEYS.map((k) => [k, 0]));
  let affectedUsers = 0;
  let totalUsers = 0;

  snapshot.forEach((userSnap) => {
    totalUsers += 1;
    const uid = userSnap.key;
    let userAffected = false;
    for (const key of LEGACY_KEYS) {
      if (userSnap.child(key).exists()) {
        updates[`users/${uid}/${key}`] = null;
        counts[key] += 1;
        userAffected = true;
      }
    }
    if (userAffected) affectedUsers += 1;
  });

  console.log('Summary:');
  console.log(`  Total users scanned: ${totalUsers}`);
  console.log(`  Users with legacy data: ${affectedUsers}`);
  for (const key of LEGACY_KEYS) {
    console.log(`  Users with ${key}: ${counts[key]}`);
  }
  console.log(`  Total path deletions queued: ${Object.keys(updates).length}\n`);

  if (Object.keys(updates).length === 0) {
    console.log('Nothing to delete.');
    process.exit(0);
  }

  if (!shouldDelete) {
    console.log('Dry run only. Re-run with --delete to apply.');
    process.exit(0);
  }

  const confirmed = await promptConfirmation(
    `About to delete ${Object.keys(updates).length} paths across ${affectedUsers} users. Type "yes" to confirm: `,
  );
  if (!confirmed) {
    console.log('Cancelled.');
    process.exit(0);
  }

  await db.ref().update(updates);
  console.log(`\nDeleted ${Object.keys(updates).length} paths.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
