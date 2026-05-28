#!/usr/bin/env node

/**
 * Backfill conversations/{conversationId}/members/{userId}/lastReadAt from
 * existing saved contacts.
 *
 * Dry-run by default.
 *
 * Usage:
 *   node scripts/backfill-conversation-last-read-at.js
 *   node scripts/backfill-conversation-last-read-at.js --write
 *   node scripts/backfill-conversation-last-read-at.js --write --yes
 *   node scripts/backfill-conversation-last-read-at.js --write --overwrite
 *
 * If a legacy conversation has no numeric message sentAt values, lastReadAt is
 * backfilled as 0 so it is treated as already read without making it look recent.
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DATABASE_URL =
  'https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app';
const BATCH_SIZE = 400;
const PREVIEW_LIMIT = 30;

const shouldWrite = process.argv.includes('--write');
const skipPrompt = process.argv.includes('--yes');
const overwriteExisting = process.argv.includes('--overwrite');

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

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

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

async function applyInBatches(updates) {
  const entries = Object.entries(updates);
  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = Object.fromEntries(entries.slice(i, i + BATCH_SIZE));
    await db.ref().update(batch);
    console.log(`Applied ${Math.min(i + BATCH_SIZE, entries.length)}/${entries.length}`);
  }
}

const latestSentAtByConversation = new Map();

async function getLatestSentAt(conversationId) {
  if (latestSentAtByConversation.has(conversationId)) {
    return latestSentAtByConversation.get(conversationId);
  }

  const snap = await db
    .ref(`conversations/${conversationId}/messages`)
    .orderByChild('sentAt')
    .limitToLast(1)
    .once('value');

  let latestSentAt = null;
  snap.forEach((child) => {
    const sentAt = child.val()?.sentAt;
    if (typeof sentAt === 'number') latestSentAt = sentAt;
  });

  latestSentAtByConversation.set(conversationId, latestSentAt);
  return latestSentAt;
}

async function run() {
  const usersSnap = await db.ref('users').once('value');
  const users = usersSnap.val() || {};
  const updates = {};

  let userCount = 0;
  let contactCount = 0;
  let skippedNoConversation = 0;
  let skippedExisting = 0;
  let legacyNoTimestampedMessage = 0;

  for (const [userId, user] of Object.entries(users)) {
    if (!isObject(user)) continue;
    userCount += 1;

    const contacts = isObject(user.contacts) ? user.contacts : {};
    for (const contact of Object.values(contacts)) {
      if (!isObject(contact)) continue;
      contactCount += 1;

      const conversationId =
        typeof contact.conversationId === 'string'
          ? contact.conversationId.trim()
          : '';
      if (!conversationId) {
        skippedNoConversation += 1;
        continue;
      }

      const currentMember = await db
        .ref(`conversations/${conversationId}/members/${userId}`)
        .once('value');
      const current = currentMember.val();
      const hasExistingLastRead =
        isObject(current) && typeof current.lastReadAt === 'number';

      if (hasExistingLastRead && !overwriteExisting) {
        skippedExisting += 1;
        continue;
      }

      const latestSentAt = await getLatestSentAt(conversationId);
      const lastReadAt = typeof latestSentAt === 'number' ? latestSentAt : 0;
      if (lastReadAt === 0) legacyNoTimestampedMessage += 1;

      updates[`conversations/${conversationId}/members/${userId}/lastReadAt`] =
        lastReadAt;
    }
  }

  const paths = Object.keys(updates);

  console.log('\n=== conversation lastReadAt backfill ===\n');
  console.log(`Mode: ${shouldWrite ? 'WRITE' : 'DRY RUN'}`);
  console.log(`Users scanned: ${userCount}`);
  console.log(`Contacts scanned: ${contactCount}`);
  console.log(`Queued writes: ${paths.length}`);
  console.log(`Skipped existing lastReadAt: ${skippedExisting}`);
  console.log(`Skipped missing conversationId: ${skippedNoConversation}`);
  console.log(`Legacy no timestamped messages: ${legacyNoTimestampedMessage}`);

  if (paths.length > 0) {
    console.log('\nPreview:');
    paths.slice(0, PREVIEW_LIMIT).forEach((p) => console.log(`  - ${p}`));
    if (paths.length > PREVIEW_LIMIT) {
      console.log(`  ... and ${paths.length - PREVIEW_LIMIT} more`);
    }
  }

  if (!shouldWrite) {
    console.log('\nDry run only. Re-run with --write to apply.');
    return;
  }

  if (paths.length === 0) return;

  if (!skipPrompt) {
    const confirmed = await promptConfirmation(
      `Apply ${paths.length} lastReadAt writes? Type "yes" to confirm: `,
    );
    if (!confirmed) {
      console.log('Skipped by user.');
      return;
    }
  }

  await applyInBatches(updates);
  console.log('Backfill complete.');
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await admin.app().delete();
  });
