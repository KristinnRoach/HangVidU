#!/usr/bin/env node

/**
 * Backfill direct conversation metadata for existing RTDB contacts.
 *
 * For each users/{uid}/contacts/{contactId}, writes:
 *   users/{uid}/contacts/{contactId}/conversationId = sorted(uid, contactId).join('_')
 *   users/{uid}/conversations/{conversationId} = true
 *   conversations/{conversationId}/members/{uid} = true
 *   conversations/{conversationId}/members/{contactId} = true
 *
 * Usage:
 *   node scripts/backfill-contact-conversations.js
 *   node scripts/backfill-contact-conversations.js --confirm
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

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
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app',
});

const db = admin.database();
const shouldApply = process.argv.includes('--confirm');

function resolveDirectConversationId(userA, userB) {
  return [String(userA || '').trim(), String(userB || '').trim()]
    .filter(Boolean)
    .sort()
    .join('_');
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

async function run() {
  console.log('\n=== Contact Conversation Backfill ===\n');
  console.log(`Mode: ${shouldApply ? 'APPLY' : 'DRY RUN'}\n`);

  const rootSnap = await db.ref().once('value');
  if (!rootSnap.exists()) {
    console.log('No users found.');
    await admin.app().delete();
    process.exit(0);
  }

  const root = rootSnap.val();
  const users = root?.users;
  if (!users || typeof users !== 'object') {
    console.log('No users found.');
    await admin.app().delete();
    process.exit(0);
  }
  const updates = {};
  let contactCount = 0;
  let alreadyCorrectCount = 0;
  let missingOrMismatchedCount = 0;

  function queueUpdate(path, value) {
    if (Object.prototype.hasOwnProperty.call(updates, path)) {
      return;
    }

    const segments = path.split('/');
    let current = root;

    for (const segment of segments) {
      if (
        current == null ||
        typeof current !== 'object' ||
        !(segment in current)
      ) {
        updates[path] = value;
        missingOrMismatchedCount++;
        return;
      }
      current = current[segment];
    }

    if (current !== value) {
      updates[path] = value;
      missingOrMismatchedCount++;
      return;
    }

    alreadyCorrectCount++;
  }

  for (const [uid, user] of Object.entries(users)) {
    const contacts = user?.contacts;
    if (!contacts || typeof contacts !== 'object') continue;

    for (const contactId of Object.keys(contacts)) {
      const conversationId = resolveDirectConversationId(uid, contactId);
      queueUpdate(
        `users/${uid}/contacts/${contactId}/conversationId`,
        conversationId,
      );
      queueUpdate(`users/${uid}/conversations/${conversationId}`, true);
      queueUpdate(`conversations/${conversationId}/members/${uid}`, true);
      queueUpdate(`conversations/${conversationId}/members/${contactId}`, true);
      contactCount++;
    }
  }

  console.log(`Contacts scanned: ${contactCount}`);
  console.log(`Already correct: ${alreadyCorrectCount}`);
  console.log(`Updates to write: ${Object.keys(updates).length}`);
  console.log(`Missing or mismatched: ${missingOrMismatchedCount}`);

  if (Object.keys(updates).length === 0) {
    console.log('\nNothing to backfill.');
    await admin.app().delete();
    process.exit(0);
  }

  if (!shouldApply) {
    console.log('\nDry run complete. Re-run with --confirm to apply.');
    await admin.app().delete();
    process.exit(0);
  }

  const confirmed = await promptConfirmation('\nApply backfill? (y/N): ');
  if (!confirmed) {
    console.log('Cancelled.');
    await admin.app().delete();
    process.exit(0);
  }

  await db.ref().update(updates);
  console.log('\nDone.');

  await admin.app().delete();
  process.exit(0);
}

run().catch((error) => {
  console.error('Fatal error:', error);
  admin
    .app()
    .delete()
    .catch(() => {})
    .finally(() => process.exit(1));
});
