#!/usr/bin/env node

/**
 * Migrate existing conversations to include membership nodes.
 *
 * For each conversation keyed as uid1_uid2, writes:
 *   conversations/{uid1_uid2}/members/{uid1}: true
 *   conversations/{uid1_uid2}/members/{uid2}: true
 *   users/{uid1}/conversations/{uid1_uid2}: true
 *   users/{uid2}/conversations/{uid1_uid2}: true
 *
 * Idempotent — safe to run multiple times.
 *
 * Usage:
 *   node scripts/migrate-conversation-members.js            # dry run
 *   node scripts/migrate-conversation-members.js --confirm  # apply
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
  console.log('\n=== Conversation Members Migration ===\n');
  console.log(`Mode: ${shouldApply ? 'APPLY' : 'DRY RUN'}\n`);

  const snap = await db.ref('conversations').once('value');
  if (!snap.exists()) {
    console.log('No conversations found.');
    process.exit(0);
  }

  const conversations = snap.val();
  const conversationIds = Object.keys(conversations);
  const updates = {};
  let alreadyMigrated = 0;
  let toMigrate = 0;

  for (const convoId of conversationIds) {
    const convo = conversations[convoId];

    // Skip if already has members
    if (convo.members) {
      alreadyMigrated++;
      continue;
    }

    const parts = convoId.split('_');
    if (parts.length !== 2) {
      console.warn(`  Skipping non-standard conversation ID: ${convoId}`);
      continue;
    }

    const [uid1, uid2] = parts;
    updates[`conversations/${convoId}/members/${uid1}`] = true;
    updates[`conversations/${convoId}/members/${uid2}`] = true;
    updates[`users/${uid1}/conversations/${convoId}`] = true;
    updates[`users/${uid2}/conversations/${convoId}`] = true;
    toMigrate++;
  }

  console.log(`Total conversations: ${conversationIds.length}`);
  console.log(`Already migrated:    ${alreadyMigrated}`);
  console.log(`To migrate:          ${toMigrate}`);
  console.log(`Updates to write:    ${Object.keys(updates).length}`);

  if (toMigrate === 0) {
    console.log('\nNothing to migrate.');
    process.exit(0);
  }

  if (!shouldApply) {
    console.log('\nDry run complete. Re-run with --confirm to apply.');
    process.exit(0);
  }

  const confirmed = await promptConfirmation(
    '\nApply migration? (y/N): ',
  );

  if (!confirmed) {
    console.log('Cancelled.');
    process.exit(0);
  }

  await db.ref().update(updates);
  console.log(`\nDone. Migrated ${toMigrate} conversations.`);

  process.exit(0);
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
