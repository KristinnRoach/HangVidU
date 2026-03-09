#!/usr/bin/env node

/**
 * Migration script to clean up unparseable messages from RTDB.
 *
 * Removes messages that fail ParsedMessageSchema validation.
 * This eliminates parse warnings that appear in the console after Phase 1 refactor.
 *
 * Usage:
 *   node scripts/migrate-rtdb-messages-cleanup.js              # dry run (default)
 *   node scripts/migrate-rtdb-messages-cleanup.js --apply      # apply changes
 *
 * Requires GOOGLE_APPLICATION_CREDENTIALS or firebase-admin default credentials.
 * Set RTDB_URL if your database URL differs from the default.
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { readFileSync } from 'fs';
import { ParsedMessageSchema } from '../src/messaging/schema.js';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const DRY_RUN = !process.argv.includes('--apply');

// Try to load service account from env or common path
const serviceAccountPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  process.env.FIREBASE_SERVICE_ACCOUNT;

const dbUrl =
  process.env.RTDB_URL || 'https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app';

let appConfig = { databaseURL: dbUrl };

if (serviceAccountPath) {
  const sa = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
  appConfig.credential = cert(sa);
}

const app = initializeApp(appConfig);
const db = getDatabase(app);

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
        ParsedMessageSchema.parse(msg);
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
