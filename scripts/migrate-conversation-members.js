#!/usr/bin/env node

/**
 * Migrate existing conversations to include membership nodes and indexes.
 *
 * Pass 1 — Membership (original):
 *   For each conversation without members, writes:
 *     conversations/{id}/members/{uid1}: true
 *     conversations/{id}/members/{uid2}: true
 *     users/{uid1}/conversations/{id}: true
 *     users/{uid2}/conversations/{id}: true
 *
 *   NOTE: This pass reads participants from conversationId.split('_') because
 *   it only runs on legacy uid1_uid2-format IDs that predate the members
 *   collection. New conversations (with opaque IDs) will already have members
 *   written by ensureConversation() and are not touched.
 *
 * Pass 2 — directConversations index (new):
 *   For each conversation with exactly 2 members, writes:
 *     users/{uid1}/directConversations/{uid2}: conversationId
 *     users/{uid2}/directConversations/{uid1}: conversationId
 *
 *   This enables 1:1 deduplication lookups without parsing the conversationId.
 *   It uses the members collection as the authority, so no ID parsing is needed.
 *
 * Both passes are idempotent — safe to run multiple times.
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

  // ── Pass 1: Membership bootstrap for legacy uid1_uid2 conversations ────────
  let alreadyHasMembers = 0;
  let membershipToMigrate = 0;
  let skippedNonLegacy = 0;

  for (const convoId of conversationIds) {
    const convo = conversations[convoId];

    if (convo.members) {
      alreadyHasMembers++;
      continue;
    }

    // Only attempt to bootstrap membership from legacy uid1_uid2 IDs.
    // Non-legacy (opaque) IDs without members are skipped with a warning —
    // they should not exist in practice but we won't corrupt them.
    const parts = convoId.split('_');
    if (parts.length !== 2) {
      console.warn(`  [Pass 1] Skipping non-legacy conversation without members: ${convoId}`);
      skippedNonLegacy++;
      continue;
    }

    const [uid1, uid2] = parts;
    updates[`conversations/${convoId}/members/${uid1}`] = true;
    updates[`conversations/${convoId}/members/${uid2}`] = true;
    updates[`users/${uid1}/conversations/${convoId}`] = true;
    updates[`users/${uid2}/conversations/${convoId}`] = true;
    membershipToMigrate++;
  }

  // ── Pass 2: directConversations index from membership authority ───────────
  // Reads members from the in-memory snapshot or from updates already queued
  // in Pass 1. No live DB reads needed here; the per-conversation check for
  // existing directConversations index below avoids overwriting existing data.
  let directIndexToWrite = 0;
  let directIndexAlreadySet = 0;

  // Collect all existing directConversations entries in one read to avoid
  // per-conversation queries. This reads the full users tree; acceptable for
  // small user bases. For large deployments, restrict to users involved in
  // conversations being migrated.
  const allDirectSnap = await db.ref('users').once('value');
  const existingDirectIndex = new Set();
  if (allDirectSnap.exists()) {
    allDirectSnap.forEach((userSnap) => {
      const uid = userSnap.key;
      const directConvos = userSnap.child('directConversations').val();
      if (directConvos) {
        Object.keys(directConvos).forEach((otherUid) => {
          existingDirectIndex.add(`${uid}/${otherUid}`);
        });
      }
    });
  }

  for (const convoId of conversationIds) {
    const convo = conversations[convoId];

    // Resolve the effective member list: from existing data OR from Pass-1 updates.
    let memberIds;
    if (convo.members) {
      memberIds = Object.keys(convo.members);
    } else {
      // Pass 1 may have queued membership updates — collect from the updates map.
      const prefix = `conversations/${convoId}/members/`;
      memberIds = Object.keys(updates)
        .filter((k) => k.startsWith(prefix) && updates[k] === true)
        .map((k) => k.slice(prefix.length));
    }

    if (memberIds.length !== 2) {
      // Only index 1:1 direct conversations.
      continue;
    }

    const [uid1, uid2] = memberIds;

    if (existingDirectIndex.has(`${uid1}/${uid2}`)) {
      directIndexAlreadySet++;
      continue;
    }

    updates[`users/${uid1}/directConversations/${uid2}`] = convoId;
    updates[`users/${uid2}/directConversations/${uid1}`] = convoId;
    directIndexToWrite++;
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log(`Total conversations:           ${conversationIds.length}`);
  console.log(`  Pass 1 — membership:`);
  console.log(`    Already have members:      ${alreadyHasMembers}`);
  console.log(`    To migrate:                ${membershipToMigrate}`);
  console.log(`    Skipped (non-legacy):      ${skippedNonLegacy}`);
  console.log(`  Pass 2 — directConversations index:`);
  console.log(`    Already indexed:           ${directIndexAlreadySet}`);
  console.log(`    To index:                  ${directIndexToWrite}`);
  console.log(`Total DB updates:              ${Object.keys(updates).length}`);

  if (Object.keys(updates).length === 0) {
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
  console.log(
    `\nDone. ${membershipToMigrate} membership migrations, ${directIndexToWrite} directConversations indexes written.`,
  );

  process.exit(0);
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
