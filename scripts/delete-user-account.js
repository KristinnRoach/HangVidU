#!/usr/bin/env node

/**
 * Delete a user account and all associated data from Firebase.
 *
 * Usage:
 *   node scripts/delete-user-account.js <uid-or-email>
 *   node scripts/delete-user-account.js <uid-or-email> --confirm
 *
 * Without --confirm: dry-run showing what would be deleted.
 * With --confirm: performs the deletion after confirmation prompt.
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const serviceAccountPath = path.join(
  __dirname,
  '../functions/service-account-key.json',
);

if (!fs.existsSync(serviceAccountPath)) {
  console.error(
    'Error: service-account-key.json not found at',
    serviceAccountPath,
  );
  console.error('Please ensure you have a valid service account key file.');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app',
});

const db = admin.database();
const auth = admin.auth();

const identifier = process.argv[2];
const shouldDelete = process.argv.includes('--confirm');

if (!identifier) {
  console.error('Usage: node scripts/delete-user-account.js <uid-or-email> [--confirm]');
  process.exit(1);
}

function hashEmail(email) {
  const normalized = email.toLowerCase().trim();
  return Buffer.from(normalized).toString('base64').replace(/\//g, '-');
}

function promptConfirmation(message) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(message, (answer) => {
      rl.close();
      resolve(
        answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes',
      );
    });
  });
}

async function resolveUser(idOrEmail) {
  try {
    if (idOrEmail.includes('@')) {
      return await auth.getUserByEmail(idOrEmail);
    }
    return await auth.getUser(idOrEmail);
  } catch (err) {
    console.error(`Could not find user "${idOrEmail}":`, err.message);
    process.exit(1);
  }
}

async function run() {
  const userRecord = await resolveUser(identifier);
  const uid = userRecord.uid;
  const email = userRecord.email;

  console.log('\n=== User Account Deletion ===\n');
  console.log(`  UID:   ${uid}`);
  console.log(`  Email: ${email || '(none)'}`);
  console.log(`  Name:  ${userRecord.displayName || '(none)'}`);
  console.log(`  Mode:  ${shouldDelete ? 'DELETE' : 'DRY RUN'}\n`);

  // Gather data to delete
  const updates = {};
  const summary = [];

  // 1. User sub-nodes (preserve profile as tombstone)
  const userSnap = await db.ref(`users/${uid}`).once('value');
  if (userSnap.exists()) {
    const keys = Object.keys(userSnap.val()).filter((k) => k !== 'profile');
    for (const key of keys) {
      summary.push(`users/${uid}/${key}`);
      updates[`users/${uid}/${key}`] = null;
    }
    summary.push(`users/${uid}/profile -> tombstone`);
    updates[`users/${uid}/profile`] = {
      deleted: true,
      deletedAt: Date.now(),
    };
  }

  // 2. Notifications
  const notifSnap = await db.ref(`notifications/${uid}`).once('value');
  if (notifSnap.exists()) {
    summary.push(`notifications/${uid}`);
    updates[`notifications/${uid}`] = null;
  }

  // 3. Discovery directory
  if (email) {
    const emailHash = hashEmail(email);
    const dirSnap = await db.ref(`usersByEmail/${emailHash}`).once('value');
    if (dirSnap.exists()) {
      summary.push(`usersByEmail/${emailHash}`);
      updates[`usersByEmail/${emailHash}`] = null;
    }
  }

  // 4. Conversations preserved (other participants keep history)

  if (summary.length === 0) {
    console.log('No RTDB data found for this user.');
  } else {
    console.log('RTDB changes:');
    summary.forEach((p) => console.log(`  - ${p}`));
    console.log('\nConversations: preserved (other participants keep history)');
  }

  console.log(`Firebase Auth record: will be deleted`);

  if (!shouldDelete) {
    console.log('\nDry run complete. Re-run with --confirm to delete.');
    process.exit(0);
  }

  const confirmed = await promptConfirmation(
    '\nPermanently delete this user and all data? (y/N): ',
  );

  if (!confirmed) {
    console.log('Cancelled.');
    process.exit(0);
  }

  // Execute
  if (Object.keys(updates).length > 0) {
    await db.ref().update(updates);
    console.log('RTDB data deleted.');
  }

  await auth.deleteUser(uid);
  console.log('Auth record deleted.');
  console.log('\nDone.');

  process.exit(0);
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
