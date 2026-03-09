#!/usr/bin/env node

/**
 * Migration script to clean up unparseable messages from RTDB.
 *
 * Removes messages that fail ParsedMessageSchema validation.
 * This eliminates parse warnings that appear in the console after Phase 1 refactor.
 *
 * Usage:
 *   node scripts/delete-unparsable-rtdb-messages.js              # dry run (default)
 *   node scripts/delete-unparsable-rtdb-messages.js --apply      # apply changes
 *
 * Requires GOOGLE_APPLICATION_CREDENTIALS or firebase-admin default credentials.
 * Set RTDB_URL if your database URL differs from the default.
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MessageSchema } from '../src/messaging/schema.js';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DRY_RUN = !process.argv.includes('--apply');

// Load service account from standard location
const serviceAccountPath = path.join(__dirname, '../functions/service-account-key.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ Error: service-account-key.json not found at', serviceAccountPath);
  console.error('Please ensure you have a valid service account key file.');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app',
});

const db = admin.database();

// ---------------------------------------------------------------------------
// Migration
// ---------------------------------------------------------------------------

async function migrate() {
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (pass --apply to write)' : 'APPLY'}`);
  console.log('');

  const conversationsRef = db.ref('conversations');
  const snapshot = await conversationsRef.once('value');

  if (!snapshot.exists()) {
    console.log('No conversations found.');
    process.exit(0);
  }

  const conversations = snapshot.val();
  const updates = {}; // multi-path update object for deletion
  let stats = { total: 0, removed: 0, valid: 0 };

  for (const [convId, conv] of Object.entries(conversations)) {
    if (!conv.messages) continue;

    for (const [msgId, msg] of Object.entries(conv.messages)) {
      stats.total++;
      const basePath = `conversations/${convId}/messages/${msgId}`;

      // Try to validate with schema
      try {
        MessageSchema.parse(msg);
        stats.valid++;
      } catch (err) {
        // Message fails validation — mark for deletion
        updates[`${basePath}`] = null;
        stats.removed++;
        console.log(`[REMOVE] ${basePath}`);
      }
    }
  }

  console.log('');
  console.log('--- Summary ---');
  console.log(`Total messages scanned: ${stats.total}`);
  console.log(`Valid messages:         ${stats.valid}`);
  console.log(`Unparseable (removed):  ${stats.removed}`);

  if (stats.removed === 0) {
    console.log('\nNo messages to clean up.');
    process.exit(0);
  }

  if (DRY_RUN) {
    console.log('\nDry run complete. Run with --apply to delete unparseable messages.');
  } else {
    console.log('\nApplying deletions...');
    await db.ref().update(updates);
    console.log('Done.');
  }

  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
